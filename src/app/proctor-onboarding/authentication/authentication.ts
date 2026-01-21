import { Component, computed, inject } from '@angular/core';
import Login from '../login/login';
import { Store } from '../../store/store';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  imports: [Login],
  templateUrl: './authentication.html',
  styleUrl: './authentication.css',
})
export default class Authentication {
  private _store = inject(Store);
  private _route = inject(ActivatedRoute)
  private _router = inject(Router)
  
  store = computed(() => this._store.store());

  goToLogin() {
    const userid = this._route.snapshot.queryParamMap.get('userid')
    const examid = this._route.snapshot.queryParamMap.get('examid')
    return this._router.navigate(['/proctored/auth/login'], { queryParams: { userid, examid } })
  }
}
