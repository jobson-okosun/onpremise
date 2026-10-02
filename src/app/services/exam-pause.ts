import { inject, Injectable, signal, computed } from "@angular/core";
import { TauriService } from "./ipc/tauri";
import { ExamPause } from "../store/model/types";
import { Store } from "../store/store";

@Injectable({ providedIn: 'root' })
export class ExamPauseService {
    private _tauri = inject(TauriService);
    private _store = inject(Store);

    private _activePauses = signal<Map<string, ExamPause>>(new Map());

    public activePauses = computed(() => Array.from(this._activePauses().values()));
    public hasActivePauses = computed(() => this._activePauses().size > 0);
    public activePauseMessage = computed(() => {
        const pauses = this.activePauses();
        if (pauses.length === 0) return '';
        return pauses.map(p => p.message).join(' | ');
    });

    public isExitRequired = computed(() => {
        return this.activePauses().some(p => p.resolution === 'exit_required');
    });

    async init() {
        const store = this._store.store();
        if (!store.platformIsTauri) return;

        try {
            const pauses = await this._tauri.getActivePauses();
            const pauseMap = new Map<string, ExamPause>();

            pauses.forEach(p => pauseMap.set(p.pauseId, p));
            this._activePauses.set(pauseMap);

            this._tauri.listenForExamPauses(
                async (pause: ExamPause) => {
                    // Immediately acknowledge the pause
                    await this._tauri.ackExamPause(pause.pauseId);

                    this._activePauses.update(map => {
                        const newMap = new Map(map);
                        newMap.set(pause.pauseId, pause);
                        return newMap;
                    });
                },
                (pauseId: string) => {
                    this._activePauses.update(map => {
                        const newMap = new Map(map);
                        newMap.delete(pauseId);
                        return newMap;
                    });
                }
            );
        } catch (error) {
            console.error('Failed to init exam pause service', error);
        }
    }

    async closeBrowser() {
        await this._tauri.closeApp();
    }
}
