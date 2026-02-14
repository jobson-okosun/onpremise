import { HttpClient } from "@angular/common/http";
import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { IAssessmentPreLoginData, ICandidateAutoSave, ICandidateAutoSaveResponse, ICandidateEndExamData, ICandidateLoginDTO, ICandidateLoginResponse, ICandidationEndExamResponse, Ping, Pong } from "../store/model/types";
import { filter, finalize, interval, map, Observable, of, Subscription } from "rxjs";
import { environment } from "../../environments/environment";
import { DomSanitizer } from "@angular/platform-browser";
import { Store } from "../store/store";
import { APP_BRANDING } from "../utils/constants";
import { toSignal } from "@angular/core/rxjs-interop";
import { NavigationEnd, Router } from "@angular/router";
import { formatExamResponseData } from "../utils/helper";

@Injectable({ providedIn: 'root' })
export class DataService {
    private _router = inject(Router);
    private _http = inject(HttpClient)
    private _sanitizer = inject(DomSanitizer)
    private _store = inject(Store)

    pollSub$: Subscription
    store = computed(() => this._store.store())
    currentUrl = toSignal(this._router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd), map(e => e.urlAfterRedirects)), { initialValue: this._router.url });
    shouldPoll = computed(() => this.store().platformIsTauri && ['usage-guide', 'welcome', 'login'].some(p => this.currentUrl().includes(p)));
    serverPoll = effect(() => {
        if (this.shouldPoll()) {
            if (!this.pollSub$ || this.pollSub$.closed) {
                this.serverHealthPool();
            }
        } else {
            this.pollSub$?.unsubscribe();
        }
    });
    isAutoSavePendingResolve = signal(false)


    serverHealthPool() {
        this.pollSub$ = interval(20000).subscribe(() => {
            this.pingServer({ message: "ping" }).subscribe({
                next: () => this._store.updateStore({ isServerConnected: true }),
                error: () => this._store.updateStore({ isServerConnected: false })
            });
        });
    }

    fetchPreLoginData(): Observable<IAssessmentPreLoginData> {
        return this._http.get<IAssessmentPreLoginData>(`${environment.developmentIP}/candidate/fetch_prelogin_data`);
    }

    pingServer(payload: Ping): Observable<Pong> {
        console.log(this.currentUrl())
        return this._http.post<any>(`${environment.developmentIP}/candidate/heartbeat`, payload, { withCredentials: true });
    }

    login(payload: ICandidateLoginDTO): Observable<ICandidateLoginResponse> {
        return this._http.post<ICandidateLoginResponse>(`${environment.developmentIP}/auth/candidate_login`, payload);
    }

    autoSave(payload: ICandidateAutoSave): Observable<null | ICandidateAutoSaveResponse> {
        if (this.isAutoSavePendingResolve()) {
            return of(null)
        }

        this.isAutoSavePendingResolve.set(true);
        const assessmentId = this.store().preloginData?.id
        const loginValue = this.store().loginData?.candidate_data.login_field_value
        const computerId = this.store().preloginData?.unique_id;
        const battery_status = this.store().batteryStatus
        const autoSaveUrl = `${environment.developmentIP}/candidate/auto_save/assessment/${assessmentId}/login_value/${loginValue}/computer_id/${computerId}`;

        payload = { ...payload, battery_status }
        return this._http.post<ICandidateAutoSaveResponse>(autoSaveUrl, payload).pipe(finalize(() => this.isAutoSavePendingResolve.set(false)));
    }

    endExam(payload: ICandidateAutoSave, timedOut: boolean, hasDrawingAndWriting:boolean): Observable<ICandidationEndExamResponse> {
        const battery_status = this.store().batteryStatus
        const assessmentId = this.store().preloginData?.id
        const loginValue = this.store().loginData?.candidate_data.login_field_value

        payload = { ...payload, battery_status }
        let endExamPayload: ICandidateEndExamData = { autosave: payload, timed_out: timedOut, is_drawing_writing: hasDrawingAndWriting };
        endExamPayload = formatExamResponseData(endExamPayload)

        return this._http.post<ICandidationEndExamResponse>(
            `${environment.developmentIP}/candidate/end_exam/assessment/${assessmentId}/login_value/${loginValue}`,
            endExamPayload
        );
    }


    async downloadOrganizationAssets() {
        const hasNoBranding = { organizationAssets: { ...this.store().organizationAssets, logo: APP_BRANDING.logo, hasLogo: false } }

        try {
            let response = await fetch(`${environment.developmentIP}/candidate/logo`);
            let blob = await response.blob();

            if (!blob || !response.ok) {
                this._store.updateStore(hasNoBranding)
                return;
            }

            const objectURL = URL.createObjectURL(blob);
            const safImgUrl = this._sanitizer.bypassSecurityTrustUrl(objectURL);

            const hasBranding = { organizationAssets: { ...this.store().organizationAssets, logo: safImgUrl, hasLogo: true } }
            this._store.updateStore(hasBranding)

        } catch (e) {
            this._store.updateStore(hasNoBranding)
        }
    }

    async downloadParticipantPassport() {
        const loginId = this.store().loginData?.candidate_data.login_field_value
        const passportLocation = this.store().preloginData?.passport_location

        try {
            let response = await fetch(`${environment.developmentIP}/candidate/passport/${loginId}.jpg/assessment/${passportLocation}`);
            let blob = await response.blob();

            if (!blob || !response.ok) {
                return;
            }

            const objectURL = URL.createObjectURL(blob);
            const safImgUrl = this._sanitizer.bypassSecurityTrustUrl(objectURL);

            this._store.updateStore({ candidatePassport: safImgUrl })

        } catch (e) { }
    }
}