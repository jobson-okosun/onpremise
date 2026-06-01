import { Component, computed, inject, input, model, signal } from '@angular/core';
import { ExamService } from '../../services/exam';
import { ItemType, UsageEvents } from '../../store/model/types';
import { Dialog } from 'primeng/dialog';
import { Store } from '../../store/store';
import { DrawerModule } from 'primeng/drawer';
import { AccordionModule } from 'primeng/accordion';
import { KonvaToolsEvent } from '../item-types/drawing-and-writing/services/event.service';
import { EventService } from '../../services/event';

@Component({
  selector: 'app-question-tools',
  imports: [Dialog, DrawerModule, AccordionModule],
  templateUrl: './question-tools.html',
  styleUrl: './question-tools.css',
})
export class QuestionTools {
  private _exam = inject(ExamService)
  private _store = inject(Store)
  private _konvaEventTools = inject(KonvaToolsEvent)
  private _eventService = inject(EventService)
  
  itemTypes = signal(ItemType);
  store = computed(() => this._store.store())
  currentQuestionIndex = computed(() => this.store().currentQuestionIndex)
  currentQuestion = computed(() => this.store().currentQuestion)
  currentSection = computed(() => this.store().currentSection)
  currentSectionSummary = computed(() => this._exam.currentSectionSummary())
  showIntructionDrawer = signal<boolean>(false)
  showCalculator = model<boolean>(false)
  showToggleLayoutButton = input<boolean>(false)
  showQuestionModal = signal<boolean>(false)
  showQuestionModalButton = model<boolean>(true)
  isExamAlpha = computed(() => this._exam.isExamAlpha())

  revisit() {
    this._exam.addQuestionForRevisit()
    
    this._eventService.logEvent({
      event_type: UsageEvents.QUESTION_REVISIT_LATER,
      current_question_id: this.store().currentQuestion?.id,
      current_section_id: this.store().currentSection?.id,
      timestamp: new Date()
    })
  }

  toggleLayout() {
    const currentConfig = this.store().drawingAndWritingConfig
    const updatedConfig = { ...currentConfig, layoutFullMode: !currentConfig.layoutFullMode }
    this._store.updateStore({ drawingAndWritingConfig: updatedConfig })
    this._konvaEventTools._toggleDrawingAndWritingLayout$.next()
  }
}
