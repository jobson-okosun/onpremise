import { Component, computed, inject, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { SLIDES } from '../utils/constants';
import { DataService } from '../services/data';
import { finalize } from 'rxjs';
import { DeploymentMode, Slide } from '../store/model/types';
import { HotToastService } from '@ngxpert/hot-toast';
import { Router } from '@angular/router';
import { Store } from '../store/store';
import { NgClass } from '@angular/common';
import { TauriService } from '../services/tauri';

@Component({
  selector: 'app-usage-guide',
  imports: [NgClass, DialogModule],
  templateUrl: './usage-guide.html',
  styleUrl: './usage-guide.css',
})
export default class UsageGuide {
  private _dataService = inject(DataService)
  private _toast = inject(HotToastService)
  private _router = inject(Router)
  private _store = inject(Store)
  private _tauriService = inject(TauriService)

  store = computed(() => this._store.store())
  isLoading = signal(false)
  isLoadingExamSettings = signal(false)
  currentIndex = signal(0);
  slides: Slide[] = SLIDES

  ngOnInit() {
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

  showCloseModal = signal(false);

  closeBrowser() {
    this.showCloseModal.set(true);
  }

  cancelCloseApp() {
    this.showCloseModal.set(false);
  }

  doCloseBrowser() {
    this._tauriService.closeApp();
  }
}
