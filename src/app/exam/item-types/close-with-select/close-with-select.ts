import { Component, computed, inject, model, signal, viewChild, viewChildren, ElementRef, AfterViewChecked, Renderer2, OnInit, HostListener, effect, untracked } from '@angular/core';
import { Store } from '../../../store/store';
import { AnswerTools } from '../../answer-tools/answer-tools';
import { QuestionTools } from '../../question-tools/question-tools';
import { AlphabetList } from '../../../store/model/types';
import { CandidateEventType } from '../../../store/model/events/events.enum';
import { EventService } from '../../../services/event';
import { SafeHtmlPipe } from '../../../utils/safe-html.pipe';
import { ClozeTtsShortcutService } from '../../../services/reader/cloze-tts-shortcut.service';


@Component({
  selector: 'app-close-with-select',
  imports: [AnswerTools, QuestionTools, SafeHtmlPipe],
  templateUrl: './close-with-select.html',
  styleUrl: './close-with-select.css',
  providers: [ClozeTtsShortcutService]
})
export class CloseWithSelect implements OnInit, AfterViewChecked {
  private _store = inject(Store);
  private _eventService = inject(EventService)
  private renderer = inject(Renderer2);
  private ttsShortcutService = inject(ClozeTtsShortcutService);

  store = computed(() => this._store.store());
  currentQuestionId = computed(() => this.store().currentQuestion?.id);
  fontSize = model(16);
  alphabetList: typeof AlphabetList = AlphabetList;
  isMobile = signal(false)

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
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    this.isMobile.set(isMobile)

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

    const possibleResponses = currentQuestion.possible_responses?.[index]?.responses || [];
    const answerIndex = value ? possibleResponses.findIndex((opt: any) => opt.value === value).toString() : '';

    const oldAnswerIndices = oldAnswers.map((ans, idx) => {
      if (!ans) return '';
      const pr = currentQuestion.possible_responses?.[idx]?.responses || [];
      return pr.findIndex((opt: any) => opt.value === ans).toString();
    }).join(',');

    this._eventService.logEvent({
      event_type: hasOldAnswer ? CandidateEventType.ANSWER_CHANGED : CandidateEventType.ANSWER_SELECTED,
      question_id: currentQuestion.id,
      section_id: this.store().currentSection!.id,
      answer: answerIndex,
      old_answer: oldAnswerIndices
    })

    currentQuestion!.lastUpdated = new Date()

    this._store.updateStore({ currentQuestion })
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    this.ttsShortcutService.handleKeyDown(event);
  }
}
