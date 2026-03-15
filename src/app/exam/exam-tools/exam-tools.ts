import { Component, computed, inject, model, output, signal } from '@angular/core';
import { PopoverModule } from 'primeng/popover';
import { Overview } from "../overview/overview";
import { fullscreen } from '../../utils/helper';
import { ExamService } from '../../services/exam';
import { Store } from '../../store/store';
import { Menu } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
@Component({
  selector: 'app-exam-tools',
  templateUrl: './exam-tools.html',
  styleUrl: './exam-tools.css',
  imports: [PopoverModule, Overview,Menu, TooltipModule], 
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

  spentTimeDisplay = computed(() => this._exam.spentTimeDisplay())
  totalExamTime = computed(() => this._exam.totalExamTime())
  isExamAlpha = computed(() => this._exam.isExamAlpha())
  
  fullscreen() {
    fullscreen()
  }

  endExam() {
    this._exam.showUnattemptedModal.set(true)
  }
}
