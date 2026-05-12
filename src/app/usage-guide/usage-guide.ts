import { Component, computed, inject, signal } from '@angular/core';
import { SLIDES } from '../utils/constants';
import { DataService } from '../services/data';
import { finalize } from 'rxjs';
import { DeliveryMethod, IAssessmentPreLoginData, Slide } from '../store/model/types';
import { HttpErrorResponse } from '@angular/common/http';
import { HotToastService } from '@ngxpert/hot-toast';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';
import { Store } from '../store/store';
import { NgClass } from '@angular/common';

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

  store = computed(() => this._store.store())
  isLoading = signal(false)
  currentIndex = signal(0);
  slides: Slide[] = SLIDES

  ngOnInit() {
    this.startAutoSlide()
  }

  fetchPreLoginData() {
    this.isLoading.set(true);

    this._dataService.fetchPreLoginData()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: async (value) => this.successfullPrelogin(value),
        error: (err: HttpErrorResponse) => {
          this._toast.error(err.error.error ?? 'Sorry! Unable to complete task')
        },
      });
  }

  async successfullPrelogin(res: IAssessmentPreLoginData) {
    if (res.delivery_method == DeliveryMethod.ON_PREMISE_SECURE_BROWSER) {
      const isSecure = this.store().platformIsTauri

      if (!isSecure) {
        this._toast.error('This exam can only run on secure browser')
        return
      }
    }

    this._authService.setPreLoginData(res);
    
    if (res.delivery_method == DeliveryMethod.AUTO_PROCTORING || res.delivery_method == DeliveryMethod.LIVE_PROCTORING) {
      this._router.navigate(['proctored'])
      return;
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
}
