import { Component, computed, ElementRef, inject, OnDestroy, OnInit, signal, viewChild } from '@angular/core';
import { MediaService } from '../../services/media';
import { OnboardingService } from '../../services/system-check/onboarding';
import { CaptureState } from '../../store/model/media-models';

@Component({
  selector: 'app-facial-authentication',
  imports: [],
  templateUrl: './facial-authentication.html',
  styleUrl: './facial-authentication.css',
})
export default class FacialAuthentication implements OnInit, OnDestroy {
  private _mediaService = inject(MediaService);
  private _onboardingService = inject(OnboardingService);

  videoPreview = viewChild<ElementRef<HTMLVideoElement>>('videoPreview');
  canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('captureCanvas');

  hasVideoPermission = computed(() => this._mediaService.hasVideoPermission());
  videoDevices = computed(() => this._mediaService.videoDevices());
  selectedVideoDeviceId = computed(() => this._mediaService.selectedVideoDeviceId());

  captureState = signal<CaptureState>('initializing');
  countdown = signal(5);
  capturedImageUrl = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  private countdownInterval: ReturnType<typeof setInterval> | null = null;

  async ngOnInit() {
    await this.initializeCamera();
  }

  ngOnDestroy() {
    this.clearCountdown();

    if (this.capturedImageUrl()) {
      URL.revokeObjectURL(this.capturedImageUrl()!);
    }
  }

  private async initializeCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    this.videoPreview()!.nativeElement.srcObject = stream
    this.captureState.set('ready');
  }

  startCountdown() {
    this.clearCountdown();
    this.countdown.set(10);
    this.captureState.set('countdown');

    this.countdownInterval = setInterval(() => {
      const current = this.countdown();
      if (current <= 1) {
        this.clearCountdown();
        this.capturePhoto();
        this.confirmPhoto();
      } else {
        this.countdown.set(current - 1);
      }
    }, 1000);
  }

  private clearCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
  }

  capturePhoto() {
    this.captureState.set('capturing');

    const videoEl = this.videoPreview()?.nativeElement;
    const canvas = this.canvasRef()?.nativeElement;

    if (!videoEl || !canvas) {
      this.captureState.set('error');
      this.errorMessage.set('Unable to capture photo. Please try again.');
      return;
    }

    try {
      canvas.width = videoEl.videoWidth || 640;
      canvas.height = videoEl.videoHeight || 480;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Unable to get canvas context');
      }

      ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        if (blob) {
          if (this.capturedImageUrl()) {
            URL.revokeObjectURL(this.capturedImageUrl()!);
          }

          const url = URL.createObjectURL(blob);
          this.capturedImageUrl.set(url);
          this.captureState.set('captured');
        } else {
          this.captureState.set('error');
          this.errorMessage.set('Failed to capture photo. Please try again.');
        }
      }, 'image/jpeg', 0.9);
    } catch {
      this.captureState.set('error');
      this.errorMessage.set('An error occurred while capturing. Please try again.');
    }
  }

  retakePhoto() {
    if (this.capturedImageUrl()) {
      URL.revokeObjectURL(this.capturedImageUrl()!);
      this.capturedImageUrl.set(null);
    }

    this.startCountdown();
  }

  selectVideoDevice(deviceId: string) {
    this._mediaService.switchVideoDevice(deviceId);
    this.startCountdown();
  }

  confirmPhoto() {
    this._onboardingService.markStepCompleted('facial');
  }
}
