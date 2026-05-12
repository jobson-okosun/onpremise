import { Component, computed, inject } from '@angular/core';
import Login from '../login/login';
import { Store } from '../../store/store';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-authentication',
  imports: [Login, RouterLink],
  templateUrl: './authentication.html',
  styleUrl: './authentication.css',
})
export default class Authentication {
  private _store = inject(Store);
  private _route = inject(ActivatedRoute)
  private _router = inject(Router)
  
  store = computed(() => this._store.store());

  goToLogin() {
    const userId = this._route.snapshot.queryParamMap.get('userId')
    const examId = this._route.snapshot.queryParamMap.get('examId')
    return this._router.navigate(['/proctored/auth/login'], { queryParams: { userId, examId } })
  }
}
