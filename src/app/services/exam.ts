import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { Store } from "../store/store";
import { BlockType, ICandidateAutoSaveResponse, ICandidateItem, ICandidateLoginResponse, ICandidateSectionQuestions, ICandidationEndExamResponse, ItemType, StoreSection } from "../store/model/types";
import { StoreDTO } from "../store/model/store";
import { delayWhen, finalize, interval, retryWhen, scan, Subscription, take, timer } from "rxjs";
import { DataService } from "./data";
import { disableRestrictedActions, enableRestrictedActions, formatDuration, generatePayLoadForAutoSave, generatePayLoadWithAllData } from "../utils/helper";
import { HotToastService } from "@ngxpert/hot-toast";
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { TauriService } from "./tauri";
import { ProctorService } from "./proctor";

@Injectable({ providedIn: 'root' })
export class ExamService {
    private _dataService = inject(DataService)
    private _store = inject(Store)
    private _toast = inject(HotToastService)
    private _router = inject(Router)
    private _tauriService = inject(TauriService)
    private _proctorService = inject(ProctorService)

    examTimerSub$: Subscription;
    examSubmit$: Subscription;
    itemTypes = signal(ItemType);
    examDuration = signal(0)
    canEndExam = signal(false);
    showUnattemptedModal = signal(false)
    cummulativeExamDuration = signal(0)
    autoSaveInterval = signal(0)
    examEnded = signal(false)
    lastAutoSaveTime = signal(new Date())
    isAutosaveSaved = signal(false)
    lastAutoSaveTimeSec = signal(0);
    isAutoSaving = signal(false);
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
    isProctoredExam = computed(() => {
        // this.store().preloginData?.delivery_method === DeliveryMethod.AUTO_PROCTORING
        return false
    })

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

    getSectionItems(section: ICandidateSectionQuestions): ICandidateItem[] {
        const items = section.question_blocks.flatMap(block => {

            if (block.block_type === BlockType.SINGLE_QUESTIONS) {
                return block.items.map(item => ({
                    ...item,
                    block_id: block.id,
                    isPassageItem: false,
                    roughWorkResponse: []
                }));
            }

            if (block.block_type === BlockType.PASSAGES) {
                return block.passages.flatMap(passage =>
                    passage.items.map(item => ({
                        ...item,
                        block_id: block.id,
                        passage_stimulus: passage.stimulus,
                        isPassageItem: true,
                        roughWorkResponse: []
                    }))
                );
            }

            return [];
        });

        return items
    }

    getCummulativeExamDuration(data: ICandidateLoginResponse): number {
        let duration = 0;

        const examTime = data?.assessment_data.duration_minutes;
        const sections = data?.sections_questions


        if (sections!.length > 1) {
            const hasAtleastOneSectionWithDuration = sections!.some(section => section.section_settings.duration_in_minutes > 0)
            const cummulativeDuration = sections!.reduce((sum, section) => sum + section.section_settings.duration_in_minutes, 0)

            duration = (hasAtleastOneSectionWithDuration ? cummulativeDuration : examTime) as number

        } else {
            const firstSectionDuration = sections![0].section_settings.duration_in_minutes;
            duration = (firstSectionDuration > 0 ? firstSectionDuration : examTime) as number;
        }

        // duration = duration * 60
        this.cummulativeExamDuration.set(duration)
        return duration;
    }

    formatLoginDataToStore(data: ICandidateLoginResponse): Promise<void> {
        return new Promise((resolve) => {

            const sections = data.sections_questions.map(s => {
                const items = this.getSectionItems(s)
                
                items.forEach(item => {
                    if(item.item_type == ItemType.MCQ || item.item_type == ItemType.TRUE_FALSE || item.item_type == ItemType.YES_NO) {
                        item.responses[0] = item.responses[0] ?? ''
                    }

                    if(
                        item.item_type == ItemType.CLOZE_DROPDOWN ||
                        item.item_type == ItemType.CLOZE_RADIO ||
                        item.item_type == ItemType.CLOZE_TEXT ||
                        item.item_type == ItemType.CLOZE_TEXT_IMAGE ||
                        item.item_type == ItemType.CLOZE_DROPDOWN_IMAGE
                    ) {
                        item.possible_responses?.forEach((option, optionIndex) => {
                            item.responses[optionIndex] = item.responses[optionIndex] ?? ''
                        })
                    }
                    
                })

                const section: StoreSection = { id: s.id, name: s.name, items }
                return section
            })

            const currentSection = sections[0]
            const currentQuestion = currentSection.items[0]
            const currentQuestionIndex = 0
            const examDuration = this.getCummulativeExamDuration(data)

            data.sections_questions = data.sections_questions.map(s => {
                const { question_blocks, ...rest } = s
                return { ...rest } as any
            })

            let store = new StoreDTO()
            const update = {
                ...store,
                ...this.store(),
                loginData: data,
                sections,
                currentSection,
                currentQuestion,
                currentQuestionIndex,
                examDuration
            }

            this._store.updateStore(update)
            resolve()
        })
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

        if (~~autoSaveTimeDiff == 120) {
            if (this.connectionAlertShown()) {
                return
            }

            this._toast.error('You have lost connection! Contact admin immediately')
            this.connectionAlertShown.set(true)
        }

        if (autoSaveTimeDiff >= 300) {
            if (this.examTimerSub$) {
                this.examTimerSub$.unsubscribe();
                disableRestrictedActions();
                this.displayConectionLossModal();
            }
        }

        if (this.examDuration() <= 0) {
            if (this.examEnded()) {
                return;
            }

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
        const payload = generatePayLoadForAutoSave(this, this._store)
        const syncStart = Date.now();
        this.isAutoSaving.set(true)

        this._dataService.autoSave(payload)
            .pipe(finalize(() => this.isAutoSaving.set(false)))
            .subscribe({
                next: (res) => this.autosaveSuccess(res as any, syncStart),
                error: () => {
                    this.autosaveFailed()
                }
            })
    }

    autosaveFailed() {
        this.isAutosaveSaved.set(false)
        this.connectionStatus.set(false)
    }

    autosaveSuccess(autosaveData: ICandidateAutoSaveResponse, syncTime: any) {
        this.isAutosaveSaved.set(autosaveData.auto_saved)
        this.lastAutoSaveTime.set(new Date())
        this.itemsLastSync.set(syncTime)
        this.connectionStatus.set(true)

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
                this._tauriService.KillBrowserFromAutoSave()
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

        if (this.examTimerSub$) {
            this.examTimerSub$.unsubscribe()
        }

        if(this.isProctoredExam()) {
            this._proctorService.stopProctoring()
        }

        const hasDrawingAndWriting = this.store().sections.flatMap(s => s.items).some(item => item.item_type == this.itemTypes().DRAWING_AND_WRITING)
        const payload = hasDrawingAndWriting ? generatePayLoadForAutoSave(this, this._store) : generatePayLoadWithAllData(this, this._store)

        this.examSubmit$ = this._dataService.endExam(payload, this.examTimedOut(), hasDrawingAndWriting)
            .pipe(
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
        location.assign('/usage-guide')
    }

    destroySubscription() {
        if (this.examTimerSub$ !== undefined) {
            this.examTimerSub$.unsubscribe();
        }

        if (this.examSubmit$) {
            this.examSubmit$.unsubscribe();
        }
    }
}