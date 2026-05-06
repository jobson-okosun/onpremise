import { computed, inject, Injectable, signal } from "@angular/core";
import { TauriService } from "../tauri";
import { Store } from "../../store/store";
import { invoke } from "@tauri-apps/api/core";
import { ProctorState } from "../../store/model/media-models";

const WIDTH = 320;
const HEIGHT = 320;
const CHANNELS = 4;
const FRAME_SIZE = WIDTH * HEIGHT * CHANNELS;
const FRAME_COUNT = 10;

@Injectable({ providedIn: 'root' })
export class ProctorService {
    private _tauri = inject(TauriService);
    private _store = inject(Store);

    store = computed(() => this._store.store())
    candidateInfo = computed(() => {
        const store = this.store();

        if (!store.loginData || !store.preloginData) return undefined;

        return {
            candidate_id: store.loginData.candidate_data?.id ?? '',
            batch_id: '',
            exam_id: store.preloginData?.id ?? ''
        };
    });

    private _state = signal<ProctorState>('idle');
    private _errorMessage = signal<string>('');
    private _stream = signal<MediaStream | null>(null);
    private _isStreaming = signal<boolean>(false);

    // ─── AUDIO STATE ──
    private _audioContext: AudioContext | null = null;
    private _audioBuffer: Int16Array[] = [];
    private _audioInterval: any = null;
    private _audioWorkletNode: AudioWorkletNode | null = null;

    private _frameSAB: SharedArrayBuffer | null = null;
    private _metaSAB: SharedArrayBuffer | null = null;
    private _frames: Uint8Array | null = null;
    private _meta: Int32Array | null = null;
    private _worker: Worker | null = null;
    private _videoElement: HTMLVideoElement | null = null;
    private _canvas: HTMLCanvasElement | null = null;
    private _canvasCtx: CanvasRenderingContext2D | null = null;
    private _captureAnimationId: number | null = null;
    private _streamConstraints: MediaStreamConstraints = {
        video: {
            width: { ideal: WIDTH },
            height: { ideal: HEIGHT },
            facingMode: 'user'
        },
        audio: { sampleRate: 16000, channelCount: 1, echoCancellation: false, noiseSuppression: false, autoGainControl  : true }
    };

    state = this._state.asReadonly();
    errorMessage = this._errorMessage.asReadonly();
    stream = this._stream.asReadonly();
    isStreaming = this._isStreaming.asReadonly();

    isActive = () => this._state() === 'active';
    isDenied = () => this._state() === 'denied';

    async initializeProctoring(): Promise<boolean> {
        if (this._state() === 'active') {
            return true;
        }

        this._state.set('initializing');
        this._errorMessage.set('');

        try {
            const stream = await navigator.mediaDevices.getUserMedia(this._streamConstraints);

            this._stream.set(stream);
            this._state.set('active');

            this.initializeStreamingPipeline(stream);

            return true;

        } catch (error: any) {
            console.error('Proctor initialization failed:', error);

            if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                this._state.set('denied');
                this._errorMessage.set('Camera and microphone access is required for this proctored exam. Please grant permissions and refresh the page.');
            } else if (error.name === 'NotFoundError') {
                this._state.set('error');
                this._errorMessage.set('No camera or microphone found. Please connect a device and try again.');
            } else {
                this._state.set('error');
                this._errorMessage.set('Failed to access camera and microphone. Please check your device settings.');
            }

            return false;
        }
    }

    private initializeStreamingPipeline(stream: MediaStream): void {
        if (typeof SharedArrayBuffer === 'undefined') {
            console.warn('SharedArrayBuffer not available - streaming disabled');
            return;
        }

        try {
            // Initialize SharedArrayBuffers
            this._frameSAB = new SharedArrayBuffer(FRAME_SIZE * FRAME_COUNT);
            this._metaSAB = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 2);
            this._frames = new Uint8Array(this._frameSAB);
            this._meta = new Int32Array(this._metaSAB);
            // meta[0] = writeIndex, meta[1] = readIndex

            // Create video element for frame capture
            this._videoElement = document.createElement('video');
            this._videoElement.autoplay = true;
            this._videoElement.playsInline = true;
            this._videoElement.muted = true;
            this._videoElement.srcObject = stream;

            // Create canvas for pixel extraction
            this._canvas = document.createElement('canvas');
            this._canvas.width = WIDTH;
            this._canvas.height = HEIGHT;
            this._canvasCtx = this._canvas.getContext('2d', { willReadFrequently: true });

            // Initialize worker
            this._worker = new Worker(
                new URL('./worker/frame-processor.worker', import.meta.url),
                { type: 'module' }
            );
            
            // Send SharedArrayBuffer data and DTO to worker
            this._worker.postMessage({
                frameSAB: this._frameSAB,
                metaSAB: this._metaSAB,
                width: WIDTH,
                height: HEIGHT,
                frameCount: FRAME_COUNT,
                candidate: this.candidateInfo()
            });

            // Handle worker messages - invoke Tauri from main thread
            this._worker.onmessage = async (e) => {
                if (e.data.type === 'PROCESS_FRAME') {
                    const { payload } = e.data;
                    try {
                        await invoke('process_frame', payload);
                    } catch (err) {
                        console.error('Failed to invoke process_frame:', err);
                    }
                }
            };

            // Start capture loop once video is ready
            this._videoElement.onloadedmetadata = () => {
                this._videoElement!.play();
                this.startCaptureLoop();
            };

            this._isStreaming.set(true);
            console.log('Proctor streaming pipeline initialized');

            this.initializeAudioPipeline(stream);

        } catch (error) {
            console.error('Failed to initialize streaming pipeline:', error);
        }
    }

    private async initializeAudioPipeline(stream: MediaStream): Promise<void> {
        try {
            this._audioContext = new AudioContext({ sampleRate: 16000 });

            const workletCode = `
            class AudioProcessor extends AudioWorkletProcessor {
                constructor() {
                    super();
                    this.buffer = [];
                }

                process(inputs) {
                    const input = inputs[0];
                    if (!input || !input[0]) return true;

                    const channel = input[0];

                    // Send raw Float32 chunk to main thread
                    this.port.postMessage(channel);

                    return true;
                }
            }
            registerProcessor('audio-processor', AudioProcessor);
        `;

            const blob = new Blob([workletCode], { type: 'application/javascript' });
            const url = URL.createObjectURL(blob);

            await this._audioContext.audioWorklet.addModule(url);
            URL.revokeObjectURL(url);

            const source = this._audioContext.createMediaStreamSource(stream);

            this._audioWorkletNode = new AudioWorkletNode(this._audioContext, 'audio-processor');

            // ─── RECEIVE AUDIO CHUNKS ───
            this._audioWorkletNode.port.onmessage = (event) => {
                const float32 = event.data;

                const pcm16 = this.float32ToInt16(float32);

                this._audioBuffer.push(pcm16);

                // NEW: prevent unbounded memory growth: If user speaks continuously, buffer can grow too fast.
                if (this._audioBuffer.length > 50) {
                    this._audioBuffer.shift();
                }
            };

            source.connect(this._audioWorkletNode);

            this._audioInterval = setInterval(async () => {
                clearInterval(this._audioInterval);

                if (!this._audioBuffer.length) return; 

                const chunks = this._audioBuffer.splice(0);

                const totalLength = chunks.reduce((sum, c) => sum + c.length, 0);
                const merged = new Int16Array(totalLength);

                let offset = 0;
                for (const chunk of chunks) {
                    merged.set(chunk, offset);
                    offset += chunk.length;
                }

                const audioBytes = Array.from(new Uint8Array(merged.buffer));

                try {
                    await invoke('process_frame', {
                        width: 0,
                        height: 0,
                        data: [],
                        dto: {
                            ...this.candidateInfo()!,
                            audio_stream: audioBytes
                        }
                    });

                } catch (err) {
                    console.error('Audio send failed:', err);
                }

            }, 30);

        } catch (err) {
            console.error('Audio init failed:', err);
        }
    }

    private float32ToInt16(float32: Float32Array): Int16Array {
        const int16 = new Int16Array(float32.length);

        for (let i = 0; i < float32.length; i++) {
            const s = Math.max(-1, Math.min(1, float32[i]));
            int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }

        return int16;
    }

    private startCaptureLoop(): void {
        const capture = () => {
            if (!this._canvasCtx || !this._videoElement || !this._frames || !this._meta) {
                return;
            }

            // Draw current frame to canvas
            this._canvasCtx.drawImage(this._videoElement, 0, 0, WIDTH, HEIGHT);

            // Get pixel data
            const imageData = this._canvasCtx.getImageData(0, 0, WIDTH, HEIGHT);

            // Write to ring buffer
            const writeIndex = Atomics.load(this._meta, 0);
            const offset = writeIndex * FRAME_SIZE;
            this._frames.set(imageData.data, offset);

            // Update write index and notify worker
            Atomics.store(this._meta, 0, (writeIndex + 1) % FRAME_COUNT);
            Atomics.notify(this._meta, 0);

            // Continue capture loop
            this._captureAnimationId = requestAnimationFrame(capture);
        };

        capture();
    }

    private stopStreamingPipeline(): void {
        if (this._captureAnimationId !== null) {
            cancelAnimationFrame(this._captureAnimationId);
            this._captureAnimationId = null;
        }

        if (this._worker) {
            this._worker.terminate();
            this._worker = null;
        }

        if (this._videoElement) {
            this._videoElement.srcObject = null;
            this._videoElement = null;
        }

        this._canvas = null;
        this._canvasCtx = null;

        this._frameSAB = null;
        this._metaSAB = null;
        this._frames = null;
        this._meta = null;

        this._isStreaming.set(false);
    }

    stopProctoring(): void {
        this.stopStreamingPipeline();

        const stream = this._stream();
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            this._stream.set(null);
        }

        this._state.set('idle');
        this._errorMessage.set('');
    }
}