import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { ProgressIndicator } from '../progress-indicator/progress-indicator';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Store } from '../../store/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-onboarding-layout',
  templateUrl: './onboarding-layout.html',
  styleUrl: './onboarding-layout.css',
  imports: [ProgressIndicator, RouterOutlet],
})
export class OnboardingLayout {
  private _store = inject(Store)
  private _router = inject(Router)

  year = new Date().getFullYear();
  progressIndicator = viewChild(ProgressIndicator);

  private currentUrl = toSignal(
    this._router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(event => event.urlAfterRedirects)
    ),
    { initialValue: this._router.url }
  );

  store = computed(() => this._store.store())
  isStartExamPage = computed(() => this.currentUrl().includes('/start-exam'))
  
  isCurrentStepCompleted = computed(() => {
    return this.progressIndicator()?.isCurrentStepCompleted() ?? true;
  });

  goToRoute(arg: 'next' | 'back') {
    this.progressIndicator()?.moveStep(arg)
  }
}
