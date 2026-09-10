import { computed, effect, inject, Injectable, signal, untracked } from "@angular/core";
import { TauriService } from "./tauri";
import { BatteryStatus, ICandidateAutoSaveResponse } from "../../store/model/types";
import { toSignal } from "@angular/core/rxjs-interop";
import { interval } from "rxjs";
import { Store } from "../../store/store";

@Injectable({ providedIn: 'root' })
export class APIIPC {
     private _tauriService = inject(TauriService)
     private _store = inject(Store)

     isRunningOnDevice = signal<boolean>(false)
     ipcListen = computed(() => this._tauriService.tauriListen())
     ipcInvoke = computed(() => this._tauriService.tauriInvoke())
     autoSaveResponseUpdate = signal<ICandidateAutoSaveResponse | null>(null)
     unlistenFns: any[] = []
     poolInterval = toSignal(interval(10000))
     pool = effect(() => {
          const tick = this.poolInterval()
          if (tick === undefined) {
               return
          }

          if (!this.isRunningOnDevice()) {
               return
          }

          return untracked(() => {
               this.getDeviceBatteryUpdate()
          })
     })

     constructor() {
          effect(() => {
               if (this.ipcListen()) {
                    return untracked(() => {
                         this.unlistenFns.map((fn) => fn())
                         this.listenForAutosave()
                    })
               }
          })
     }

     async checkDeviceStatus() {
          const windowObj: any = window
          if (typeof windowObj === "undefined" || !windowObj.__TAURI__?.core?.invoke) {
               this.isRunningOnDevice.set(false)
               return;
          }

          try {
               await windowObj.__TAURI__.core.invoke("get_connectivity_status");
               this.isRunningOnDevice.set(true);
          } catch {
               this.isRunningOnDevice.set(false);
          }
     }

     listenForAutosave() {
          const unlisten = this.ipcListen()('autosave_response', (event: any) => {
               const data = event.payload
               if (!data) {
                    return
               }

               this.autoSaveResponseUpdate.set(data)
          })

          this.unlistenFns.push(unlisten)
     }

     async getDeviceBatteryUpdate() {
        try {
               const res = await this.ipcInvoke()('get_battery_status');
               const status = res as BatteryStatus 
               if (!status) {
                    this._store.updateStore({ batteryStatus: null })
                    return
               }

               if(status?.battery == 'NONE') {
                    this._store.updateStore({ batteryStatus: null })
               }

               if (status?.battery === "CHARGE") {
                    this._store.updateStore({ batteryStatus: status })
               }

        } catch (error) { }
     }
}