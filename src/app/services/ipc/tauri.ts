import { inject, Injectable, signal } from "@angular/core";
import { Store } from "../../store/store";
import { ExamPause, IntegrityEvent } from "../../store/model/types";

@Injectable({ providedIn: 'root' })
export class TauriService {
    private _store = inject(Store)

    unlistenFns: any[] = []
    tauriInvoke = signal<any | null>(null)
    tauriListen = signal<any | null>(null)
    // poolInterval = toSignal(interval(3000));
    // pinPool = effect(() => {
    //     const tick = this.poolInterval();
    //     if (tick === undefined) {
    //         return
    //     }

    //     if (!this._store.store().platformIsTauri) {
    //         return
    //     }

    //     if (!this.isAndroid()) {
    //         return
    //     }

    //     this.isAppPinned();
    // });

    isTauri(): boolean {
        return !!(window as any).__TAURI_INTERNALS__;
    }

    async importTauriApis(): Promise<void> {
        return new Promise(async (resolve) => {
            const { invoke } = await import('@tauri-apps/api/core');
            const { listen } = await import('@tauri-apps/api/event');

            this.tauriInvoke.set(invoke)
            this.tauriListen.set(listen)

            resolve()
        })
    }

    async updatePlatformType() {
        let platformIsTauri = false

        if (!this.isTauri()) {
            platformIsTauri = false
            return
        }

        await this.importTauriApis()
        platformIsTauri = await this.verifyTauriEnvironment()

        if (platformIsTauri) {
            if (!this.isTauri()) {
                return
            }

        }
        this._store.updateStore({ platformIsTauri })
    }


    async verifyTauriEnvironment(): Promise<boolean> {
        try {
            const result = await this.tauriInvoke()('is_tauri_app');
            return !!result;
        } catch (error) {
            return true
        }
    }

    async closeApp() {
        try {
            await this.tauriInvoke()('close_app');
        } catch (e) {
            await (window as any).__TAURI__.window.getCurrentWindow().close();
            try {
            } catch (_) { }
        }
    }


    async sendExamStarted() {
        try {
            await this.tauriInvoke()('exam_started');
        } catch (error) { }
    }

    async sendExamEnded() {
        try {
            await this.tauriInvoke()('exam_ended');
        } catch (error) { }
    }

    async isAppPinned() {
        try {
            const result = await this.tauriInvoke()('is_pinned');
            this._store.updateStore({ appIsPinned: !!result });

        } catch (error) {
            this._store.updateStore({ appIsPinned: false });
        }
    }


    async pinApplication() {
        try {
            this._store.updateStore({ appIsPinned: true });
            await this.tauriInvoke()('pin_app');
        } catch (error) {
            console.log(error)
        }
    }

    async exitApplication(payload: { password: string }) {
        try {
            const result = await this.tauriInvoke()('exit', payload);
        } catch (error) {
            const message = (error as any)?.message || 'Unable to exit application';
            this._store.updateStore({ exitApplicationMessage: message });
        }
    }

    async bindIntegrityScope(scope: string) {
        try {
            await this.tauriInvoke()('bind_integrity_scope', { scope });
        } catch (error) {
            console.error('Failed to bind integrity scope', error);
        }
    }

    async getPendingIntegrityEvents(): Promise<IntegrityEvent[]> {
        try {
            return await this.tauriInvoke()('get_pending_integrity_events');
        } catch (error) {
            console.error('Failed to get pending integrity events', error);
            return [];
        }
    }

    async ackIntegrityEvents(eventIds: string[]) {
        if (!eventIds.length) return;
        try {
            await this.tauriInvoke()('ack_integrity_events', { eventIds });
        } catch (error) {
            console.error('Failed to ack integrity events', error);
        }
    }

    async getActivePauses(): Promise<ExamPause[]> {
        try {
            return await this.tauriInvoke()('get_active_pauses');
        } catch (error) {
            console.error('Failed to get active pauses', error);
            return [];
        }
    }

    async ackExamPause(pauseId: string) {
        try {
            await this.tauriInvoke()('ack_exam_pause', { pauseId });
        } catch (error) {
            console.error('Failed to ack exam pause', error);
        }
    }

    async endExamSession() {
        try {
            await this.tauriInvoke()('end_exam_session');
        } catch (error) {
            console.error('Failed to end exam session', error);
        }
    }

    async listenForIntegrityEvents(callback: (event: IntegrityEvent) => void) {
        try {
            const unlisten = await this.tauriListen()('integrity-event', (event: any) => {
                callback(event.payload as IntegrityEvent);
            });
            this.unlistenFns.push(unlisten);
        } catch (error) {
            console.error('Failed to listen for integrity events', error);
        }
    }

    async listenForExamPauses(onPause: (pause: ExamPause) => void, onResume: (pauseId: string) => void) {
        try {
            const unlistenPause = await this.tauriListen()('exam-pause', (event: any) => {
                onPause(event.payload as ExamPause);
            });
            const unlistenResume = await this.tauriListen()('exam-resume', (event: any) => {
                onResume(event.payload.pauseId);
            });
            this.unlistenFns.push(unlistenPause, unlistenResume);
        } catch (error) {
            console.error('Failed to listen for exam pauses', error);
        }
    }

    isAndroid() {
        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
        return /android/i.test(userAgent);
    }
}