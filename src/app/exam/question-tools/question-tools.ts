import { Component, computed, effect, inject, input, model, signal, untracked } from '@angular/core';
import { ExamService } from '../../services/exam';
import { ItemType } from '../../store/model/types';
import { CandidateEventType } from '../../store/model/events/events.enum';
import { Dialog } from 'primeng/dialog';
import { Store } from '../../store/store';
import { DrawerModule } from 'primeng/drawer';
import { AccordionModule } from 'primeng/accordion';
import { KonvaToolsEvent } from '../item-types/drawing-and-writing/services/event.service';
import { EventService } from '../../services/event';
import { SafeHtmlPipe } from '../../utils/safe-html.pipe';
import { getParentLabel as getParentLabelHelper, getChildLabel as getChildLabelHelper } from '../../utils/helper';
import { TextToSpeechService } from '../../services/reader/text-to-speech';
import { DrawingAndWritingStore } from '../item-types/drawing-and-writing/services/store.service';

@Component({
  selector: 'app-question-tools',
  imports: [Dialog, DrawerModule, AccordionModule, SafeHtmlPipe],
  templateUrl: './question-tools.html',
  styleUrl: './question-tools.css',
})
export class QuestionTools {
  private _exam = inject(ExamService)
  private _store = inject(Store)
  private _konvaEventTools = inject(KonvaToolsEvent)
  private _eventService = inject(EventService)
  private _textToSpeech = inject(TextToSpeechService)
  private _drawingStore = inject(DrawingAndWritingStore)

  isTextToSpeechEnabled = computed(() => this._textToSpeech.isTextToSpeechEnabled());

  itemTypes = signal(ItemType);
  store = computed(() => this._store.store())
  currentQuestionIndex = computed(() => this.store().currentQuestionIndex)
  currentQuestion = computed(() => this.store().currentQuestion)
  currentSection = computed(() => this.store().currentSection)
  currentSectionSummary = computed(() => this._exam.currentSectionSummary())
  activeStoreId = computed(() => this.store().activeSubQuestionId || 'default')
  allDrawingStores = computed(() => this._drawingStore.getAllStores())

  currentBlockName = computed(() => {
    const question = this.currentQuestion();
    const section = this.currentSection();
    if (question && section && section?.blocks) {
      const block = section.blocks.find((b: any) => b.id === question.block_id);
      return block?.blockName || '';
    }
    return '';
  });

  showIntructionDrawer = signal<boolean>(false)
  showCalculator = model<boolean>(false)
  showToggleLayoutButton = input<boolean>(false)
  showQuestionModal = signal<boolean>(false)
  showQuestionModalButton = model<boolean>(true)
  isExamAlpha = computed(() => this._exam.isExamAlpha())

  constructor() {
    effect((onCleanup) => {
      const isOpen = this.showIntructionDrawer();
      untracked(() => {
        if (isOpen) {
          this._eventService.logEvent({ event_type: CandidateEventType.INSTRUCTIONS_PANEL_TOGGLED });
          const openTime = Date.now();

          onCleanup(() => {
            const duration_ms = Date.now() - openTime;
            this._eventService.logEvent({ event_type: CandidateEventType.INSTRUCTIONS_PANEL_TOGGLED, duration_ms });
          });
        }
      });
    });
  }

  isAttempted(id: string): boolean {
    const stores = this.allDrawingStores();
    const storeData = stores[id];
    if (!storeData) return false;

    let pointFound = false;
    storeData.pages.forEach((page: any) => {
      if (page.strokes && page.strokes.length) {
        pointFound = true;
      }
    });
    return pointFound;
  }

  onModalShow() {
    if (this.currentQuestion()?.item_type === ItemType.DRAWING_AND_WRITING) {
      setTimeout(() => {
        const el = document.getElementById('modal-sq-' + this.activeStoreId());
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  }

  revisit() {
    this._exam.addQuestionForRevisit()

    const isFlagged = this.store().currentQuestion?.revisit;
    this._eventService.logEvent({
      event_type: isFlagged ? CandidateEventType.QUESTION_FLAGGED : CandidateEventType.QUESTION_UNFLAGGED,
      question_id: this.store().currentQuestion!.id,
      section_id: this.store().currentSection!.id
    })
  }

  readCurrentQuestion() {
    this._textToSpeech.announceCurrentQuestion();
  }

  getParentLabel(parentIndex: number): string {
    return getParentLabelHelper(this.currentQuestionIndex(), parentIndex);
  }

  getChildLabel(childIndex: number): string {
    return getChildLabelHelper(childIndex);
  }

  toggleLayout() {
    const currentConfig = this.store().drawingAndWritingConfig
    const updatedConfig = { ...currentConfig, layoutFullMode: !currentConfig.layoutFullMode }
    this._store.updateStore({ drawingAndWritingConfig: updatedConfig })
    this._konvaEventTools._toggleDrawingAndWritingLayout$.next()
  }
}
