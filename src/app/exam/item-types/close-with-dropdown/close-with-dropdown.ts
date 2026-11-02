import { Component, computed, inject, model, viewChild, viewChildren, ElementRef, AfterViewChecked, Renderer2, HostListener, OnInit, effect, untracked,
} from '@angular/core';
import { Store } from '../../../store/store';
import { QuestionTools } from '../../question-tools/question-tools';
import { AnswerTools } from '../../answer-tools/answer-tools';
import { CandidateEventType } from '../../../store/model/events/events.enum';
import { EventService } from '../../../services/event';
import { SafeHtmlPipe } from '../../../utils/safe-html.pipe';
import { ClozeTtsShortcutService } from '../../../services/reader/cloze-tts-shortcut.service';
import { ExamSpeechService } from '../../../services/reader/exam-speech.service';

@Component({
  selector: 'app-close-with-dropdown',
  imports: [QuestionTools, AnswerTools, SafeHtmlPipe],
  templateUrl: './close-with-dropdown.html',
  styleUrl: './close-with-dropdown.css',
  providers: [ClozeTtsShortcutService]
})
export class CloseWithDropdown implements OnInit, AfterViewChecked {
  private _store = inject(Store);
  private _eventService = inject(EventService);
  private renderer = inject(Renderer2);

  private ttsShortcutService = inject(ClozeTtsShortcutService);
  private tts = inject(ExamSpeechService)

  store = computed(() => this._store.store());
  currentQuestionId = computed(() => this.store().currentQuestion?.id);
  fontSize = model(16);
  contentContainer = viewChild<ElementRef>('contentContainer');
  dropdowns = viewChildren<ElementRef>('clozeDropdown');

  formattedStimulus = computed(() => {
    const currentQuestion = this.store().currentQuestion;
    if (!currentQuestion?.stimulus) {
      return '';
    }

    let stim = currentQuestion.stimulus;
    let i = 0;
    while (stim.includes('{{response}}')) {
      // Replace each occurrence sequentially with an incrementing index
      stim = stim.replace('{{response}}', `<span class="cloze-placeholder inline-flex align-middle" data-index="${i}"></span>`);
      i++;
    }

    return stim;
  });

  constructor() {
    effect(() => {
      const qId = this.currentQuestionId();
      if (qId) {
        untracked(() => {
          this.ttsShortcutService.activeBlankIndex.set(0);
        });
      }
    });
  }

  ngOnInit() {
    this.ttsShortcutService.init(
      this.captureResponses.bind(this),
      () => this.dropdowns().length
    );
  }

  ngAfterViewChecked() {
    const container = this.contentContainer()?.nativeElement;
    const drops = this.dropdowns();

    if (container && drops.length > 0) {
      const placeholders = container.querySelectorAll('.cloze-placeholder');

      placeholders.forEach((placeholder: HTMLElement, i: number) => {
        const dropEl = drops[i]?.nativeElement;
        if (dropEl && !placeholder.contains(dropEl)) {
          this.renderer.appendChild(placeholder, dropEl);
        }
      });
    }
  }


  captureResponses(index: number, value: string) {
    const currentQuestion = this.store().currentQuestion;
    if (!currentQuestion) {
      return
    };

    const oldAnswers = [...currentQuestion.responses];

    if (oldAnswers[index] === value) {
      return;
    }

    currentQuestion.responses[index] = value;

    const oldAnswer = oldAnswers[index];
    const hasOldAnswer = oldAnswer !== undefined && oldAnswer !== null && oldAnswer !== '';

    this._eventService.logEvent({
      event_type: hasOldAnswer
        ? (!value ? CandidateEventType.ANSWER_CLEARED : CandidateEventType.ANSWER_CHANGED)
        : CandidateEventType.ANSWER_SELECTED,
      question_id: currentQuestion.id,
      section_id: this.store().currentSection!.id,
      answer: value ? value.toString() : null,
      old_answer: hasOldAnswer ? oldAnswer.toString() : null
    });

    currentQuestion!.lastUpdated = new Date()

    this._store.updateStore({ currentQuestion })
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!this.tts.isTextToSpeechEnabled()) {
      return;
    }

    this.ttsShortcutService.handleKeyDown(event);
  }
}
