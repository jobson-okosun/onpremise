import { Component, computed, effect, inject, linkedSignal, signal, untracked } from '@angular/core';
import Login from '../login/login';
import { Store } from '../store/store';
import { Router, RouterLink } from '@angular/router';
import { DeliveryMethod, DeploymentMode, IAssessmentPreLoginData } from '../store/model/types';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-welcome',
  imports: [Login, RouterLink],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export default class Welcome {
  private _store = inject(Store)
  private _router = inject(Router)
  private _authService = inject(AuthService)

  examModes = DeploymentMode
  isLoading = signal(false)
  store = computed(() => this._store.store())
  selectedExam = signal<IAssessmentPreLoginData | null>(null)

  invalidExamEnvironment = linkedSignal(() => {
    const preLoginData = this.store().preloginData;
    if (!preLoginData) return false;

    if (preLoginData.delivery_method == DeliveryMethod.ON_PREMISE_SECURE_BROWSER || preLoginData.delivery_method == DeliveryMethod.AUTO_PROCTORING || preLoginData.delivery_method == DeliveryMethod.LIVE_PROCTORING) {
      const isSecure = this.store().platformIsTauri
      return !isSecure
    }

    return false
  })

  constructor() {
    effect(() => {
      untracked(() => {
        if (this.store().examSettings?.prelogin_datas.length == 1 && this.store().examSettings?.exam_mode == this.examModes.Offline) {
          this.selectExam(this.store().examSettings?.prelogin_datas[0]!)
        } else if (this.store().examSettings?.exam_mode == this.examModes.Online) {
          this.resolveRoute()
        }
      })
    })

    effect(() => {
      const preLoginData = this.store().preloginData;
      if (!preLoginData) {
        return
      }

      if (preLoginData.delivery_method == DeliveryMethod.AUTO_PROCTORING || preLoginData.delivery_method == DeliveryMethod.LIVE_PROCTORING) {
        this._router.navigate(['proctored'])
        return
      }
    })
  }

  selectExam(item: IAssessmentPreLoginData) {
    localStorage.clear()
    this._authService.setPreLoginData(item);
    this.selectedExam.set(item)
    this.resolveRoute()
  }

  resolveRoute() {
    const isMobile = window.matchMedia('(max-width: 1024px)').matches

    if (!isMobile) {
      return
    }

    if (this.examModes.Offline && this.store().examSettings!.exam_mode.length <= 1) {
      this._router.navigate(['login'])
      return
    }

    if (this.examModes.Online) {
      this._router.navigate(['login'])
      return
    }
  }
}
