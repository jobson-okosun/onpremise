import {
  Component,
  computed,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  signal,
  SimpleChanges,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TauriService } from '../../services/ipc/tauri';
import { Store } from '../../store/store';
import {
  IIdentityCheck,
  OnboardingInstruction,
  OnboardingResult,
  LivenessStep,
  ONBOARDING_STEP_TEXTS,
} from '../../store/model/types';

@Component({
  selector: 'app-onboarding-liveness-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './onboarding-liveness-modal.html',
  styleUrl: './onboarding-liveness-modal.css',
})
export class OnboardingLivenessModal implements OnInit, OnChanges, OnDestroy {
  private _tauri = inject(TauriService);
  private _store = inject(Store);

  @Input() identityCheck: IIdentityCheck | null = null;
  @Input() visible: boolean = false;

  @Output() completed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  videoEl = viewChild<ElementRef<HTMLVideoElement>>('videoElement');

  stream = signal<MediaStream | null>(null);
  currentInstruction = signal<OnboardingInstruction | null>(null);
  timeRemaining = signal<number>(0);
  status = signal<'initializing' | 'active' | 'success' | 'review' | 'failed' | 'error'>('initializing');
  errorMessage = signal<string | null>(null);
  lastVerdict = signal<OnboardingResult | null>(null);
  isSuccessTransition = signal<boolean>(false);
  isReviewTransition = signal<boolean>(false);

  private ws: WebSocket | null = null;
  private frameInterval: ReturnType<typeof setInterval> | null = null;
  private timerInterval: ReturnType<typeof setInterval> | null = null;
  private unlistenFns: Array<() => void> = [];
  private isCleaningUp = false;

  stepText = computed(() => {
    const inst = this.currentInstruction();
    if (!inst) {
      return { prompt: 'Preparing camera check...', releasePrompt: undefined };
    }
    const def = ONBOARDING_STEP_TEXTS[inst.step] || { prompt: inst.step };
    return {
      prompt: inst.release && def.releasePrompt ? def.releasePrompt : def.prompt,
      release: inst.release,
      step: inst.step,
    };
  });

  isTauri = computed(() => this._store.store().platformIsTauri);

  ngOnInit() {
    if (this.visible && this.identityCheck) {
      this.startVerification();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible']) {
      if (this.visible && this.identityCheck) {
        this.startVerification();
      } else if (!this.visible) {
        this.cleanup();
      }
    }
  }

  ngOnDestroy() {
    this.cleanup();
  }

  async startVerification() {
    this.cleanup();
    this.isCleaningUp = false;
    this.status.set('initializing');
    this.errorMessage.set(null);
    this.isSuccessTransition.set(false);
    this.lastVerdict.set(null);

    try {
      // 1. Initialize user media (camera only, 640x480 ideal for liveness)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
        audio: false,
      });

      this.stream.set(stream);

      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        console.log('Opened camera device for onboarding:', videoTrack.label);
      }

      // Connect stream to video element
      const el = this.videoEl()?.nativeElement;
      if (el) {
        el.srcObject = stream;
        try {
          await el.play();
        } catch {
          // Auto-play can silently handle
        }
      }

      const check = this.identityCheck;
      if (!check) {
        throw new Error('Missing identity verification parameters.');
      }

      // Check if running inside Secure Browser
      if (!this.isTauri()) {
        throw new Error('Identity verification requires ExamAlpha Secure Browser.');
      }

      await this.runTauriOnboarding(check);
    } catch (err: any) {
      console.error('Failed to start face verification:', err);
      this.status.set('error');

      if (err?.name === 'NotFoundError') {
        this.errorMessage.set('No camera that can be used for proctoring was found. Please connect a webcam.');
      } else if (err?.name === 'NotAllowedError') {
        this.errorMessage.set('The camera that opened is not allowed for proctoring. Please try again.');
      } else {
        this.errorMessage.set(err?.message || 'Could not access your camera. Please ensure it is connected and allowed.');
      }
    }
  }

  private async runTauriOnboarding(check: IIdentityCheck) {
    const payload = {
      examId: check.exam_id || '',
      candidateId: check.candidate_id || '',
      batchId: check.batch_id || '',
      mlToken: check.ml_token || '',
      onboardingServer: check.onboarding_server,
    };

    // Listen to onboarding events before calling start_onboarding
    const unlistenInst = await this._tauri.listenForOnboardingInstruction((inst) => {
      this.handleInstruction(inst);
    });
    if (unlistenInst) this.unlistenFns.push(unlistenInst);

    const unlistenResult = await this._tauri.listenForOnboardingResult((res) => {
      this.handleResult(res);
    });
    if (unlistenResult) this.unlistenFns.push(unlistenResult);

    const unlistenErr = await this._tauri.listenForOnboardingError((err) => {
      console.error('Onboarding stream error:', err);
      this.status.set('error');
      this.errorMessage.set(typeof err === 'string' ? err : 'Connection to verification service lost.');
    });
    if (unlistenErr) this.unlistenFns.push(unlistenErr);

    // Call start_onboarding IPC command
    const res = await this._tauri.startOnboarding(payload);
    if (!res || !res.port || !res.token) {
      throw new Error('Secure browser failed to return onboarding port or token.');
    }

    // Connect WebSocket
    await this.connectLocalWebSocket(res.port, res.token);
    this.status.set('active');
  }

  private async connectLocalWebSocket(port: number, token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const socket = new WebSocket(`ws://127.0.0.1:${port}`, token);
      socket.binaryType = 'arraybuffer';

      socket.onopen = () => {
        this.ws = socket;
        this.startFrameStreaming();
        resolve();
      };

      socket.onerror = (e) => {
        reject(new Error('Failed to connect to local verification stream.'));
      };

      socket.onclose = () => {
        this.ws = null;
      };
    });
  }

  private startFrameStreaming() {
    if (this.frameInterval) {
      clearInterval(this.frameInterval);
      this.frameInterval = null;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // 5 frames per second = ~200ms
    this.frameInterval = setInterval(async () => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN || this.isCleaningUp) {
        return;
      }

      const video = this.videoEl()?.nativeElement;
      if (!video || video.readyState < 2) return;

      try {
        const width = 640;
        const height = Math.round((video.videoHeight / (video.videoWidth || 640)) * width) || 480;

        canvas.width = width;
        canvas.height = height;
        if (!ctx) return;

        ctx.drawImage(video, 0, 0, width, height);

        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.85));
        if (!blob || !this.ws || this.ws.readyState !== WebSocket.OPEN) return;

        const buffer = await blob.arrayBuffer();
        const jpeg = new Uint8Array(buffer);

        // 0x01 prefix + JPEG bytes
        const msg = new Uint8Array(1 + jpeg.length);
        msg[0] = 0x01;
        msg.set(jpeg, 1);

        this.ws.send(msg);
      } catch (e) {
        // Frame drop is acceptable
      }
    }, 200);
  }

  private handleInstruction(inst: OnboardingInstruction) {
    this.currentInstruction.set(inst);
    this.timeRemaining.set(inst.timeAllowedS || 0);

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    if (inst.timeAllowedS > 0) {
      this.timerInterval = setInterval(() => {
        const curr = this.timeRemaining();
        if (curr <= 1) {
          this.timeRemaining.set(0);
          if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
          }
        } else {
          this.timeRemaining.set(curr - 1);
        }
      }, 1000);
    }
  }

  private handleResult(res: OnboardingResult) {
    this.lastVerdict.set(res);

    if (['PASSED', 'ALLOWED', 'NOT_REQUIRED'].includes(res.verdict)) {
      this.status.set('success');
      this.isSuccessTransition.set(true);

      // Display 1.5s success transition before auto re-submitting login
      setTimeout(async () => {
        await this.cleanup();
        this.completed.emit();
      }, 1500);
      return;
    }

    if (res.verdict === 'REVIEW') {
      this.status.set('review');
      this.isReviewTransition.set(true);

      // Display 2s review transition before auto re-submitting login
      setTimeout(async () => {
        await this.cleanup();
        this.completed.emit();
      }, 2000);
      return;
    }

    this.status.set('failed');
    this.errorMessage.set(res.reason || 'Verification unsuccessful. Please try again.');
  }


  async cancel() {
    await this.cleanup();
    this.cancelled.emit();
  }

  async retry() {
    await this.startVerification();
  }

  async cleanup() {
    this.isCleaningUp = true;

    if (this.frameInterval) {
      clearInterval(this.frameInterval);
      this.frameInterval = null;
    }

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    if (this.ws) {
      try {
        this.ws.close();
      } catch {}
      this.ws = null;
    }

    const stream = this.stream();
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      this.stream.set(null);
    }

    this.unlistenFns.forEach((unlisten) => {
      try {
        unlisten();
      } catch {}
    });
    this.unlistenFns = [];

    if (this.isTauri()) {
      await this._tauri.stopOnboarding();
    }
  }
}
