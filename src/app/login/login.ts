import { AfterViewInit, Component, computed, effect, ElementRef, inject, linkedSignal, OnDestroy, QueryList, signal, untracked, ViewChildren } from '@angular/core';
import { Store } from '../store/store';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { DeliveryMethod, DeploymentMode, ICandidateLoginDTO, ICandidateLoginResponse, IIdentityCheck } from '../store/model/types';
import { DataService } from '../services/data/data';
import { finalize, lastValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { AuthService } from '../services/auth';
import { EventService } from '../services/event';
import { CandidateEventType } from '../store/model/events/events.enum';
import { PostLogin } from '../services/onboarding/post-login';
import { TauriService } from '../services/ipc/tauri';
import { OnboardingLivenessModal } from './onboarding-liveness-modal/onboarding-liveness-modal';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, OnboardingLivenessModal],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export default class Login implements AfterViewInit, OnDestroy {
  private _store = inject(Store)
  private _postLoginService = inject(PostLogin)
  private _dataService = inject(DataService)
  private _router = inject(Router)
  private _tauriService = inject(TauriService)
  private _toast = inject(HotToastService)
  private _authService = inject(AuthService)
  private _eventService = inject(EventService)

  @ViewChildren('codeInput') codeInputs!: QueryList<ElementRef>;

  showLogin = signal(false)
  isLoading = signal(false)
  isLoadingPreloginData = signal(false)
  deliveryMethods = signal(DeliveryMethod)
  store = computed(() => this._store.store())
  candidateId = new FormControl('', Validators.required)

  examCode = new FormControl('', [Validators.required, Validators.minLength(8)])
  codeDigits = signal(['', '', '', '', '', '', '', '']);
  hasEnteredCode = computed(() => this.codeDigits().every(digit => digit !== ''));

  // Identity Check & Onboarding State
  identityCheck = signal<IIdentityCheck | null>(null);
  showOnboardingModal = signal(false);
  isReviewPending = signal(false);
  isBlocked = signal(false);
  isServiceUnavailable = signal(false);
  isRetryingUnavailable = signal(false);
  identityMessage = signal('');
  private reviewPollTimer: any = null;

  invalidExamEnvironment = linkedSignal(() => {
    const preLoginData = this.store().preloginData;
    if (!preLoginData) return false;

    if (
      preLoginData.delivery_method == DeliveryMethod.ON_PREMISE_SECURE_BROWSER ||
      preLoginData.delivery_method == DeliveryMethod.AUTO_PROCTORING ||
      preLoginData.delivery_method == DeliveryMethod.LIVE_PROCTORING ||
      preLoginData.delivery_method == DeliveryMethod.HYBRID_PROCTORING ||
      preLoginData.delivery_method == DeliveryMethod.RECORD_AND_REVIEW
    ) {
      const isSecure = this.store().platformIsTauri
      return !isSecure
    }

    return false
  })

  examModes = DeploymentMode

  constructor() {
    effect(() => {
      const isInvalid = this.invalidExamEnvironment();
      untracked(() => {
        if (isInvalid) {
          this._eventService.logEvent({ event_type: CandidateEventType.SECURE_ENVIRONMENT_FAILED });
        }
      });
    });
  }

  async ngOnInit() {
    const isMobile = window.matchMedia('(max-width: 1024px)').matches
    this.showLogin.set(isMobile ? false : true)
  }

  ngAfterViewInit(): void {
    if (this.codeInputs && this.codeInputs.length > 0) {
      this.codeInputs.first.nativeElement.focus();
    }
  }

  ngOnDestroy(): void {
    this.clearReviewPolling();
  }

  async fetchPreloginData() {
    try {
      this.isLoadingPreloginData.set(true)

      const res = await lastValueFrom(this._dataService.fetchPreLoginDataWithCode(this.examCode.value!))

      if (
        res.delivery_method == DeliveryMethod.ON_PREMISE_SECURE_BROWSER ||
        res.delivery_method == DeliveryMethod.AUTO_PROCTORING ||
        res.delivery_method == DeliveryMethod.LIVE_PROCTORING ||
        res.delivery_method == DeliveryMethod.HYBRID_PROCTORING ||
        res.delivery_method == DeliveryMethod.RECORD_AND_REVIEW
      ) {
        const isSecure = this.store().platformIsTauri

        if (!isSecure) {
          this._toast.error('This exam can only run on a secure browser')
          return
        }
      }

      this._authService.setPreLoginData(res);

    } catch (error) {
      const err = error as HttpErrorResponse
      this._toast.error(err.error?.error ?? 'Sorry! Unable to complete task')
      this._router.navigate(['/'])
    } finally {
      this.isLoadingPreloginData.set(false)
    }
  }

  async login() {
    const control = this.candidateId;
    if (control.hasError('serverError')) {
      const errors = { ...control.errors };
      delete errors['serverError'];
      control.setErrors(Object.keys(errors).length ? errors : null);
    }

    if (this.candidateId.invalid) {
      this.candidateId.markAsTouched()
      return
    }

    const preLoginData = this.store().preloginData;
    if (!preLoginData) {
      this._router.navigate(['/usage-guide'])
      return
    }

    this.isLoading.set(true)

    const payload: Omit<ICandidateLoginDTO, 'exam_id'> = {
      assessment_id: preLoginData.id,
      login_value: this.candidateId.value!,
      unique_id: preLoginData.unique_id
    }

    this._eventService.logEvent({ event_type: CandidateEventType.LOGIN_ATTEMPTED });

    this._dataService.login(payload)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
          this.isRetryingUnavailable.set(false);
        })
      )
      .subscribe({
        next: (res) => {
          this.clearReviewPolling();
          this.isReviewPending.set(false);
          this._toast.success('Login successful');
          this.onSuccessfullLogin(res);
        },
        error: (err: HttpErrorResponse) => {
          this._eventService.logEvent({ event_type: CandidateEventType.LOGIN_FAILED });

          // Intercept Identity Check responses
          const identityCheck = err?.error?.identity_check;
          if (identityCheck) {
            if (err.status === 428 && identityCheck.status === 'NEED_ONBOARDING') {
              this.identityCheck.set(identityCheck);
              this.showOnboardingModal.set(true);
              return;
            }

            if (err.status === 428 && identityCheck.status === 'PENDING_REVIEW') {
              this.isReviewPending.set(true);
              this.identityMessage.set(identityCheck.message || 'A proctor is confirming your identity.');
              this.startReviewPolling();
              return;
            }

            if (err.status === 403 && identityCheck.status === 'BLOCKED') {
              this.isBlocked.set(true);
              this.identityMessage.set(identityCheck.message || 'You are blocked from taking this exam.');
              return;
            }

            if (err.status === 503 && identityCheck.status === 'UNAVAILABLE') {
              this.isServiceUnavailable.set(true);
              this.identityMessage.set(identityCheck.message || 'Verification service is temporarily unavailable. Please try again shortly.');
              return;
            }
          }

          const control = this.candidateId;
          const msg = err.error?.error ?? err.error?.message ?? 'Sorry, unable to complete login';
          control.setErrors({ serverError: { msg } });
          control.markAsTouched();
          this._toast.error(msg);
        }
      })
  }

  startReviewPolling() {
    this.clearReviewPolling();
    this.reviewPollTimer = setTimeout(() => {
      if (this.isReviewPending()) {
        this.login();
      }
    }, 6000);
  }

  clearReviewPolling() {
    if (this.reviewPollTimer) {
      clearTimeout(this.reviewPollTimer);
      this.reviewPollTimer = null;
    }
  }

  onOnboardingCompleted() {
    this.showOnboardingModal.set(false);
    this.login();
  }

  onOnboardingCancelled() {
    this.showOnboardingModal.set(false);
  }

  dismissBlockedModal() {
    this.isBlocked.set(false);
  }

  dismissUnavailableModal() {
    this.isRetryingUnavailable.set(false);
    this.isServiceUnavailable.set(false);
  }

  retryUnavailableLogin() {
    this.isRetryingUnavailable.set(true);
    this.isServiceUnavailable.set(false);
    this.login();
  }

  onSuccessfullLogin(value: ICandidateLoginResponse) {
    this._postLoginService.formatLoginDataToStore(value).then(async () => {
      this._eventService.syncSequence(value.last_sequence);
      this._eventService.logEvent({ event_type: CandidateEventType.LOGIN_SUCCEEDED });
      this._eventService.initIntegrityEvents();
      
      await this._dataService.downloadParticipantPassport()

      if (this.store().preloginData?.delivery_method == this.deliveryMethods().ON_PREMISE_SECURE_BROWSER) {
        this._tauriService.sendExamStarted()
      }

      if ([DeliveryMethod.AUTO_PROCTORING, DeliveryMethod.LIVE_PROCTORING, DeliveryMethod.HYBRID_PROCTORING].includes(this.store().preloginData?.delivery_method as DeliveryMethod)) {
        this._router.navigate(['proctored/onboarding'])
        return
      }

      this._router.navigate(['overview'])
    })
  }

  onCodeInput(event: Event, index: number) {
    const target = event.target as HTMLInputElement;
    let value = target.value;

    // Filter to only allow alphanumeric
    value = value.replace(/[^a-zA-Z0-9]/g, '');
    target.value = value;

    const digits = [...this.codeDigits()];
    digits[index] = value;
    this.codeDigits.set(digits);

    // Sync with the form control
    this.examCode.setValue(digits.join(''));

    if (value && index < 7) {
      this.codeInputs.get(index + 1)?.nativeElement.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const digits = [...this.codeDigits()];

    if (event.key === 'Backspace') {
      if (digits[index]) {
        digits[index] = '';
        this.codeDigits.set(digits);
        this.examCode.setValue(digits.join(''));
      } else if (index > 0) {
        digits[index - 1] = '';
        this.codeDigits.set(digits);
        this.examCode.setValue(digits.join(''));
        this.codeInputs.get(index - 1)?.nativeElement.focus();
      }
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      this.codeInputs.get(index - 1)?.nativeElement.focus();
    }

    if (event.key === 'ArrowRight' && index < 7) {
      this.codeInputs.get(index + 1)?.nativeElement.focus();
    }
  }

  onPaste(event: ClipboardEvent, index: number) {
    event.preventDefault();

    const pastedText = event.clipboardData?.getData('text') ?? '';
    const cleanedText = pastedText.replace(/[^a-zA-Z0-9]/g, '');
    const digits = cleanedText.split('');

    const current = [...this.codeDigits()];
    digits.forEach((d, i) => {
      if (index + i < 8) {
        current[index + i] = d;
      } 
    });

    this.codeDigits.set(current);
    this.examCode.setValue(current.join(''));

    // Focus the next empty input or the last input
    const nextIndex = Math.min(index + digits.length, 7);
    if (this.codeInputs && this.codeInputs.length > nextIndex) {
      this.codeInputs.get(nextIndex)?.nativeElement.focus();
    }
  }

  closeBrowser() {
    this._tauriService.closeApp()
  }
}
