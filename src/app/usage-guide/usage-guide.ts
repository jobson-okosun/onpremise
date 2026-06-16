import { Component, computed, inject, signal } from '@angular/core';
import { SLIDES } from '../utils/constants';
import { DataService } from '../services/data';
import { finalize } from 'rxjs';
import { DeliveryMethod, DeploymentMode, IAssessmentPreLoginData, Slide } from '../store/model/types';
import { HttpErrorResponse } from '@angular/common/http';
import { HotToastService } from '@ngxpert/hot-toast';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';
import { Store } from '../store/store';
import { NgClass } from '@angular/common';
import { TauriService } from '../services/tauri';

@Component({
  selector: 'app-usage-guide',
  imports: [NgClass],
  templateUrl: './usage-guide.html',
  styleUrl: './usage-guide.css',
})
export default class UsageGuide {
  private _dataService = inject(DataService)
  private _toast = inject(HotToastService)
  private _authService = inject(AuthService)
  private _router = inject(Router)
  private _store = inject(Store)
  private _tauriService = inject(TauriService)

  store = computed(() => this._store.store())
  isLoading = signal(false)
  isLoadingExamSettings = signal(false)
  currentIndex = signal(0);
  slides: Slide[] = SLIDES

  ngOnInit() {
    // localStorage.clear()
    this.startAutoSlide()
  }

  fetchExamSettingsData() {
    this.isLoadingExamSettings.set(true)

    this._dataService.fetchExamSettingsData()
      .pipe(finalize(() => this.isLoadingExamSettings.set(false)))
      .subscribe({
        next: (res) => {
          if (res.exam_mode == DeploymentMode.Online) {
            this._store.updateStore({ examSettings: res })
            this.gotoWelcomePage()
            return
          }

          if (res.exam_mode == DeploymentMode.Offline) {
            if (res.prelogin_datas.length) {
              this._store.updateStore({ examSettings: res })
              this.gotoWelcomePage()
            } else {
              this._toast.error('No exam(s) has been started')
              return
            }
          }
        }
      })
  }

  private gotoWelcomePage() {
    if (!this.store().examSettings) {
      return
    }

    this._router.navigate(['welcome']);
  }

  nextSlide(): void {
    this.currentIndex.set((this.currentIndex() + 1) % this.slides.length);
  }

  prevSlide(): void {
    this.currentIndex.set((this.currentIndex() - 1 + this.slides.length) % this.slides.length);
  }

  startAutoSlide(): void {
    setInterval(() => this.nextSlide(), 8000);
  }

  closeBrowser() {
    this._tauriService.closeApp()
  }
}
