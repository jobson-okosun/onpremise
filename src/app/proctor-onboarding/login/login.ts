import { Component, computed, effect, inject, signal } from '@angular/core';
import { Store } from '../../store/store';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostLogin } from '../../services/post-login';
import { DataService } from '../../services/data';
import { DeliveryMethod, ICandidateLoginDTO, ICandidateLoginResponse } from '../../store/model/types';
import { HotToastService } from '@ngxpert/hot-toast';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export default class Login {
  private _store = inject(Store)
  private _postLoginService = inject(PostLogin)
  private _dataService = inject(DataService)
  private _router = inject(Router)
  private _toast = inject(HotToastService)

  deliveryMethods = signal(DeliveryMethod)

  patchForm = effect(() => {
    const params = this._store.store().currentRoute?.queryParams || {}

    if (params['examCode']) this.examId.setValue(params['examCode'])
  })

  showLogin = signal(false)
  isLoading = signal(false)
  userId = new FormControl('', Validators.required)
  examId = new FormControl('', Validators.required)
  store = computed(() => this._store.store())

  ngOnInit() {
    const isMobile = window.matchMedia('(max-width: 1024px)').matches
    this.showLogin.set(isMobile ? false : true)
  }

  login() {
    if (this.userId.hasError('serverError')) {
      const userIdErrors = { ...this.userId.errors };
      delete userIdErrors['serverError'];
      this.userId.setErrors(Object.keys(userIdErrors).length ? userIdErrors : null);
    }

    if (this.userId.invalid || this.examId.invalid) {
      this.userId.markAsTouched()
      return
    }

    const preLoginData = this.store().preloginData;
    if (!preLoginData) {
      this._router.navigate(['/usage-guide'])
      return
    }

    const payload: ICandidateLoginDTO = {
      assessment_id: preLoginData.id,
      login_value: this.userId.value!,
      exam_id: this.examId.value!,
      unique_id: preLoginData.unique_id,
    }

    this.isLoading.set(true)
    this._dataService.login(payload)
      .pipe(
        this._toast.observe({ loading: 'Please wait...', success: 'Login successfull', error: 'Error!' }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (res) => this.onSuccessfullLogin(res),
        error: (err: HttpErrorResponse) => {
          const control = this.userId

          control.setErrors({ serverError: { msg: err.error.error ?? 'Sorry Unable to complete login' } });
          control.markAsTouched();
        }
      })
  }

  onSuccessfullLogin(value: ICandidateLoginResponse) {
    this._postLoginService.formatLoginDataToStore(value).then(async () => {
      await this._dataService.downloadParticipantPassport()

      this._router.navigate(['proctored/onboarding'])
    })
  }
}
