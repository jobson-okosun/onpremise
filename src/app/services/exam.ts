import { computed, effect, inject, Injectable, linkedSignal, signal, untracked } from "@angular/core";
import { Store } from "../store/store";
import { DeliveryMethod, ExamType, ICandidateAutoSave, ICandidateAutoSaveResponse, ICandidationEndExamResponse, ItemType } from "../store/model/types";
import { catchError, of, delayWhen, finalize, interval, retryWhen, scan, Subscription, take, timer } from "rxjs";
import { DataService } from "./data/data";
import { disableRestrictedActions, enableRestrictedActions, formatDuration, generatePayLoadForAutoSave, generatePayLoadWithAllData } from "../utils/helper";
import { HotToastService } from "@ngxpert/hot-toast";
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { ProctorService } from "./auto-proctoring/proctor";
import { SystemCheckService } from "./system-check/system-check";
import { MINIMUM_REASONABLE_DOWNLOAD_SPEED, MINIMUM_REASONABLE_DOWNLOAD_SPEED_OFFSET, NETWORK_RETRY_INTERVAL } from "../utils/constants";
import { LiveProctoringService } from "./live-proctoring/live-proctoring.service";
import { EventService } from "./event";
import { CandidateEventType } from "../store/model/events/events.enum";
import { PostLogin } from "./onboarding/post-login";
import { TauriService } from "./ipc/tauri";

@Injectable({ providedIn: 'root' })
export class ExamService {
    private _dataService = inject(DataService)
    private _store = inject(Store)
    private _toast = inject(HotToastService)
    private _router = inject(Router)
    private _tauriService = inject(TauriService)
    private _postLoginService = inject(PostLogin)
    private _autoProctoringService = inject(ProctorService);
    private _liveProctoringService = inject(LiveProctoringService);
    private _systemCheckService = inject(SystemCheckService)
    public _eventService = inject(EventService)

    examTimerSub$: Subscription;
    proctoringNetworkSubscription$: Subscription
    examSubmit$: Subscription;
    screenWidth = signal<number>(window.innerWidth);
    itemTypes = signal(ItemType);
    examDuration = signal(0)
    canEndExam = signal(false);
    showUnattemptedModal = signal(false)
    cummulativeExamDuration = linkedSignal(() => this._postLoginService.cummulativeExamDuration())
    autoSaveInterval = signal(0)
    examEnded = signal(false)
    lastAutoSaveTime = signal(new Date())
    isAutosaveSaved = signal(false)
    lastAutoSaveTimeSec = signal(0);
    isAutoSaving = signal(false);
    isAutoSaveSuccessful = signal(true);
    itemsLastSync = signal(0)
    connectionStatus = signal(true)
    isCandidateSuspended = signal(false)
    isCandidateSuspendedModalActive = signal(false)
    logoutCandidate = signal(false)
    logoutCandidateReason = signal('')
    isConcurrentExamModalActive = signal(false)
    closeBrowerCounter = signal<null | number>(null)
    isActivityWarningDisplayed = signal(false);
    inactivityTimer = signal(Date.now())
    connectionAlertShown = signal(false)
    examTimedOut = signal(false)
    timeDisplay = signal({ min: 0, sec: 0 })
    store = computed(() => this._store.store())
    sectionsSummary = signal<null | { id: string, summary: { attempted: number[], unattempted: number[], revisits: number[], progress: number } }[]>(null)
    totalSectionsQuestions = computed(() => this.store().sections.reduce((curr, item) => curr + item.items.length, 0))
    totalAttemptedQuestions = computed(() => this.sectionsSummary() ? this.sectionsSummary()!.reduce((curr, item) => curr + item.summary.attempted.length, 0) : 0)
    pinnedRestrictionApplied = signal(false)
    lastUnpinnedTimeInMins = signal(0)
    lastAutosaveTimeDifference = signal(0)
    
    examType = computed(() => this.store().preloginData?.exam_type ?? ExamType.EXAMALPHA)
    isExamAlpha = computed(() => ExamType.EXAMALPHA == this.examType())

    isAutoProctoring = computed(() => this.store().preloginData?.delivery_method == DeliveryMethod.AUTO_PROCTORING)
    isLiveProctoring = computed(() => this.store().preloginData?.delivery_method == DeliveryMethod.LIVE_PROCTORING)
    isProctoredExam = computed(() => this.isLiveProctoring() || this.isAutoProctoring())
    isCheckingProctoringNetwork = signal(false)
    proctoringNetworkSpeed = linkedSignal(() => this._systemCheckService.networkCheckResults()?.upload ?? 0)
    proctoringLatencyStatus = signal<'good' | 'poor' | 'checking'>('checking')
    proctoringNetworkRetryCount = signal(0)
    proctoringNetworkRetryCountdown = signal<number | null>(null);
    isProctoringNetworkRetryActive = signal(false);
    private proctoringNetworkRetrySub?: Subscription;
    private proctoringLatencyMonitorSub$?: Subscription;
    private proctoringUploadMonitorSub$?: Subscription;

    constructor() {
        console.log('-----Oh youre here 🤣🤣🤣! Goodluck hahaha-----------------')

        this._autoProctoringService.onStreamErrorCallback = () => {
            this.triggerProctoringNetworkRetry();
        };

        effect(() => {
            const isOnline = this.connectionStatus();
            untracked(() => {
                if (isOnline) {
                    this._eventService.logEvent({ event_type: CandidateEventType.NETWORK_ONLINE });
                } else {
                    this._eventService.logEvent({ event_type: CandidateEventType.NETWORK_OFFLINE });
                }
            });
        });
    }

    isAppPinned = effect(() => {
        const isPinned = this.store().appIsPinned;
        if (!isPinned) {
            if (this.pinnedRestrictionApplied()) {
                return;
            }

            if (this.examTimerSub$) {
                this.examTimerSub$.unsubscribe();
            }

            disableRestrictedActions();
            this.pinnedRestrictionApplied.set(true)
            this.lastUnpinnedTimeInMins.set(this.timeDisplay().min)

            return
        }

        if (this.pinnedRestrictionApplied()) {
            this.startExam(this.lastUnpinnedTimeInMins());
            enableRestrictedActions();
            this.pinnedRestrictionApplied.set(false)
        }
    })

    currentSectionSummary = computed(() => {
        if (!this.sectionsSummary()?.length) {
            return null
        }

        return this.sectionsSummary()?.find(item => item.id == this.store().currentSection?.id)
    })

    calcSectionsSummary = effect(() => {
        const store = this.store()

        if (store.sections.length) {
            const summary = store.sections.map(s => {
                const attempted: number[] = [];
                const unattempted: number[] = [];
                const revisits: number[] = [];

                s.items.forEach((item, index) => {
                    if (this.hasValidResponses(item.responses)) {
                        attempted.push(index);
                    } else {
                        unattempted.push(index);
                    }

                    if (item.revisit) {
                        revisits.push(index)
                    };

                    if (revisits.includes(index) && attempted.includes(index)) {
                        const idx = revisits.indexOf(index)
                        revisits.splice(idx, 1)
                        item.revisit = false
                    }
                });

                const progress = attempted.length ? (attempted.length / s.items.length) * 100 : 0
                const section = { id: s.id, summary: { attempted, unattempted, revisits, progress } }
                return section
            })

            this.sectionsSummary.set(summary)
        }
    })

    timeInMinsSpentInExam = computed(() => {
        const totalExamTime = this.cummulativeExamDuration() * 60;
        const remaining = Math.max(this.examDuration(), 0);

        const spent = totalExamTime - remaining;
        return Math.max(0, Math.floor(spent / 60));
    });

    spentTimeDisplay = computed(() => {
        const totalExamSeconds = this.cummulativeExamDuration() * 60;
        const remainingSeconds = this.examDuration();
        const spentSeconds = totalExamSeconds - remainingSeconds;

        const min = Math.floor(spentSeconds / 60);
        const sec = spentSeconds % 60;

        return `${min}:${sec.toString().padStart(2, '0')}`;
    });

    totalExamTime = computed(() => this.cummulativeExamDuration());

    hasValidResponses(responses: any[]) {
        return responses?.some(value => value !== undefined && value.toString().trim() !== "")
    };

    addQuestionForRevisit() {
        const store = this.store()
        const currentQuestion = store.currentSection?.items[this.store().currentQuestionIndex]

        if (!currentQuestion) {
            return
        }

        currentQuestion.revisit = !currentQuestion.revisit
        this._store.updateStore({ currentQuestion })
    }

    getExamDuration(startTime?: number) {
        const isFirstLogin = this.store().loginData!.candidate_data.login_times.length == 0
        const minsLeft = this.store().loginData!.candidate_data.minutes_left * 60
        const time = startTime ? (startTime * 60) : (isFirstLogin ? this.cummulativeExamDuration() * 60 : minsLeft)

        return time
    }

    startExam(startTime?: number) {
        this.examDuration.set(this.getExamDuration(startTime))
        this.autoSaveInterval.set(this.store().loginData!.assessment_data.auto_save_sec)

        this.examTimerSub$?.unsubscribe();

        this.lastAutoSaveTime.set(new Date())
        this.inactivityTimer.set(Date.now())

        this.examTimerSub$ = timer(1000, 1000).subscribe({ next: () => this.examTimerCallback() }) 
    }

    examTimerCallback() {
        if (this.examEnded()) {
            return
        }

        const currentTime = new Date();
        const autoSaveTimeDiff = (currentTime.getTime() - this.lastAutoSaveTime().getTime()) / 1000;
        this.lastAutosaveTimeDifference.set(autoSaveTimeDiff)

        // if (~~autoSaveTimeDiff == 120) {
        //     if (this.connectionAlertShown()) {
        //         return
        //     }

        //     this._toast.error('You have lost connection! Contact admin immediately')
        //     this.connectionAlertShown.set(true)
        // }

        if (autoSaveTimeDiff >= 300) {
            if (!this.isProctoredExam()) {
                if (this.examTimerSub$) {
                    this.examTimerSub$.unsubscribe();
                    disableRestrictedActions();
                    this.displayConectionLossModal();
                }
            }
        }

        if (this.examDuration() <= 0) {
            if (this.examEnded()) {
                return;
            }

            this._eventService.logEvent({ event_type: CandidateEventType.SESSION_TIMEOUT });
            this.examTimedOut.set(true)
            this.showSubmitExamModalOnExamEnd();
            return
        }

        this.calculateTimerCountDown();

        if (this.isAutosaveSaved()) {
            this.lastAutoSaveTimeSec.update(v => v + 1);
            this.lastAutoSaveTime.update(() => new Date())
        }

        if (!this.examEnded() && this.examDuration() % this.autoSaveInterval() === 0) {
            this.autoSaveExam();
            this.lastAutoSaveTimeSec.update(v => 0);
        }

        this.canCandidateEndExam()
        this.startInActivityTimer();
    }

    calculateTimerCountDown() {
        const totalSecondsRemaining = Math.max(this.examDuration(), 0);
        const newRemaining = Math.max(totalSecondsRemaining - 1, 0);

        this.examDuration.set(newRemaining);

        this.timeDisplay.set({
            min: Math.floor(newRemaining / 60),
            sec: newRemaining % 60
        });
    }

    autoSaveExam() {
        const syncStart = Date.now();
        const payload = generatePayLoadForAutoSave(this, this._store)
        
        this.isAutoSaving.set(true)
        this.isAutoSaveSuccessful.set(false)

        this._eventService.logEvent({ event_type: CandidateEventType.SYNC_STARTED });

        this._dataService.autoSave(payload)
            .pipe(finalize(() => this.isAutoSaving.set(false)))
            .subscribe({
                next: (res) => {
                    this.autosaveSuccess(res as any, syncStart, payload)
                    this.isAutoSaveSuccessful.set(true)
                },
                error: () => {
                    this.autosaveFailed(syncStart)
                }
            })
    }

    autosaveFailed(syncStart?: number) {
        const duration_ms = syncStart ? Date.now() - syncStart : undefined;
        this._eventService.logEvent({ event_type: CandidateEventType.SYNC_FAILED, duration_ms });
        this.isAutosaveSaved.set(false)
        this.connectionStatus.set(false)
        this._toast.error('Your network is disconnected. Contact the administrator', { dismissible: true })
    }

    autosaveSuccess(autosaveData: ICandidateAutoSaveResponse, syncTime: any, payload: ICandidateAutoSave) {
        if (!autosaveData) {
            this.autosaveFailed(syncTime)
            return
        }

        const duration_ms = syncTime ? Date.now() - syncTime : undefined;
        this._eventService.logEvent({ event_type: CandidateEventType.SYNC_COMPLETED, duration_ms });
        
        this.isAutosaveSaved.set(autosaveData.auto_saved)
        this.lastAutoSaveTime.set(new Date())
        this.itemsLastSync.set(syncTime)
        this.connectionStatus.set(true)
        
        this._eventService.clearSentEvents(payload.pending_events || [])

        // this.saveEventsToLocalStorage(payload.pending_events || []);

        if (autosaveData.compensatory_time_added) {
            this.handleCompensatoryTimeAddition();
        }

        if (autosaveData.message_from_admin) {
            this.handleMessageFromAdmin(autosaveData.message_from_admin);
        }

        if (this.isCandidateSuspended() !== autosaveData.suspended) {
            this.isCandidateSuspended.set(autosaveData.suspended);
            this.handleCandidateSuspension()
        }

        this.logoutCandidate.set(autosaveData.log_out ? autosaveData.log_out.logout : false)
        this.logoutCandidateReason.set(autosaveData.log_out ? autosaveData.log_out.reason.toLowerCase() : '')
        this.handleConcurrentExams()

        const examEnded = !!autosaveData.exam_ended_response
        if (examEnded) {
            this.handleEndExamOnSuccess(autosaveData.exam_ended_response)
            disableRestrictedActions()
        }

        if (autosaveData.close_browser) {
            this.closeCandidateBrowser()
        }
    }

    private saveEventsToLocalStorage(events: any[]) {
        if (!events || events.length === 0) return;
        try {
            const existingLogsStr = localStorage.getItem('events_log');
            const existingLogs = existingLogsStr ? JSON.parse(existingLogsStr) : [];
            const updatedLogs = [...existingLogs, ...events];
            localStorage.setItem('events_log', JSON.stringify(updatedLogs));
        } catch (e) {
            console.error('Failed to save events log to local storage', e);
        }
    }

    handleCompensatoryTimeAddition() {
        const loginData = { ...this.store().loginData }
        const compensatoryTime = loginData.assessment_data!.compensatory_time_value

        loginData.candidate_data!.minutes_left += compensatoryTime;
        this.timeDisplay.update((u) => ({ min: u.min + compensatoryTime, sec: u.sec }));
        this.examDuration.update(u => u + (60 * compensatoryTime))

        this._toast.success('Compensatory time added')
    }

    handleMessageFromAdmin(message: string) {
        this._toast.success(message)
    }

    handleCandidateSuspension() {
        if (this.isCandidateSuspended()) {
            disableRestrictedActions();
            this.openSuspensionModal();
        } else {
            enableRestrictedActions();
            this.closeSuspensionModal();
        }
    }

    openSuspensionModal() {
        if (!this.isCandidateSuspendedModalActive()) {
            this.isCandidateSuspendedModalActive.set(true);
        }
    }

    closeSuspensionModal() {
        if (this.isCandidateSuspendedModalActive()) {
            this.isCandidateSuspendedModalActive.set(false);
        }
    }

    handleConcurrentExams() {
        if (!this.logoutCandidate()) {
            return
        }

        if (this.isCandidateSuspended()) {
            return
        }

        // disallow candidate exam
        if (!this.isConcurrentExamModalActive()) {
            if (this.examTimerSub$) {
                this.examTimerSub$.unsubscribe();
            }

            disableRestrictedActions();
            this.isConcurrentExamModalActive.set(true)
        }
    }

    private handleEndExamOnSuccess(value: ICandidationEndExamResponse) {
        this.examEnded.set(true)
        this._tauriService.sendExamEnded()
        this._store.updateStore({ endExamResponse: value })

        if (this.examTimerSub$ !== undefined) {
            this.examTimerSub$.unsubscribe();
        }

        this.showExamSubmittedExamOnExamEnd();
    }

    showExamSubmittedExamOnExamEnd() {
        Swal.fire({
            title: 'Exam Submitted',
            text: 'All done! Your exam has been submited',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            heightAuto: false,
        });

        timer(2000).subscribe(() => {
            Swal.close();
            this._router.navigate(['exam-ended']);
        });
    }

    closeCandidateBrowser() {
        disableRestrictedActions();
        this.examTimerSub$?.unsubscribe();

        interval(1000).pipe(take(30)).subscribe({
            next: (tick) => {
                this.closeBrowerCounter.set(29 - tick);
            },
            complete: async () => {
                this.closeBrowerCounter.set(null);
                this._tauriService.closeApp()
            }
        });
    }

    canCandidateEndExam() {
        const canEndExamWhen = this.store().loginData!.assessment_data.allow_end_exam_after_xquestions;

        const examDuration = this.cummulativeExamDuration() * 60;
        const candidateExamTimeRemaining = this.timeDisplay().min * 60;
        const timeSpent = examDuration - candidateExamTimeRemaining;

        const timeSpentPercentage = (timeSpent / examDuration) * 100;
        const canEnd = timeSpentPercentage >= canEndExamWhen;

        this.canEndExam.set(canEnd)
    }

    getActivityWarningTime() {
        const examInactivityTime = this.store().loginData!.assessment_data.inactivity_waring_sec;
        return examInactivityTime > 0 ? examInactivityTime * 60 * 1000 : 5 * 60 * 1000;
    }

    triggerActivityWarning() {
        if(this.isProctoringNetworkRetryActive()){
            return
        }

        this.isActivityWarningDisplayed.set(true);
        
        Swal.close();

        Swal.fire({
            title: 'Inactivity Warning',
            text: `We noticed you've been inactive for ${formatDuration(this.getActivityWarningTime())}. Please contact the admin if you need any assistance. `,
            icon: 'warning',
            confirmButtonColor: 'rgb(3, 142, 220)',
            cancelButtonColor: 'rgb(243, 78, 78)',
            confirmButtonText: 'Ok, Thank you',
            allowOutsideClick: false,
            allowEscapeKey: false,
            heightAuto: false,
        }).then((result) => {
            if (result.value) {
                this.isActivityWarningDisplayed.set(false);
            }
        });
    }

    startInActivityTimer() {
        if (this.isActivityWarningDisplayed()) {
            return;
        }

        const currentTime = Date.now();
        const differenceInTime = currentTime - this.inactivityTimer();
        const inactivityWarningTime = this.getActivityWarningTime();

        if (!(differenceInTime >= inactivityWarningTime)) {
            return;
        }

        if (this.totalAttemptedQuestions() > 0) {
            return;
        }

        this.inactivityTimer.set(currentTime);
        this.triggerActivityWarning();
    }

    displayConectionLossModal(): void {
        this.isProctoringNetworkRetryActive.set(false)
        this.stopNetworkRetryCountdown()
        this.cleanUpProctoring()

        Swal.close();

        Swal.fire({
            title: 'Loss of Connection',
            text: 'You Have lost connection to the exam server, kindly contact admin for assisstance',
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: 'rgb(3, 142, 220)',
            cancelButtonColor: 'rgb(243, 78, 78)',
            confirmButtonText: 'Yes, Relogin',
            allowOutsideClick: false,
            allowEscapeKey: false,
            heightAuto: false,
        }).then((result) => {
            if (result.value) {
                this.logout()
            }
        });
    }

    endExam() {
        disableRestrictedActions()
        this.examEnded.set(true)

        if (this.examTimedOut()) {
            this._eventService.logEvent({ event_type: CandidateEventType.EXAM_AUTO_SUBMITTED });
        } else {
            this._eventService.logEvent({ event_type: CandidateEventType.EXAM_SUBMITTED });
        }

        if (this.examTimerSub$) {
            this.examTimerSub$.unsubscribe()
        }

        this.cleanUpProctoring()

        const hasDrawingAndWriting = this.store().sections.flatMap(s => s.items).some(item => item.item_type == this.itemTypes().DRAWING_AND_WRITING)
        const payload = hasDrawingAndWriting ? generatePayLoadForAutoSave(this, this._store) : generatePayLoadWithAllData(this, this._store)

        this.examSubmit$ = this._dataService.endExam(payload, this.examTimedOut(), hasDrawingAndWriting)
            .pipe(
                catchError((error) => {
                    if (error?.error?.code === 4000) {
                        return of({
                            end_instruction: error.error.message,
                            pass_mark: null as any
                        } as ICandidationEndExamResponse);
                    }
                    throw error;
                }),
                retryWhen((errors) =>
                    errors.pipe(
                        scan((retryCount, error) => {
                            if (retryCount >= 10) {
                                this.onFailedResolvedRetries();
                                throw error;
                            }

                            return retryCount + 1;
                        }, 0),
                        delayWhen((retryCount) => timer(Math.pow(2, retryCount) * 1000))
                    )
                )
            )
            .subscribe({
                next: (value) => {
                    this.handleEndExamOnSuccess(value)
                },
            });
    }

    onFailedResolvedRetries() {
        Swal.fire({
            title: 'Failed to submit Exam',
            text: 'We are unable to submit exam. Please contact the administrator.',
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: 'rgb(3, 142, 220)',
            cancelButtonColor: 'rgb(243, 78, 78)',
            confirmButtonText: 'Ok! Proceed to login',
            allowOutsideClick: false,
            allowEscapeKey: false,
            heightAuto: false,
        }).then((result) => {
            if (result.value) {
                this.logout()
            }
        });
    }

    confirm(): void {
        this.showUnattemptedModal.set(false)

        Swal.fire({
            title: 'Are you sure you want to end this exam?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'rgb(243, 78, 78)',
            cancelButtonColor: 'rgb(3, 142, 220)',
            confirmButtonText: 'Yes, end exam!',
            reverseButtons: true,
            heightAuto: false,
        }).then((result) => {
            if (result.value) {
                this.showSubmitExamModalOnExamEnd();
            } else if (result.dismiss === Swal.DismissReason.cancel || result.dismiss === Swal.DismissReason.backdrop) {
                this._eventService.logEvent({ event_type: CandidateEventType.EXAM_SUBMIT_CANCELLED });
            }
        });
    }

    showSubmitExamModalOnExamEnd() {
        this.examEnded.set(true)

        Swal.fire({
            title: 'Ending exam',
            text: 'Please wait while we submit your exam.',
            icon: 'info',
            showConfirmButton: false,
            showCancelButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            heightAuto: false,
        });

        setTimeout(() => this.endExam(), 2000)
    }

    logout() {
        this.examEnded.set(true);
        location.assign('/')
    }

    destroySubscription() {
        if (this.examTimerSub$ !== undefined) {
            this.examTimerSub$.unsubscribe();
        }

        if (this.examSubmit$) {
            this.examSubmit$.unsubscribe();
        }
    }

    cleanUpProctoring() {
        if (this.isAutoProctoring()) {
            this._autoProctoringService.cleanUpProctoring()
        }
        
        if (this.isLiveProctoring()) {
            this._liveProctoringService.cleanUpLiveProctoring()
        }
    }

    startProctoringNetworkMonitor() {
        if (!this.isProctoredExam()) return;

        this.proctoringLatencyMonitorSub$ = interval(30000).subscribe({
            next: async () => {
                if (this.isCheckingProctoringNetwork() || this.isProctoringNetworkRetryActive()) return;
                await this.checkProctorNetworkLatency();
            }
        });

        this.proctoringUploadMonitorSub$ = interval(60000).subscribe({
            next: async () => {
                if (this.isCheckingProctoringNetwork() || this.isProctoringNetworkRetryActive()) return;
                await this.checkProctorNetworkUploadSpeed();
            }
        });
    }

    stopProctoringNetworkMonitor() {
        this.proctoringLatencyMonitorSub$?.unsubscribe();
        this.proctoringUploadMonitorSub$?.unsubscribe();
    }

    async checkProctorNetworkLatency() {
        if (this.examEnded() || this.isProctoringNetworkRetryActive()) return;

        try {
            const latency = await this._dataService.checkLatency(5);
            if (latency.avg <= 600 && latency.jitter <= 200) {
                this.proctoringLatencyStatus.set('good');
            } else {
                this.proctoringLatencyStatus.set('poor');
            }
        } catch (e) {
            this.proctoringLatencyStatus.set('poor');
            this.triggerProctoringNetworkRetry();
        }
    }

    async checkProctorNetworkUploadSpeed() {
        if (this.examEnded() || this.isProctoringNetworkRetryActive()) return;

        this.isCheckingProctoringNetwork.set(true);

        try {
            const req = await this._dataService._checkUploadSpeed();
            const networkUploadSpeed = +req.toFixed(2);
            this.proctoringNetworkSpeed.set(networkUploadSpeed);

            if (networkUploadSpeed >= MINIMUM_REASONABLE_DOWNLOAD_SPEED_OFFSET && networkUploadSpeed < MINIMUM_REASONABLE_DOWNLOAD_SPEED) {
                this._toast.warning(`Slow Network Connection`);
            }

            if (networkUploadSpeed < MINIMUM_REASONABLE_DOWNLOAD_SPEED_OFFSET) {
                this.triggerProctoringNetworkRetry();
            }
        } catch (e) {
            this.proctoringNetworkSpeed.set(0);
            this.triggerProctoringNetworkRetry();
        } finally {
            this.isCheckingProctoringNetwork.set(false);
        }
    }

    triggerProctoringNetworkRetry() {
        if (this.isProctoringNetworkRetryActive()) return;

        this.isProctoringNetworkRetryActive.set(true);
        this.proctoringLatencyStatus.set('poor');
        this.proctoringNetworkRetryCount.set(0);
        disableRestrictedActions();
        
        if (this.isAutoProctoring()) {
            this._autoProctoringService.isNetworkRetryActive.set(true);
            this._autoProctoringService.cleanUpProctoring();
        }

        if (this.isLiveProctoring()) {
            this._liveProctoringService.cleanUpLiveProctoring();
        }

        this.startNetworkRetryCountdown(3);
    }

    async runProctoringNetworkRetryCheck() {
        if (this.examEnded()) return;

        this.isCheckingProctoringNetwork.set(true);

        try {
            const req = await this._dataService._checkUploadSpeed();
            const networkUploadSpeed = +req.toFixed(2);
            this.proctoringNetworkSpeed.set(networkUploadSpeed);

            if (networkUploadSpeed >= MINIMUM_REASONABLE_DOWNLOAD_SPEED_OFFSET) {
                // Connection restored
                this.isProctoringNetworkRetryActive.set(false);
                this.proctoringNetworkRetryCount.set(0);
                this.proctoringLatencyStatus.set('checking');
                
                if (!this.isCandidateSuspended() && this.store().appIsPinned) {
                    enableRestrictedActions();
                }
                
                if (this.isAutoProctoring() && !this._autoProctoringService.isStreaming()) {
                    this._autoProctoringService.isNetworkRetryActive.set(false);
                    const success = await this._autoProctoringService.initialize();
                    if (!success) {
                        this._toast.error('Unable to restart proctoring after network recovery. Please contact the administrator.', { duration: 150000, dismissible: true });
                    }
                }
                
                if (this.isLiveProctoring() && !this._liveProctoringService.isStreaming()) {
                    const success = await this._liveProctoringService.initialize();
                    if (!success) {
                        this._toast.error('Unable to restart live proctoring after network recovery. Please contact the administrator.', { duration: 150000, dismissible: true });
                    }
                }

                this.stopNetworkRetryCountdown();
            } else {
                // Connection still poor
                this.handleFailedRetryCheck();
            }
        } 
        catch (e) {
            // Connection still dead
            this.proctoringNetworkSpeed.set(0);
            this.handleFailedRetryCheck();
        }
        finally {
            this.isCheckingProctoringNetwork.set(false);
        }
    }

    handleFailedRetryCheck() {
        const currentCount = this.proctoringNetworkRetryCount() + 1;
        this.proctoringNetworkRetryCount.set(currentCount);
        
        if (currentCount >= 10) {
            this.stopNetworkRetryCountdown();
            this.stopProctoringNetworkMonitor();
            this.displayConectionLossModal();
            
            if (this.examTimerSub$) {
                this.examTimerSub$.unsubscribe();
            }

            disableRestrictedActions();
        } else {
            const backoff = [3, 5, 10, 15, 20];
            const delay = currentCount < backoff.length ? backoff[currentCount] : 20;
            this.startNetworkRetryCountdown(delay);
        }
    }

    startNetworkRetryCountdown(delay: number = 3) {
        if (this.proctoringNetworkRetryCountdown() !== null) return;
        
        this.proctoringNetworkRetryCountdown.set(delay);
        this.proctoringNetworkRetrySub = interval(1000).subscribe(() => {
            const current = this.proctoringNetworkRetryCountdown();
            if (current !== null) {
                if (current <= 1) {
                    this.stopNetworkRetryCountdown();
                    this.runProctoringNetworkRetryCheck();
                } else {
                    this.proctoringNetworkRetryCountdown.set(current - 1);
                }
            }
        });
    }

    stopNetworkRetryCountdown() {
        if (this.proctoringNetworkRetrySub) {
            this.proctoringNetworkRetrySub.unsubscribe();
        }
        this.proctoringNetworkRetryCountdown.set(null);
    }
}