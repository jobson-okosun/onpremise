import { Injectable, signal } from "@angular/core";
import { AudioTestState, VideoTestState } from "../store/model/media-models";

@Injectable({ providedIn: 'root' })
export class MediaService {
    private audioStream: MediaStream | null = null;
    private recorder: MediaRecorder | null = null
    private recordedChunks: Blob[] = [];
    recordedBlobUrl = signal<string | null>(null);
    recordingError = signal<string | null>(null);
    audioState = signal<AudioTestState>('idle');
    hasAudioPermission = signal<boolean>(false);
    audioDevices = signal<MediaDeviceInfo[]>([]);
    selectedAudioDeviceId = signal<string | null>(null);

    private videoStream: MediaStream | null = null;
    readonly _videoStream = signal<MediaStream | null>(null);
    private videoElement: HTMLVideoElement | null = null;
    videoError = signal<string | null>(null);
    videoState = signal<VideoTestState>('idle');
    hasVideoPermission = signal<boolean>(false);
    videoDevices = signal<MediaDeviceInfo[]>([]);
    selectedVideoDeviceId = signal<string | null>(null);
    

    async requestAudioPermission() {
        this.recordingError.set(null);

        try {
            const constraints: MediaStreamConstraints = { 
                audio: this.selectedAudioDeviceId() ? { deviceId: { exact: this.selectedAudioDeviceId()! } } : true,
                video: false
            };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            this.audioStream = stream;
            this.hasAudioPermission.set(!!stream);
            this._videoStream.set(stream);

            if (stream) {
                const devices = await this.getAudioDevices();
                this.audioDevices.set(devices);
            }
        } catch (error) {
            this.recordingError.set('Error accessing audio media devices.');
        }
    }

    async getAudioDevices(): Promise<MediaDeviceInfo[]> {
        const devices = await navigator.mediaDevices.enumerateDevices();
        return devices.filter(device => device.kind === 'audioinput');
    }

    async recordAudio() {
        this.recordingError.set(null);

        if (!this.audioStream) {
            await this.requestAudioPermission();
            if (!this.audioStream) return;
        }

        if (!('MediaRecorder' in window)) {
            this.audioState.set('error');
            this.recordingError.set('Audio recording is not supported in this environment.');
            return;
        }

        if (this.recordedBlobUrl()) {
            URL.revokeObjectURL(this.recordedBlobUrl()!);
            this.recordedBlobUrl.set(null);
        }

        this.recordedChunks = [];

        try {
            this.recorder = new MediaRecorder(this.audioStream);
            this.recorder.ondataavailable = (e) => {
                if (e.data && e.data.size > 0) {
                    this.recordedChunks.push(e.data)
                };
            };

            this.audioState.set('recording');
            this.recorder.start();

            window.setTimeout(() => {
                if (this.recorder && this.recorder.state === 'recording') {
                    this.recorder.stop();
                }
            }, 6000);

            this.recorder.onstop = () => {
                const blob = new Blob(this.recordedChunks, { type: 'audio/webm' });
                const url = URL.createObjectURL(blob);
                this.recordedBlobUrl.set(url);
                this.audioState.set('recorded');
                this.loadAudioPlayerTrack();
            };
        } catch {
            this.audioState.set('error');
            this.recordingError.set('Unable to record audio.');
        }
    }

    loadAudioPlayerTrack() {
        const player = document.getElementById('player') as HTMLAudioElement;
        const url = this.recordedBlobUrl()
        if (!url) {
            return
        }

        player.src = url;
    }

    playAudioRecording() {
        const player = document.getElementById('player') as HTMLAudioElement;
        this.audioState.set('playing');

        player.play().then(() => {
            // mark as recorded after playback starts
            this.audioState.set('recorded');
        }).catch(() => {
            this.audioState.set('error');
            this.recordingError.set('Unable to play audio.');
        });
    }

    confirmAudioWorks() {
        if (this.audioState() === 'recorded' || this.audioState() === 'playing') {
            this.audioState.set('passed');
        }
    }

    async requestVideoPermission() {
        this.videoError.set(null);

        try {
            const constraints: MediaStreamConstraints = {
                video: this.selectedVideoDeviceId() 
                    ? { deviceId: { exact: this.selectedVideoDeviceId()! } } 
                    : true,
                audio: false
            };

            this.videoStream = await navigator.mediaDevices.getUserMedia(constraints);
            this.hasVideoPermission.set(true);

            const devices = await this.getVideoDevices();
            this.videoDevices.set(devices);

            // Auto-select first device if none selected
            if (!this.selectedVideoDeviceId() && devices.length > 0) {
                this.selectedVideoDeviceId.set(devices[0].deviceId);
            }

            this.videoState.set('preview');
            this.attachVideoStream();
        } catch (error) {
            this.videoState.set('error');
            this.videoError.set('Unable to access camera. Please allow camera permission and try again.');
        }
    }

    async getVideoDevices(): Promise<MediaDeviceInfo[]> {
        const devices = await navigator.mediaDevices.enumerateDevices();
        return devices.filter(device => device.kind === 'videoinput');
    }

    setVideoElement(element: HTMLVideoElement) {
        this.videoElement = element;
        if (this.videoStream) {
            this.attachVideoStream();
        }
    }

    private attachVideoStream() {
        if (this.videoElement && this.videoStream) {
            this.videoElement.srcObject = this.videoStream;
            
            this.videoElement.play().catch(() => {
                this.videoError.set('Unable to play video preview.');
            });
        }
    }

    async switchVideoDevice(deviceId: string) {
        this.selectedVideoDeviceId.set(deviceId);
        
        // Stop current stream
        if (this.videoStream) {
            this.videoStream.getTracks().forEach(track => track.stop());
        }

        try {
            this.videoStream = await navigator.mediaDevices.getUserMedia({
                video: { deviceId: { exact: deviceId } },
                audio: false
            });
            this.attachVideoStream();
            this.videoState.set('preview');
        } catch (error) {
            this.videoError.set('Unable to switch camera device.');
        }
    }

    confirmVideoWorks() {
        if (this.videoState() === 'preview') {
            this.videoState.set('passed');
        }
    }

    stopVideoStream() {
        if (this.videoStream) {
            this.videoStream.getTracks().forEach(track => track.stop());
            this.videoStream = null;
        }
        if (this.videoElement) {
            this.videoElement.srcObject = null;
        }
    }
}