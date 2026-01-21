import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Store } from '../../store/store';

@Component({
  selector: 'app-proctored-exam-details-step',
  imports: [],
  templateUrl: './exam-details.html',
  styleUrl: './exam-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProctoredExamDetailsStep {
  private _store = inject(Store)

  store = computed(() => this._store.store())
  examDuration = computed(() => this.store().examDuration)
  userid = input<string>('');
  examid = input<string>('');
}
