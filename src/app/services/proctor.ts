import { inject, Injectable, signal } from "@angular/core";
import { TauriService } from "./tauri";
import { Store } from "../store/store";
import { invoke } from "@tauri-apps/api/core";
import { ProctorState } from "../store/model/media-models";

const WIDTH = 640;
const HEIGHT = 480;
const CHANNELS = 4;
const FRAME_SIZE = WIDTH * HEIGHT * CHANNELS;
const FRAME_COUNT = 4; 

@Injectable({ providedIn: 'root' })
export class ProctorService {
    private _tauri = inject(TauriService);
    private _store = inject(Store);

    private _state = signal<ProctorState>('idle');
    private _errorMessage = signal<string>('');
    private _stream = signal<MediaStream | null>(null);
    private _isStreaming = signal<boolean>(false);

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
        audio: false
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

            // Start streaming to Tauri if in Tauri environment
            this.initializeStreamingPipeline(stream);
            // if (this._store.store().platformIsTauri) {
            //     console.log('Environment: Tauri............................')
            //     this.initializeStreamingPipeline(stream);
            // } else {
            //     console.log('Environment: note Tauri............................')
            // }

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
                new URL('../exam/proctor-preview/worker/frame-processor.worker', import.meta.url),
                { type: 'module' }
            );

            // Get candidate and assessment IDs from store
            const storeData = this._store.getStore();
            const candidateId = storeData.loginData?.candidate_data?.id ?? '';
            const assessmentId = storeData.preloginData?.id ?? '';

            // Send SharedArrayBuffer data and DTO to worker
            this._worker.postMessage({
                frameSAB: this._frameSAB,
                metaSAB: this._metaSAB,
                width: WIDTH,
                height: HEIGHT,
                dto: {
                    candidate_id: candidateId,
                    exam_id: assessmentId,
                }
            });

            // Handle worker messages - invoke Tauri from main thread
            this._worker.onmessage = async (e) => {
                if (e.data.type === 'PROCESS_FRAME') {
                    const { payload } = e.data;
                    try {
                        console.log('invoking tauri process_frame command here............................')
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

        } catch (error) {
            console.error('Failed to initialize streaming pipeline:', error);
        }
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

    getVideoTrack(): MediaStreamTrack | null {
        return this._stream()?.getVideoTracks()[0] ?? null;
    }
}