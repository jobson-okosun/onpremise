import { Component, computed, effect, inject, input, model, signal, untracked } from '@angular/core';
import { ExamService } from '../../services/exam';
import { ItemType } from '../../store/model/types';
import { CandidateEventType } from '../../store/model/events/events.enum';
import { Dialog } from 'primeng/dialog';
import { Store } from '../../store/store';
import { DrawerModule } from 'primeng/drawer';
import { Menu } from 'primeng/menu';
import { AccordionModule } from 'primeng/accordion';
import { KonvaToolsEvent } from '../item-types/drawing-and-writing/services/event.service';
import { EventService } from '../../services/event';
import { SafeHtmlPipe } from '../../utils/safe-html.pipe';
import { getParentLabel as getParentLabelHelper, getChildLabel as getChildLabelHelper } from '../../utils/helper';
import { TextToSpeechService } from '../../services/reader/text-to-speech';
import { DrawingAndWritingStore } from '../item-types/drawing-and-writing/services/store.service';
import { FormsModule } from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-question-tools',
  imports: [Dialog, DrawerModule, AccordionModule, SafeHtmlPipe, FormsModule],
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
  private _toast = inject(HotToastService)

  isTextToSpeechEnabled = computed(() => this._textToSpeech.isTextToSpeechEnabled());
  isCurrentQuestionFlagged = computed(() => {
    const qId = this.currentQuestion()?.id;
    return qId ? this._exam.isItemFlagged(qId) : false;
  });

  showFlagModal = signal(false);
  flagReasons = signal<string[]>([]);
  flagComment = signal<string>('');
  readonly availableFlagReasons = [
    { key: 'INCOMPLETE_QUESTION', label: 'Incomplete question' },
    { key: 'INCOMPLETE_OPTION', label: 'Incomplete option(s)' },
    { key: 'NO_CORRECT_ANSWER', label: 'No correct answer(s)' },
    { key: 'IMAGE_NOT_SHOWING', label: 'Image not showing' },
    { key: 'OTHER', label: 'Other issue' },
  ];

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

  openFlagModal() {
    const qId = this.currentQuestion()?.id;
    if (!qId) return;

    const existing = this._exam.getItemReport(qId);
    if (existing) {
      this.flagReasons.set([...existing.reasons]);
      this.flagComment.set(existing.comment || '');
    } else {
      this.flagReasons.set([]);
      this.flagComment.set('');
    }
    this.showFlagModal.set(true);
  }

  toggleFlagReason(key: string) {
    this.flagReasons.update(current => {
      if (current.includes(key)) {
        return current.filter(k => k !== key);
      } else {
        return [...current, key];
      }
    });
  }

  submitFlag() {
    const question = this.currentQuestion();
    const section = this.currentSection();
    if (!question || !section) return;

    if (this.flagReasons().length === 0) {
      this._toast.error('Please select at least one reason.');
      return;
    }

    this._exam.flagItem(question.id, section.id, this.flagReasons(), this.flagComment());
    this._toast.success('Question flagged successfully.');
    this.showFlagModal.set(false);
  }

  withdrawFlag() {
    const question = this.currentQuestion();
    const section = this.currentSection();
    if (!question || !section) return;

    this._exam.unflagItem(question.id, section.id);
    this._toast.info('Question unflagged.');
    this.showFlagModal.set(false);
  }
}
