import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { DataService } from './services/data/data';
import { Store } from './store/store';
import { Dialog } from 'primeng/dialog';  
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { TauriService } from './services/ipc/tauri';
import { APIIPC } from './services/ipc/api-ipc';
import { ExamPauseService } from './services/exam-pause';
import { ExamService } from './services/exam';
import { effect } from '@angular/core';

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
  private _apiIPc = inject(APIIPC)
  private _examPauseService = inject(ExamPauseService)

  store = computed(() => this._store.store())
  userExitPassword = new FormControl('', Validators.required)
  isExitingApplication = signal(false)
  
  hasActivePauses = computed(() => this._examPauseService.hasActivePauses())
  isExitRequired = computed(() => this._examPauseService.isExitRequired())
  activePauseMessage = computed(() => this._examPauseService.activePauseMessage())
  
  private _examService = inject(ExamService)
  
  constructor() {
    effect(() => {
      if (this.hasActivePauses()) {
        this._examService.pauseExamTimer();
      } else {
        this._examService.resumeExamTimer();
      }
    });
  }

  watchURL = toSignal(this._router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map(() => {
      this.updateRouteInfo()
    })
  ))

  async ngOnInit() {
    await this._apiIPc.checkDeviceStatus()
    await this._tauriService.updatePlatformType() 
    this._examPauseService.init()

    this._dataService.downloadOrganizationAssets()
    this.unlockSpeechSynthesis()
  }

  private unlockSpeechSynthesis() {
    let unlocked = false;
    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      if ('speechSynthesis' in window) {
        window.speechSynthesis.resume();
        const utterance = new SpeechSynthesisUtterance(' ');
        utterance.volume = 0;
        utterance.rate = 10;
        window.speechSynthesis.speak(utterance);
      }

      document.removeEventListener('click', unlock);
      document.removeEventListener('touchstart', unlock);
      document.removeEventListener('keydown', unlock);
    };

    document.addEventListener('click', unlock);
    document.addEventListener('touchstart', unlock);
    document.addEventListener('keydown', unlock);
  }

  private updateRouteInfo() {
    const queryParams = this._route.snapshot.queryParams
    let currentRoute = this.store().currentRoute || {}
    currentRoute = { ...currentRoute, queryParams }

    this._store.updateStore({ currentRoute, isPreviewMode: !!localStorage.getItem('exam-preview-mode') })
  } 

  pinApp() { 
    this._tauriService.pinApplication()
  }

  closeBrowser() {
    this._examPauseService.closeBrowser()
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
