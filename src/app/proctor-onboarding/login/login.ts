import { Component, computed, effect, inject, signal } from '@angular/core';
import { Store } from '../../store/store';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export default class Login {
  private _store = inject(Store)

  patchForm = effect(() => {
    const params = this._store.store().currentRoute?.queryParams || {}

    if (params['userid']) this.userId.setValue(params['userid'])
    if (params['examid']) this.examId.setValue(params['examid'])
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
    if (this.userId.invalid || this.examId.invalid) {
      this.userId.markAsTouched()
      this.examId.markAsTouched()
      return
    }

  }
}
