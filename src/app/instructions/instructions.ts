import { Component, computed, effect, inject } from '@angular/core';
import { Store } from '../store/store';
import { Router, RouterLink } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({
  selector: 'app-instructions',
  imports: [RouterLink],
  templateUrl: './instructions.html',
  styleUrl: './instructions.css',
})
export default class Instructions {
  private _store = inject(Store)
  private _router = inject(Router)
  private _toast = inject(HotToastService)

  store = computed(() => this._store.store())
  totalQuestions = computed(() => this.store().sections.reduce((s, item) => s + item.items.length, 0))
  start = computed(() => this.store().loginData?.assessment_data.instruction_read_time_sec ?? 10);
  tick = toSignal(interval(1000), { initialValue: 0 });
  countDown = computed(() => {
    const secondsPassed = this.tick();
    const remaining = this.start() - secondsPassed;

    return remaining > 0 ? remaining : 0;
  });

  done = effect(() => {
    if (this.countDown() == this.store().loginData?.assessment_data!.warn_end_of_reading_time_sec) {
      this._toast.info('You are approaching the end of the time allocated to read the instructions')
    }

    if (this.countDown() === 0 && this.start() > 0) {
      this._router.navigate(['exam'])
    }
  });
}
