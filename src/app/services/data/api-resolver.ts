import { computed, Injectable, inject } from "@angular/core";
import { APIIPC } from "../ipc/api-ipc";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ApiResolver {
     private _apiIpc = inject(APIIPC);
     isTabletMode = computed(() => this._apiIpc.isRunningOnDevice());

     getAuthBaseUrl(path: string): string {
          return this.isTabletMode() ?
               `${environment.tabletRelayBase}/api/auth/${path}` :
               `${environment.developmentIP}/auth/${path}`;
     }

     getExamModeUrl(path: string): string {
          return this.isTabletMode() ?
               `${environment.tabletRelayBase}/api/candidate/${path}` :
               `${environment.domain}/${path}`;
     }

     getCandidateBaseUrl(path: string): string {
          return this.isTabletMode() ?
               `${environment.tabletRelayBase}/api/candidate/${path}` :
               `${environment.developmentIP}/candidate/${path}`;
     }

     getPreloginDataBaseUrl(path: string): string {
          return this.isTabletMode() ? 
          `${environment.tabletRelayBase}/api/candidate/${path}/EPAPER` :
          `${environment.developmentIP}/candidate/${path}`;
     }

     getNetworkCheckUrl(): { DOWNLOAD: string, UPLOAD: string, LATENCY: string} {
        return this.isTabletMode() ?
          {DOWNLOAD: '', UPLOAD: '', LATENCY: ''}
          :
          environment.NETWORK_CHECK
     }

     getProctoringWebsocketUrl(): string {
        return this.isTabletMode() ?
          environment.PROCTORING_WS : `${environment.domain}/ws`
     }
}