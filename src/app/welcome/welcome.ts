import { Component, computed, inject, signal } from '@angular/core';
import Login from '../login/login';
import { Store } from '../store/store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [Login, RouterLink],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export  default class Welcome { 
  private _store = inject(Store)

  isLoading = signal(false)
  store = computed(() => this._store.store())
}
