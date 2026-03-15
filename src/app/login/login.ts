import { Component, computed, inject, signal } from '@angular/core';
import { Store } from '../store/store';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { DeliveryMethod, ICandidateLoginDTO, ICandidateLoginResponse } from '../store/model/types';
import { DataService } from '../services/data';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TauriService } from '../services/tauri';
import { HotToastService } from '@ngxpert/hot-toast';
import { PostLogin } from '../services/post-login';

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
  private _tauriService = inject(TauriService)
  private _toast = inject(HotToastService)

  showLogin = signal(false)
  isLoading = signal(false)
  deliveryMethods = signal(DeliveryMethod)
  candidateId = new FormControl('', Validators.required)
  store = computed(() => this._store.store())

  ngOnInit() {
    const isMobile = window.matchMedia('(max-width: 1024px)').matches
    this.showLogin.set(isMobile ? false : true)
  }

  login() {
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
      this._router.navigate(['overview'])
      return
    }

    const payload: ICandidateLoginDTO = { assessment_id: preLoginData.id, login_value: this.candidateId.value, unique_id: preLoginData.unique_id} as any;

    this.isLoading.set(true)
    this._dataService.login(payload)
    .pipe(
      this._toast.observe({ loading: 'Please wait...', success: 'Login successfull', error: 'Error!'}),
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

      this._router.navigate(['overview'])
    })
  }
}
