import { computed, inject, Injectable, signal, TemplateRef } from "@angular/core";
import { TauriService } from "../tauri";
import { Store } from "../../store/store";
import { CandidateInfractionEntry, INFRACTION_COLORS, INFRACTION_LABELS } from "../../store/model/types";
import { HotToastService } from "@ngxpert/hot-toast";
import Swal from 'sweetalert2';
import { disableRestrictedActions } from "../../utils/helper";

@Injectable({ providedIn: 'root' })
export class ProctorService {
    private _store = inject(Store);
    private _tauri = inject(TauriService)
    private _toast = inject(HotToastService)

    public onStreamErrorCallback?: () => void;

    infractionTemplateRef = signal<TemplateRef<HTMLDivElement> | undefined>(undefined);

    store = computed(() => this._store.store())
    candidateInfo = computed(() => {
        const store = this.store();

        if (!store.loginData || !store.preloginData) return undefined;

        return {
            candidate_id: store.loginData.candidate_data.participant_id,
            batch_id: store.preloginData.batch_id,
            exam_id: store.preloginData.r_id
        };
    });

    private _audioContext: AudioContext | null = null;
    private _audioWorkletNode: AudioWorkletNode | null = null;

    private ws: WebSocket | null = null;
    stream = signal<MediaStream | null>(null);
    isStreaming = signal<boolean>(false);
    isStreamingVideo = signal<boolean>(false);
    videoSteamInterval: any
    FRAME_INTERVAL_MS = Math.round(1000 / 5); 
    frameErrCount = 0;
    frameCount = 0;
    fpsTimestamp = performance.now();
    private _ipcListenersRegistered = signal<boolean>(false);
    public isNetworkRetryActive = signal(false);

    tauriInvoke = computed(() => this._tauri.tauriInvoke())
    tauriListen = computed(() => this._tauri.tauriListen())

    private _streamConstraints: MediaStreamConstraints = {
        video: { width: { ideal: 320 }, height: { ideal: 320 }, facingMode: "user" },
        audio: { sampleRate: 16000, channelCount: 1, echoCancellation: false, noiseSuppression: false, autoGainControl: true },
    };

    async initialize(): Promise<boolean> {
        try {
            const cInfo = this.candidateInfo();
            if (!cInfo) {
                return false;
            }

            await this.cleanUpProctoring()

            const started = await this.startMediaFeed();
            if (!started) {
                return false;
            }

            const wsPort = await this.tauriInvoke()("start_stream", {
                candidateId: cInfo.candidate_id,
                examId: cInfo.exam_id,
                batchId: cInfo.batch_id
            });

            if (!wsPort) {
                console.error("Web Socket Port is null")
                return false;
            }

            try {
                this.ws = await new Promise<WebSocket>((resolve, reject) => {
                    const sock = new WebSocket(`ws://127.0.0.1:${wsPort}`);
                    sock.binaryType = "arraybuffer";

                    sock.onopen = () => resolve(sock);

                    sock.onerror = (e) => reject(new Error("WS connection failed"));

                    sock.onclose = () => {
                        if (this.isStreaming()) {
                            this.cleanUpProctoring();
                        }
                    };
                });

            } catch (err) {
                console.error("WS connect error:", err);
                this.tauriInvoke()("stop_stream").catch(() => { });
                return false;
            }

            this.isStreaming.set(true);

            if (this.videoSteamInterval) {
                clearInterval(this.videoSteamInterval);
                this.videoSteamInterval = null
            }

            this.videoSteamInterval = setInterval(() => this.streamVideo(), this.FRAME_INTERVAL_MS);

            await this.streamAudio();
 
            this.ipcReceivers() 

            this._toast.success('Proctoring initialized successfully')
            return true;
        } catch (error: any) {
            console.error('Proctor initialization failed:', error);
            return false;
        }
    }

    async startMediaFeed(): Promise<boolean> {
        try {
            const stream = await navigator.mediaDevices.getUserMedia(this._streamConstraints);
            this.stream.set(stream);

            return true;
        } catch (error: any) {
            console.error('media stream failed to start:', error);
            return false;
        } 
    }

    private async streamVideo(): Promise<void> {
        const stream = this.stream();
        const cam = document.getElementById('webcam') as HTMLVideoElement;

        if (!stream || cam.readyState < 2 || !this.ws || this.isStreamingVideo()) return;

        this.isStreamingVideo.set(true);

        try {

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;

            canvas.width = cam.videoWidth;
            canvas.height = cam.videoHeight;
            ctx.drawImage(cam, 0, 0, canvas.width, canvas.height);

            const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, "image/jpeg", 0.85))

            if (!blob) return;
            const buffer = await blob.arrayBuffer();

            const jpeg = new Uint8Array(buffer);
            const msg = new Uint8Array(1 + jpeg.length);
            msg[0] = 0x01;
            msg.set(jpeg, 1);

            try {
                this.ws.send(msg);

                this.frameCount++;
                this.frameErrCount = 0;
            } catch (err) {
                this.frameErrCount++;

                if (this.frameErrCount === 1 || this.frameErrCount % 10 === 0) {
                    console.error('Frame send failed:', err);
                }
            }

            const now = performance.now();
            if (now - this.fpsTimestamp >= 1000) {
                this.frameCount = 0;
                this.fpsTimestamp = now;
            }

        } finally {
            this.isStreamingVideo.set(false);
        }
    }

    private async streamAudio(): Promise<void> {
        try {
            this._audioContext = new AudioContext({ sampleRate: 16000 });

            const blobUrl = URL.createObjectURL(new Blob([this.getWorkletSrc()], { type: 'application/javascript' }));

            await this._audioContext.audioWorklet.addModule(blobUrl);
            URL.revokeObjectURL(blobUrl);

            const source = this._audioContext.createMediaStreamSource(this.stream()!);

            const gain = this._audioContext.createGain();
            gain.gain.value = 3.0;

            const node = new AudioWorkletNode(this._audioContext, 'pcm-capture');

            node.port.onmessage = (e) => {
                if (!this.isStreaming() || !this.ws) return;

                const pcm = new Uint8Array(e.data);
                const msg = new Uint8Array(1 + pcm.length);
                msg[0] = 0x02;
                msg.set(pcm, 1);

                this.ws.send(msg);
            };

            source.connect(gain);
            gain.connect(node);
        } catch (error) {
            console.error('Audio stream failed:', error);
        }
    }

    ipcReceivers() {
        if (this._ipcListenersRegistered()) return;

        this._ipcListenersRegistered.set(true);
        
        this.tauriListen()('stream_connected', () => { 
            console.log('stream_connected')
        });

        this.tauriListen()('stream_error', (event: any) => {
            console.log('streaming cleanedup: error from ipc stream_error:channel', event)
            if (this.isNetworkRetryActive()) return;

            if (this.onStreamErrorCallback) {
                this.onStreamErrorCallback();
            }
        });

        this.tauriListen()('stream_closed', () => {
            console.log('streaming cleanedup: error from ipc stream_closed:channel')
            if (this.isNetworkRetryActive()) return;
            
            if (this.onStreamErrorCallback) {
                this.onStreamErrorCallback();
            }
        });

        this.tauriListen()('detection_result', (res: any) => {
            this.onInfractions(res);
        });
    }

    onInfractions(event: any) {
        const payload = event.payload

        if (!payload.infractionType) {
            return
        }

        const infractionType = payload.infractionType as keyof typeof INFRACTION_LABELS;

        const data: CandidateInfractionEntry = {
            id: Date.now().toString(),
            label: INFRACTION_LABELS[infractionType] ?? `Type ${payload.infractionType}`,
            time: new Date().toLocaleTimeString(),
            timestamp: new Date().toISOString(),
            type: payload.infractionType,
            strikes: payload.infractionStrikes ?? 0,
            maxStrikeReached: payload.maxStrikeReached ?? false,
            color: INFRACTION_COLORS[infractionType]
        }

        if (!this.infractionTemplateRef()) { 
            return
        }

        this._toast.show(this.infractionTemplateRef(), { data: { ...data }, duration: 7000, position: "top-left" })
    } 

    async cleanUpProctoring() {
        this.isStreaming.set(false);

        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }

        clearInterval(this.videoSteamInterval);
        this.videoSteamInterval = null;

        this.stream()?.getTracks().forEach(track => track.stop());
        this.stream.set(null);

        this.isStreamingVideo.set(false);

        this._audioContext?.close();
        this._audioContext = null;
        this._audioWorkletNode = null;

        this.frameErrCount = 0;
        this.frameCount = 0;

        this.tauriInvoke()("stop_stream").catch(() => { });
    }

    generateUuidV7() {
        const ms = BigInt(Date.now());
        const rand = crypto.getRandomValues(new Uint8Array(10));

        const b = new Uint8Array(16);
        b[0] = Number((ms >> 40n) & 0xffn);
        b[1] = Number((ms >> 32n) & 0xffn);
        b[2] = Number((ms >> 24n) & 0xffn);
        b[3] = Number((ms >> 16n) & 0xffn);
        b[4] = Number((ms >> 8n) & 0xffn);
        b[5] = Number(ms & 0xffn);
        b[6] = 0x70 | (rand[0] & 0x0f);
        b[7] = rand[1];
        b[8] = 0x80 | (rand[2] & 0x3f);
        b[9] = rand[3];
        b[10] = rand[4]; b[11] = rand[5]; b[12] = rand[6];
        b[13] = rand[7]; b[14] = rand[8]; b[15] = rand[9];

        const h = [...b].map(x => x.toString(16).padStart(2, '0')).join('');

        return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
    }

    getWorkletSrc(): string {
        return `
            class PcmCapture extends AudioWorkletProcessor {
                constructor() {
                    super();
                    this._buf = new Float32Array(0);
                    this._chunk = 512; // Silero VAD requires exactly 512 samples @ 16 kHz (32 ms)
                }

                process(inputs) {
                    const ch = inputs[0] && inputs[0][0];
                    if (!ch) return true;

                    const merged = new Float32Array(this._buf.length + ch.length);
                    merged.set(this._buf);
                    merged.set(ch, this._buf.length);
                    this._buf = merged;

                    while (this._buf.length >= this._chunk) {
                        const out = this._buf.slice(0, this._chunk);
                        this._buf = this._buf.slice(this._chunk);
                        this.port.postMessage(out.buffer, [out.buffer]);
                    }

                    return true;
                }
            }
            registerProcessor('pcm-capture', PcmCapture);
        `
    }
}