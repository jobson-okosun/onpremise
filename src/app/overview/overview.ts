import { Component, computed, inject } from '@angular/core';
import { Store } from '../store/store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-overview',
  imports: [RouterLink],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})

export default class Overview {
  private _store = inject(Store)

  store = computed(() => this._store.store())
  examDuration = computed(() => this.store().examDuration)
  totalQuestions = computed(() => this.store().sections.reduce((s, item) => s + item.items.length, 0))
}
