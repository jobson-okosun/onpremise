import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './services/data';
import { TauriService } from './services/tauri';
import { Store } from './store/store';
import { Dialog } from 'primeng/dialog';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Dialog, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private _dataService = inject(DataService)
  private _tauriService = inject(TauriService)
  private _store = inject(Store)

  store = computed(() => this._store.store())
  userExitPassword = new FormControl('', Validators.required)
  isExitingApplication = signal(false)

  ngOnInit() {
    this._tauriService.updatePlatformType()
    this._dataService.downloadOrganizationAssets()
    this._tauriService.initializeBatteryStatus()
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
