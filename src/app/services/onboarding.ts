import { Injectable, computed, signal } from '@angular/core';
import { 
    ALL_ONBOARDING_STEPS,
    INITIAL_STEP_COMPLETION, 
    OnboardingStepId, 
    StepCompletionStatus 
} from '../store/model/types';

@Injectable({ providedIn: 'root' })
export class OnboardingService {
    private _completionStatus = signal<StepCompletionStatus>({ ...INITIAL_STEP_COMPLETION });

    completionStatus = this._completionStatus.asReadonly();

    // Check if all steps that require completion are completed
    allRequiredStepsCompleted = computed(() => {
        const status = this._completionStatus();
        const requiredSteps = ALL_ONBOARDING_STEPS.filter(step => step.requiresCompletion);
        return requiredSteps.every(step => status[step.id]);
    });

    isStepCompleted(stepId: OnboardingStepId): boolean {
        return this._completionStatus()[stepId];
    }

    markStepCompleted(stepId: OnboardingStepId) {
        this._completionStatus.update(status => ({
            ...status,
            [stepId]: true
        }));
    }

    markStepIncomplete(stepId: OnboardingStepId) {
        this._completionStatus.update(status => ({
            ...status,
            [stepId]: false
        }));
    }

    resetAllSteps() {
        this._completionStatus.set({ ...INITIAL_STEP_COMPLETION });
    }

    getStepCompletionSignal(stepId: OnboardingStepId) {
        return computed(() => this._completionStatus()[stepId]);
    }
}
