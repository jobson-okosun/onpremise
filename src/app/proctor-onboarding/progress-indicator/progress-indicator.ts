import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '../../store/store';
import { OnboardingService } from '../../services/onboarding';
import { 
  ALL_ONBOARDING_STEPS, 
  DEFAULT_ONBOARDING_SETTINGS, 
  OnboardingSettings, 
  OnboardingStep,
  OnboardingStepId,
} from '../../store/model/types';

@Component({
  selector: 'app-progress-indicator',
  imports: [],
  templateUrl: './progress-indicator.html',
  styleUrl: './progress-indicator.css',
})

export class ProgressIndicator implements OnInit {
  private _router = inject(Router);
  private _store = inject(Store);
  private _onboardingService = inject(OnboardingService);

  private _settings = signal<OnboardingSettings>(DEFAULT_ONBOARDING_SETTINGS);

  steps = computed<OnboardingStep[]>(() => {
    const settings = this._settings();
    
    return ALL_ONBOARDING_STEPS.filter(step => {
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
    });
  });

  currentStep = signal<number>(0);
  maxStepReached = signal<number>(0);

  // Computed: check if current step is completed (for enabling/disabling next button)
  isCurrentStepCompleted = computed(() => {
    const steps = this.steps();
    const currentIndex = this.currentStep();
    
    if (currentIndex < 0 || currentIndex >= steps.length) {
      return false;
    }
    
    const currentStepConfig = steps[currentIndex];
    
    // If step doesn't require completion, it's always "completed"
    if (!currentStepConfig.requiresCompletion) {
      return true;
    }
    
    // Use the service to check completion status
    return this._onboardingService.isStepCompleted(currentStepConfig.id);
  });

  // Check if a specific step is completed
  isStepCompleted(stepId: OnboardingStepId): boolean {
    return this._onboardingService.isStepCompleted(stepId);
  }

  ngOnInit() {
    this.loadSettingsFromStore();
    this.syncCurrentStepWithRoute();
  }

  private loadSettingsFromStore() {
    const storeData = this._store.getStore();
    
    this._settings.set(DEFAULT_ONBOARDING_SETTINGS);
  }

  private syncCurrentStepWithRoute() {
    const currentUrl = this._router.url;
    const steps = this.steps();
    
    const stepIndex = steps.findIndex(step => currentUrl.includes(step.route.split('/').pop()!));
    
    if (stepIndex !== -1) {
      this.currentStep.set(stepIndex);
      this.maxStepReached.set(stepIndex);
    }
  }

  // Get current step ID
  getCurrentStepId(): OnboardingStepId | null {
    const steps = this.steps();
    const currentIndex = this.currentStep();
    return steps[currentIndex]?.id ?? null;
  }

  moveStep(arg: 'next' | 'back' | number) {
    const currentIndex = this.currentStep();
    const steps = this.steps();

    if (currentIndex === 0 && arg === 'back') {
      return;
    }

    // Prevent moving forward if current step is not completed
    if (arg === 'next' && !this.isCurrentStepCompleted()) {
      return;
    }

    const newStep =
      arg === 'next' ? currentIndex + 1 :
      arg === 'back' ? currentIndex - 1 :
      typeof arg === 'number' ? arg :
      currentIndex;

    if (newStep < 0 || newStep >= steps.length) {
      return;
    }

    if (newStep > this.maxStepReached()) {
      this.maxStepReached.set(newStep);
    }

    // Navigate using the route from the step configuration
    this._router.navigate([steps[newStep].route]);
    this.currentStep.set(newStep);
  }
}
