import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { Store } from '../store/store';

@Component({
  selector: 'app-exam-ended',
  imports: [],
  templateUrl: './exam-ended.html',
  styleUrl: './exam-ended.css',
})
export default class ExamEnded {
  private _store = inject(Store)

  store = computed(() => this._store.store())
  start = signal(60);
  tick = toSignal(interval(1000), { initialValue: 0 });
  countDown = computed(() => {
    const secondsPassed = this.tick();
    const remaining = this.start() - secondsPassed;

    return remaining > 0 ? remaining : 0;
  });

  done = effect(() => {
    if (this.countDown() === 0 && this.start() > 0) {
      this.returnToLogin();
    }
  });

  returnToLogin() {
    location.href = '/';
  }
}
