import { Component, computed, inject, model, signal } from '@angular/core';
import { Store } from '../../../store/store';
import { AnswerTools } from '../../answer-tools/answer-tools';
import { QuestionTools } from '../../question-tools/question-tools';
import { AlphabetList } from '../../../store/model/types';
import { CandidateEventType } from '../../../store/model/events/events.enum';
import { EventService } from '../../../services/event';
import { SafeHtmlPipe } from '../../../utils/safe-html.pipe';


@Component({
  selector: 'app-close-with-select',
  imports: [AnswerTools, QuestionTools, SafeHtmlPipe],
  templateUrl: './close-with-select.html',
  styleUrl: './close-with-select.css',
})
export class CloseWithSelect {
  private _store = inject(Store);
  private _eventService = inject(EventService)

  store = computed(() => this._store.store());
  fontSize = model(16);
  clozeRenderArray = signal<{ text: string; dropBox: boolean }[]>([]);
  alphabetList: typeof AlphabetList = AlphabetList;
  isMobile = signal(false)

  ngOnInit() {
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    this.isMobile.set(isMobile)

    this.formatStimulus();
  }

  formatStimulus() {
    const currentQuestion = this.store().currentQuestion;
    if (!currentQuestion?.stimulus) {
      return
    }

    const parts = currentQuestion.stimulus.split('{{response}}');
    const arr: { text: string; dropBox: boolean; }[] = [];

    parts.forEach((text, i) => {
      if (i == parts.length - 1) {
        const entry = { text: text, dropBox: false };
        arr.push(entry);
      } else {
        const entry = { text: text, dropBox: true };
        arr.push(entry);
      }
    });

    this.clozeRenderArray.set(arr);
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
}
