import { Component, computed, inject, model, signal } from '@angular/core';
import { Store } from '../../../store/store';
import { QuestionTools } from '../../question-tools/question-tools';
import { AnswerTools } from '../../answer-tools/answer-tools';
import { CandidateEventType } from '../../../store/model/events/events.enum';
import { EventService } from '../../../services/event';

@Component({
  selector: 'app-close-with-dropdown',
  imports: [QuestionTools, AnswerTools],
  templateUrl: './close-with-dropdown.html',
  styleUrl: './close-with-dropdown.css',
})
export class CloseWithDropdown {
  private _store = inject(Store);
  private _eventService = inject(EventService);

  store = computed(() => this._store.store());
  fontSize = model(16);
  clozeRenderArray = signal<{ text: string; dropBox: boolean }[]>([]);

  ngOnInit() {
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
    });

    currentQuestion!.lastUpdated = new Date()

    this._store.updateStore({ currentQuestion })
  }
}
