import { HttpClient } from "@angular/common/http";
import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { IAssessmentPreLoginData, ICandidateAutoSave, ICandidateAutoSaveResponse, ICandidateEndExamData, ICandidateLoginDTO, ICandidateLoginResponse, ICandidationEndExamResponse, Ping, Pong } from "../store/model/types";
import { filter, finalize, interval, map, Observable, of, Subscription } from "rxjs";
import { environment } from "../../environments/environment";
import { DomSanitizer } from "@angular/platform-browser";
import { Store } from "../store/store";
import { APP_BRANDING, MINIMUM_REASONABLE_DOWNLOAD_SPEED } from "../utils/constants";
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
        return this._http.post<any>(`${environment.developmentIP}/candidate/heartbeat`, payload, { withCredentials: true });
    }

    login(payload: Partial<ICandidateLoginDTO>): Observable<ICandidateLoginResponse> {
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

    endExam(payload: ICandidateAutoSave, timedOut: boolean, hasDrawingAndWriting: boolean): Observable<ICandidationEndExamResponse> {
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

    async runNetworkCheck() {
        const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
        await sleep(Math.random() * 5_000);

        let download, upload, latency;

        try {
            upload = await this._checkUploadSpeed().catch(() => 0);

            [download, latency] = await Promise.all([
                this._checkDownloadSpeed().catch(() => 0),
                this._checkLatency(5).catch(() => ({ avg: 999, min: 999, max: 999, jitter: 999, samples: [] })),
            ]);

        } catch (err) {
            return {
                passed: false,
                download: { mbps: 0, passed: false },
                upload: { mbps: 0, passed: false },
                latency: { avg: 999, passed: false },
            };
        }

        const result = {
            download: {
                mbps: +download.toFixed(2),
                // passed: download >= 1,
                passed: download >= 0.6,
            },
            upload: {
                mbps: +upload.toFixed(2),
                // passed: upload >= 2,
                passed: upload >= MINIMUM_REASONABLE_DOWNLOAD_SPEED,
            },
            latency: {
                avg: +latency.avg.toFixed(0),
                min: +latency.min.toFixed(0),
                max: +latency.max.toFixed(0),
                jitter: +latency.jitter.toFixed(0),
                // passed: latency.avg <= 150 && latency.jitter <= 30,
                passed: latency.avg <= 600 && latency.jitter <= 200,
            },
            passed: false,
        };

        result.passed = result.download.passed && result.upload.passed && result.latency.passed;
        return result;
    }

    private async _checkDownloadSpeed() {
        const SIZE_MB = 2.04;

        const url = environment.NETWORK_CHECK.DOWNLOAD
        const start = performance.now();

        const response = await fetch(url, { cache: "no-store" });
        if (!response.body) return 0;

        const reader = response.body.getReader();
        while (true) {
            const { done } = await reader.read();
            if (done) break;
        }

        const duration = (performance.now() - start) / 1000;

        return (SIZE_MB * 8) / duration;
    }

    async _checkUploadSpeed() {
        const SIZE_MB = 1;
        const totalBytes = SIZE_MB * 1024 * 1024;
        const bytes = new Uint8Array(totalBytes);
        const CHUNK_SIZE = 65536;

        for (let offset = 0; offset < totalBytes; offset += CHUNK_SIZE) {
            crypto.getRandomValues(
                bytes.subarray(
                    offset,
                    Math.min(offset + CHUNK_SIZE, totalBytes)
                )
            );
        }

        const url = environment.NETWORK_CHECK.UPLOAD;
        const start = performance.now();

        const res = await fetch(url, {
            method: "POST",
            body: bytes,
            cache: "no-store",
        });
        if (!res.ok) throw new Error("Upload failed");

        const duration = (performance.now() - start) / 1000;

        return (SIZE_MB * 8) / duration;
    }

    private async _checkLatency(samples = 5) {
        const rtts = [];
        const url = environment.NETWORK_CHECK.LATENCY;
        const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

        for (let i = 0; i < samples; i++) {
            const start = performance.now();
            try {
                await fetch(url, { method: "HEAD", cache: "no-store" });
                rtts.push(performance.now() - start);
            } catch (e) {
                await fetch(url, { method: "GET", cache: "no-store" });
                rtts.push(performance.now() - start);
            }
            if (i < samples - 1) await sleep(200);
        }

        const avg = rtts.reduce((a, b) => a + b, 0) / rtts.length;
        const min = Math.min(...rtts);
        const max = Math.max(...rtts);
        const jitter = rtts.reduce((a, b) => a + Math.abs(b - avg), 0) / rtts.length;

        return { avg, min, max, jitter };
    }
}