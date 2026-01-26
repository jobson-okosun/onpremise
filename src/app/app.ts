import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { DataService } from './services/data';
import { TauriService } from './services/tauri';
import { Store } from './store/store';
import { Dialog } from 'primeng/dialog';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, tap } from 'rxjs';
import { ExamService } from './services/exam';
import { mockStore } from './utils/constants';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Dialog, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private _route = inject(ActivatedRoute)
  private _router = inject(Router)
  private _dataService = inject(DataService)
  private _tauriService = inject(TauriService)
  private _store = inject(Store)
  private _exam = inject(ExamService)

  isAdminRoute = signal(false)
  store = computed(() => this._store.store())
  userExitPassword = new FormControl('', Validators.required)
  isExitingApplication = signal(false)

  watchURL = toSignal(this._router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map(() => {
      this.isAdminRoute.set(this.isAdminUrl())
      this.updateRouteInfo()
    })
  ))

  ngOnInit() {
    // this._exam.formatLoginDataToStore(mockStore as any)
    this._tauriService.updatePlatformType() 
    this._dataService.downloadOrganizationAssets()
    this._tauriService.initializeBatteryStatus()
  }

  private updateRouteInfo() {
    const queryParams = this._route.snapshot.queryParams
    let currentRoute = this.store().currentRoute || {}
    currentRoute = { ...currentRoute, queryParams }

    this._store.updateStore({ currentRoute })
  }

  isAdminUrl() {
    return location.href.includes('admin')
  }

  pinApp() {
    this._tauriService.pinApplication()
  }

  exitApplication() {
    const payload = { password: this.userExitPassword.value } as any;
    this._tauriService.exitApplication(payload)
  }

  resetForm() {
    this.userExitPassword.setValue(null)
    this._store.updateStore({ exitApplicationMessage: null, showCloseAppWithPasswordModal: false })
  }
}
