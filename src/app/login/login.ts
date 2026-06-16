import { AfterViewInit, Component, computed, ElementRef, inject, linkedSignal, QueryList, signal, ViewChildren } from '@angular/core';
import { Store } from '../store/store';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { DeliveryMethod, DeploymentMode, ICandidateLoginDTO, ICandidateLoginResponse } from '../store/model/types';
import { DataService } from '../services/data';
import { finalize, lastValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TauriService } from '../services/tauri';
import { HotToastService } from '@ngxpert/hot-toast';
import { PostLogin } from '../services/post-login';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export default class Login implements AfterViewInit {
  private _store = inject(Store)
  private _postLoginService = inject(PostLogin)
  private _dataService = inject(DataService)
  private _router = inject(Router)
  private _tauriService = inject(TauriService)
  private _toast = inject(HotToastService)
  private _authService = inject(AuthService)

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

  invalidExamEnvironment = linkedSignal(() => {
    const preLoginData = this.store().preloginData;
    if (!preLoginData) return false;

    if (preLoginData.delivery_method == DeliveryMethod.ON_PREMISE_SECURE_BROWSER || preLoginData.delivery_method == DeliveryMethod.AUTO_PROCTORING || preLoginData.delivery_method == DeliveryMethod.LIVE_PROCTORING) {
      const isSecure = this.store().platformIsTauri
      return !isSecure
    }

    return false
  })

  examModes = DeploymentMode

  async ngOnInit() {
    const isMobile = window.matchMedia('(max-width: 1024px)').matches
    this.showLogin.set(isMobile ? false : true)
  }

  ngAfterViewInit(): void {
    if (this.codeInputs && this.codeInputs.length > 0) {
      this.codeInputs.first.nativeElement.focus();
    }
  }

  async fetchPreloginData() {
    try {
      this.isLoadingPreloginData.set(true)

      const res = await lastValueFrom(this._dataService.fetchPreLoginDataWithCode(this.examCode.value!))

      if (res.delivery_method == DeliveryMethod.ON_PREMISE_SECURE_BROWSER || res.delivery_method == DeliveryMethod.AUTO_PROCTORING || res.delivery_method == DeliveryMethod.LIVE_PROCTORING) {
        const isSecure = this.store().platformIsTauri

        if (!isSecure) {
          this._toast.error('This exam can only run on a secure browser')
          return
        }
      }

      this._authService.setPreLoginData(res);

      // if (res.delivery_method == DeliveryMethod.AUTO_PROCTORING || res.delivery_method == DeliveryMethod.LIVE_PROCTORING) {
      //   this._router.navigate(['proctored'], { queryParams: { examCode: res.id } })
      //   return
      // }

    } catch (error) {
      const err = error as HttpErrorResponse
      this._toast.error(err.error.error ?? 'Sorry! Unable to complete task')
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

    this._dataService.login(payload)
      .pipe(
        this._toast.observe({ loading: 'Please wait...', success: 'Login successfull', error: 'Error!' }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (res) => this.onSuccessfullLogin(res),
        error: (err: HttpErrorResponse) => {
          const control = this.candidateId

          control.setErrors({ serverError: { msg: err.error.error ?? 'Sorry Unable to complete login' } });
          control.markAsTouched();
        }
      })
  }

  onSuccessfullLogin(value: ICandidateLoginResponse) {
    this._postLoginService.formatLoginDataToStore(value).then(async () => {
      await this._dataService.downloadParticipantPassport()

      if (this.store().preloginData?.delivery_method == this.deliveryMethods().ON_PREMISE_SECURE_BROWSER) {
        this._tauriService.sendExamStarted()
      }

      if (this.store().preloginData?.delivery_method == DeliveryMethod.AUTO_PROCTORING || this.store().preloginData?.delivery_method == DeliveryMethod.LIVE_PROCTORING) {
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
