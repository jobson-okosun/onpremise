import { Injectable, signal, computed, inject } from '@angular/core';
import { DataService } from '../data';
import { SYSTEM_DEFAULT_CHECKS } from '../../utils/constants';

export type CheckStatus = 'pending' | 'checking' | 'passed' | 'failed' | 'warning';

export interface SystemCheckItem {
    id: string;
    label: string;
    description: string;
    status: CheckStatus;
    message?: string;
    critical: boolean;
}

export interface NetworkSpeedResult {
    downloadMbps: number;
    latencyMs: number;
}

@Injectable({ providedIn: 'root' })
export class SystemCheckService {
    private _dataService = inject(DataService);
    private _checks = signal<SystemCheckItem[]>(SYSTEM_DEFAULT_CHECKS);

    checks = this._checks.asReadonly();

    allChecksPassed = computed(() => {
        const checks = this._checks();
        return checks.every(c => c.status === 'passed' || c.status === 'warning');
    });

    criticalChecksPassed = computed(() => {
        const checks = this._checks();
        return checks.filter(c => c.critical).every(c => c.status === 'passed');
    });

    isRunning = signal(false);
    isComplete = signal(false);

    networkCheckResults = signal({download: 0, upload: 0, latency: 0})

    private updateCheck(id: string, update: Partial<SystemCheckItem>) {
        this._checks.update(checks =>
            checks.map(c => (c.id === id ? { ...c, ...update } : c))
        );
    }

    async runAllChecks(): Promise<boolean> {
        this.isRunning.set(true);
        this.isComplete.set(false);

        this._checks.update(checks =>
            checks.map(c => ({ ...c, status: 'pending' as CheckStatus, message: undefined }))
        );

        await this.checkInternetConnection();
        await this.checkMediaDevices();
        await this.checkWebRTC();
        await this.checkConnectionSpeed();
        await this.checkScreenSize();

        this.isRunning.set(false);
        this.isComplete.set(true);

        return this.criticalChecksPassed();
    }

    private async checkInternetConnection(): Promise<void> {
        this.updateCheck('internet', { status: 'checking' });
        await this.delay(500);

        if (navigator.onLine) {
            this.updateCheck('internet', {
                status: 'passed',
                message: 'Connected to the internet',
            });
        } else {
            this.updateCheck('internet', {
                status: 'failed',
                message: 'No internet connection detected',
            });
        }
    }

    private async checkConnectionSpeed(): Promise<void> {
        this.updateCheck('speed', { status: 'checking' });
        this.updateCheck('upload', { status: 'checking' });
        this.updateCheck('latency', { status: 'checking' });

        try {
            const result: any = await this._dataService.runNetworkCheck();
            this.networkCheckResults.set(result)

            this.updateCheck('speed', {
                status: result.download.passed ? 'passed' : 'warning',
                message: `${result.download.mbps} Mbps`,
            });

            this.updateCheck('upload', {
                status: result.upload.passed ? 'passed' : 'failed',
                message: `${result.upload.mbps} Mbps`,
            });

            this.updateCheck('latency', {
                status: result.latency.passed ? 'passed' : 'warning',
                message: `${result.latency.avg}ms (Jitter: ${result.latency.jitter}ms)`,
            });

        } catch (error) {
            this.updateCheck('speed', { status: 'warning', message: 'Check failed' });
            this.updateCheck('upload', { status: 'failed', message: 'Check failed' });
            this.updateCheck('latency', { status: 'warning', message: 'Check failed' });
        }
    }

    private async checkScreenSize(): Promise<void> {
        this.updateCheck('screen', { status: 'checking' });
        await this.delay(300);

        const width = window.screen.width;
        const height = window.screen.height;
        const isMobile = width < 768 || height < 768;
        
        const minDimension = Math.min(width, height);
        const maxDimension = Math.max(width, height);

        if (isMobile) {
            if (minDimension >= 320 && maxDimension >= 480) {
                this.updateCheck('screen', {
                    status: 'passed',
                    message: `${width}x${height} (Mobile)`,
                });
            } else {
                this.updateCheck('screen', {
                    status: 'warning',
                    message: `${width}x${height} (Screen may be too small)`,
                });
            }
        } else {
            if (width >= 1024 && height >= 768) {
                this.updateCheck('screen', {
                    status: 'passed',
                    message: `${width}x${height} (Desktop)`,
                });
            } else {
                this.updateCheck('screen', {
                    status: 'passed',
                    message: `${width}x${height} (Tablet)`,
                });
            }
        }
    }

    private async checkWebRTC(): Promise<void> {
        this.updateCheck('webrtc', { status: 'checking' });
        await this.delay(400);

        const hasRTCPeerConnection = !!(
            window.RTCPeerConnection ||
            (window as any).webkitRTCPeerConnection ||
            (window as any).mozRTCPeerConnection
        );

        if (hasRTCPeerConnection) {
            this.updateCheck('webrtc', {
                status: 'passed',
                message: 'Video streaming is supported',
            });
        } else {
            this.updateCheck('webrtc', {
                status: 'failed',
                message: 'Video streaming is not supported on this device',
            });
        }
    }

    private async checkMediaDevices(): Promise<void> {
        this.updateCheck('mediaDevices', { status: 'checking' });
        await this.delay(400);

        if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
            try {
                // Request explicit permissions for both video and audio
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                
                // Stop all tracks immediately to release the hardware
                stream.getTracks().forEach(track => track.stop());

                // If we reach here, we successfully got permission and the hardware works
                this.updateCheck('mediaDevices', {
                    status: 'passed',
                    message: 'Camera and microphone detected and permitted',
                });
            } catch (err: any) {
                let errorMessage = 'Failed to access camera or microphone';
                
                if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                    errorMessage = 'Camera or microphone permission was denied';
                } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
                    errorMessage = 'No camera or microphone was found';
                } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
                    errorMessage = 'Camera or microphone is already in use by another application';
                }

                this.updateCheck('mediaDevices', {
                    status: 'failed',
                    message: errorMessage,
                });
            }
        } else {
            this.updateCheck('mediaDevices', {
                status: 'failed',
                message: 'Camera and microphone access not supported',
            });
        }
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    reset(): void {
        this._checks.update(checks =>
            checks.map(c => ({ ...c, status: 'pending' as CheckStatus, message: undefined }))
        );
        this.isRunning.set(false);
        this.isComplete.set(false);
    }
}
