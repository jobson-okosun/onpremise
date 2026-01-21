import { Component, computed, effect, inject, signal } from '@angular/core';
import { Store } from '../../store/store';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { DataService } from '../../services/data';
import { ExamService } from '../../services/exam';
import { HotToastService } from '@ngxpert/hot-toast';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export default class Login {
  private _store = inject(Store)
  private _exam = inject(ExamService)
  private _dataService = inject(DataService)
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  private _toast = inject(HotToastService)

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
