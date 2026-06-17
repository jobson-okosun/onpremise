import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { Store } from '../../store/store';
import { OnboardingService } from '../../services/system-check/onboarding';
import { ALL_ONBOARDING_STEPS, DEFAULT_ONBOARDING_SETTINGS, OnboardingSettings, OnboardingStep, OnboardingStepId } from '../../store/model/types';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-progress-indicator',
  imports: [DialogModule],
  templateUrl: './progress-indicator.html',
  styleUrl: './progress-indicator.css',
})

export class ProgressIndicator {
  private _router = inject(Router);
  private _store = inject(Store);
  private _onboardingService = inject(OnboardingService);

  private _settings = signal<OnboardingSettings>(DEFAULT_ONBOARDING_SETTINGS);
  allowNavigation = signal(!environment.production);

  steps = computed<OnboardingStep[]>(() => {
    const settings = this._settings();

    const steps = ALL_ONBOARDING_STEPS.filter(step => {
      switch (step.id) {
        case 'system-check':
          return settings.requireSystemCheck;
        case 'device-check-audio':
          return settings.requireAudioCheck;
        case 'device-check-video':
          return settings.requireVideoCheck;
        case 'facial':
          return settings.requireFacialAuth;
        case 'guidelines':
          return settings.showGuidelines;
        case 'rules':
          return settings.showRules;
        default:
          return true;
      }
    })

    return steps;

  });

  currentStep = signal<number>(0);
  maxStepReached = signal<number>(0);

  isCurrentStepCompleted = computed(() => {
    const steps = this.steps();
    const currentIndex = this.currentStep();

    if (currentIndex < 0 || currentIndex >= steps.length) {
      return false;
    }

    const currentStepConfig = steps[currentIndex];

    if (this.allowNavigation()) {
      return true;
    }

    if (!currentStepConfig.requiresCompletion) {
      return true;
    }

    return this._onboardingService.isStepCompleted(currentStepConfig.id);
  });

  reachableStepCount = computed(() => {
    const maxVisited = this.maxStepReached();
    const current = this.currentStep();
    const isCompleted = this.isCurrentStepCompleted();

    return Math.max(maxVisited, isCompleted ? current + 1 : current);
  });

  isStepCompleted(stepId: OnboardingStepId): boolean {
    return this._onboardingService.isStepCompleted(stepId);
  }

  getCurrentStepId(): OnboardingStepId | null {
    const steps = this.steps();
    const currentIndex = this.currentStep();
    return steps[currentIndex]?.id ?? null;
  }

  moveStep(arg: 'next' | 'back' | number) {
    const currentIndex = this.currentStep();
    const steps = this.steps();

    // Determine target index
    const newStep =
      arg === 'next' ? currentIndex + 1 :
        arg === 'back' ? currentIndex - 1 :
          typeof arg === 'number' ? arg :
            currentIndex;

    // Bounds check
    if (newStep < 0 || newStep >= steps.length) {
      return;
    }

    // Restriction check
    if (newStep > this.reachableStepCount()) {
      return;
    }

    // Additional check for 'next' specifically (though covered by reachableStepCount)
    if (arg === 'next' && !this.isCurrentStepCompleted()) {
      return;
    }

    // Update history
    if (newStep > this.maxStepReached()) {
      this.maxStepReached.set(newStep);
    }


    // Navigate
    this._router.navigate([steps[newStep].route]);
    this.currentStep.set(newStep);
  }

  showRestartModal = signal(false);

  confirmRestart(event: Event) {
    event.preventDefault();
    this.showRestartModal.set(true);
  }

  cancelRestart() {
    this.showRestartModal.set(false);
  }

  doRestart() {
    location.assign('/');
  }
}
