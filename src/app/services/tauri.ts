import { effect, inject, Injectable, signal } from "@angular/core";
import { Store } from "../store/store";
import { BatteryStatus } from "../store/model/types";
import { toSignal } from "@angular/core/rxjs-interop";
import { interval } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TauriService {
    private _store = inject(Store)

    unlistenFns: any[] = []
    tauriInvoke = signal<any | null>(null)
    tauriListen = signal<any | null>(null)
    poolInterval = toSignal(interval(3000));
    pinPool = effect(() => {
        const tick = this.poolInterval();
        if (tick === undefined) {
            return
        }

        if (!this._store.store().platformIsTauri) {
            return
        }

        if (!this.isAndroid()) {
            return
        }

        this.isAppPinned();
    });

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

            this.listenForInfrigement()
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

    initializeBatteryStatus() {
        const noneStatus: BatteryStatus = { battery: 'NONE' };
        const batteryStatus = noneStatus

        this._store.updateStore({ batteryStatus })
    }

    async KillBrowserFromAutoSave() {
        try {
            await this.tauriInvoke()('exit_browser_autosave')
        } catch (error) { }
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

    async listenForInfrigement() {

        try {
            const unlisten = await this.tauriListen()('infrigment::discovered', (event: any) => {
                const infridgementMessage = event.payload || 'Infrigement Detected';
                this._store.updateStore({ infridgementMessage });
            });

            this.unlistenFns.push(unlisten)
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

    isAndroid() {
        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
        return /android/i.test(userAgent)
    }
}