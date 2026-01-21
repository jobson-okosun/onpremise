import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Store } from '../../store/store';
import { Router } from '@angular/router';
import { OnboardingService } from '../../services/onboarding';

@Component({
  selector: 'app-proctored-start-exam-step',
  templateUrl: './start-exam.html',
  styleUrl: './start-exam.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProctoredStartExamStep {
  private _store = inject(Store);
  private _router = inject(Router);
  private _onboardingService = inject(OnboardingService);

  store = computed(() => this._store.store());
  examDuration = computed(() => this.store().examDuration);
  sectionsCount = computed(() => this.store().sections?.length ?? 0);
  candidateName = computed(() => this.store().loginData?.candidate_data?.name ?? 'Candidate');

  // Check if all required steps are completed
  canStartExam = computed(() => this._onboardingService.allRequiredStepsCompleted());
  completionStatus = computed(() => this._onboardingService.completionStatus());

  startExam() {
    if (this.canStartExam()) {
      this._router.navigate(['/exam']);
    }
  }
}
