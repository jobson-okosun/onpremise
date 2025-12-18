import { Component, computed, inject, model, output, signal } from '@angular/core';
import { PopoverModule } from 'primeng/popover';
import { Overview } from "../overview/overview";
import { fullscreen } from '../../utils/helper';
import { ExamService } from '../../services/exam';
import { Store } from '../../store/store';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-exam-tools',
  templateUrl: './exam-tools.html',
  styleUrl: './exam-tools.css',
  imports: [PopoverModule, Overview,Menu], 
})
export class ExamTools {
  private _store = inject(Store)
  private _exam = inject(ExamService)

  store = computed(() => this._store.store())
  countDownTimer = computed(() => this._exam.timeDisplay())
  minTimeSpent =  computed(() => this._exam.timeInMinsSpentInExam())
  connectionStatus = computed(() => this._exam.connectionStatus())
  canEndExam = computed(() => this._exam.canEndExam())
  lastAutosaveTimeDifference = computed(() => this._exam.lastAutosaveTimeDifference())
  showCalculator = model<null | string>()
  resizeFont = output<any>()
  overViewActiveTab = signal(0)

  fullscreen() {
    fullscreen()
  }

  endExam() {
    this._exam.showUnattemptedModal.set(true)
  }
}
