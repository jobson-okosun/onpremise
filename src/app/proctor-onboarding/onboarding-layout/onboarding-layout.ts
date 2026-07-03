import { Component, computed, inject, signal, viewChild, ElementRef, effect } from '@angular/core';
import { ProgressIndicator } from '../progress-indicator/progress-indicator';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Store } from '../../store/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { EventService } from '../../services/event';
import { CandidateEventType } from '../../store/model/events/events.enum';

@Component({
  selector: 'app-onboarding-layout',
  templateUrl: './onboarding-layout.html',
  styleUrl: './onboarding-layout.css',
  imports: [ProgressIndicator, RouterOutlet],
})
export class OnboardingLayout {
  private _store = inject(Store)
  private _router = inject(Router)
  private _eventService = inject(EventService)

  year = new Date().getFullYear();
  progressIndicator = viewChild(ProgressIndicator);
  scrollContainer = viewChild<ElementRef>('scrollContainer');

  constructor() {
    effect(() => {
      this.currentUrl();
      
      const element = this.scrollContainer()?.nativeElement;
      if (element) {
        element.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  ngOnInit() {
    this._eventService.logEvent({ event_type: CandidateEventType.ONBOARDING_STARTED });
  }

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
