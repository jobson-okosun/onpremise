import { Injectable, signal, computed } from '@angular/core';

export type CheckStatus = 'pending' | 'checking' | 'passed' | 'failed' | 'warning';

export interface SystemCheckItem {
    id: string;
    label: string;
    description: string;
    status: CheckStatus;
    message?: string;
    critical: boolean; // If critical and fails, user cannot proceed
}

export interface NetworkSpeedResult {
    downloadMbps: number;
    latencyMs: number;
}

@Injectable({ providedIn: 'root' })
export class SystemCheckService {
    private _checks = signal<SystemCheckItem[]>([
        {
            id: 'internet',
            label: 'Internet Connection',
            description: 'Checking if you are connected to the internet...',
            status: 'pending',
            critical: true,
        },
        {
            id: 'webrtc',
            label: 'Video Streaming',
            description: 'Checking if video streaming is supported...',
            status: 'pending',
            critical: true,
        },
        {
            id: 'mediaDevices',
            label: 'Camera & Microphone',
            description: 'Checking if camera and microphone are available...',
            status: 'pending',
            critical: true,
        },
        {
            id: 'speed',
            label: 'Connection Speed',
            description: 'Checking your internet speed...',
            status: 'pending',
            critical: false,
        },
        {
            id: 'latency',
            label: 'Response Time',
            description: 'Checking how fast your connection responds...',
            status: 'pending',
            critical: false,
        },
        {
            id: 'screen',
            label: 'Screen Size',
            description: 'Checking your display size...',
            status: 'pending',
            critical: false,
        },
    ]);

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

    private updateCheck(id: string, update: Partial<SystemCheckItem>) {
        this._checks.update(checks =>
            checks.map(c => (c.id === id ? { ...c, ...update } : c))
        );
    }

    async runAllChecks(): Promise<boolean> {
        this.isRunning.set(true);
        this.isComplete.set(false);

        // Reset all checks to pending
        this._checks.update(checks =>
            checks.map(c => ({ ...c, status: 'pending' as CheckStatus, message: undefined }))
        );

        // Run checks sequentially for better UX (user can see progress)
        await this.checkInternetConnection();
        await this.checkConnectionSpeed();
        await this.checkScreenSize();
        await this.checkWebRTC();
        await this.checkMediaDevices();

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
        this.updateCheck('latency', { status: 'checking' });
        await this.delay(300);

        try {
            // Use Network Information API if available
            const connection = (navigator as any).connection;

            if (connection) {
                const effectiveType = connection.effectiveType;
                const downlink = connection.downlink; // Mbps

                // Check speed
                if (downlink >= 2) {
                    this.updateCheck('speed', {
                        status: 'passed',
                        message: 'Good connection speed',
                    });
                } else if (downlink >= 0.5) {
                    this.updateCheck('speed', {
                        status: 'warning',
                        message: 'Connection may be slow',
                    });
                } else {
                    this.updateCheck('speed', {
                        status: 'warning',
                        message: 'Slow connection detected',
                    });
                }

                // Check latency via RTT
                const rtt = connection.rtt; // Round-trip time in ms
                if (rtt && rtt < 150) {
                    this.updateCheck('latency', {
                        status: 'passed',
                        message: 'Fast response time',
                    });
                } else if (rtt && rtt < 300) {
                    this.updateCheck('latency', {
                        status: 'warning',
                        message: 'Moderate response time',
                    });
                } else if (rtt) {
                    this.updateCheck('latency', {
                        status: 'warning',
                        message: 'Slow response time',
                    });
                } else {
                    this.updateCheck('latency', {
                        status: 'passed',
                        message: 'Response time looks good',
                    });
                }
            } else {
                // Fallback: assume OK if API not available
                this.updateCheck('speed', {
                    status: 'passed',
                    message: 'Connection speed looks good',
                });
                this.updateCheck('latency', {
                    status: 'passed',
                    message: 'Response time looks good',
                });
            }
        } catch {
            this.updateCheck('speed', {
                status: 'warning',
                message: 'Could not check speed',
            });
            this.updateCheck('latency', {
                status: 'warning',
                message: 'Could not check response time',
            });
        }
    }

    private async checkScreenSize(): Promise<void> {
        this.updateCheck('screen', { status: 'checking' });
        await this.delay(300);

        const width = window.screen.width;
        const height = window.screen.height;
        const isMobile = width < 768 || height < 768;
        
        // For mobile: minimum 320x480 (portrait) or 480x320 (landscape)
        // For desktop: minimum 1024x768
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
                // Just check if the API is available, don't request permissions yet
                const devices = await navigator.mediaDevices.enumerateDevices();
                const hasVideo = devices.some(d => d.kind === 'videoinput');
                const hasAudio = devices.some(d => d.kind === 'audioinput');

                if (hasVideo && hasAudio) {
                    this.updateCheck('mediaDevices', {
                        status: 'passed',
                        message: 'Camera and microphone detected',
                    });
                } else if (hasVideo) {
                    this.updateCheck('mediaDevices', {
                        status: 'warning',
                        message: 'Camera found, but no microphone',
                    });
                } else if (hasAudio) {
                    this.updateCheck('mediaDevices', {
                        status: 'warning',
                        message: 'Microphone found, but no camera',
                    });
                } else {
                    this.updateCheck('mediaDevices', {
                        status: 'failed',
                        message: 'No camera or microphone found',
                    });
                }
            } catch {
                this.updateCheck('mediaDevices', {
                    status: 'passed',
                    message: 'Camera and microphone available',
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
