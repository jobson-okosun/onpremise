import { Component, computed, effect, inject, signal } from '@angular/core';
import { Store } from '../store/store';
import { ExamService } from '../services/exam';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-overview',
  imports: [RouterLink],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})

export default class Overview {
  private _store = inject(Store)
  private _examService = inject(ExamService)

  store = computed(() => this._store.store())
  examDuration = computed(() => this.store().examDuration)
}
