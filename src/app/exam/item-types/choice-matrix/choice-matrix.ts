import { Component, computed, inject, model } from '@angular/core';
import { Store } from '../../../store/store';
import { AlphabetList } from '../../../store/model/types';
import { CandidateEventType } from '../../../store/model/events/events.enum';
import { EventService } from '../../../services/event';
import { AnswerTools } from '../../answer-tools/answer-tools';
import { QuestionTools } from '../../question-tools/question-tools';
import { SafeHtmlPipe } from '../../../utils/safe-html.pipe';


@Component({
  selector: 'app-choice-matrix', 
  imports: [QuestionTools, AnswerTools, SafeHtmlPipe],
  templateUrl: './choice-matrix.html',
  styleUrl: './choice-matrix.css',
})
export class ChoiceMatrix {
  private _store = inject(Store)
  private _eventService = inject(EventService)
  
  fontSize = model<number>()
  store = computed(() => this._store.store())
  alphabetList: typeof AlphabetList = AlphabetList;

  captureResponses(value: any, event: any, stem: number) {
    const currentQuestion = this.store().currentQuestion;
    if (!currentQuestion) {
      return
    };

    if(!event.target.checked) {
      return
    }

    currentQuestion.stems?.map((item, i)  => {
      const resp = currentQuestion.responses[i];
      currentQuestion.responses[i] = (resp !== undefined && resp !== null && resp !== '') ? resp : ''
    })

    const oldAnswers = [...currentQuestion.responses];

    if (oldAnswers[stem] === value) {
      return;
    }

    currentQuestion!.responses[stem] = value

    const hasOldAnswer = oldAnswers[stem] !== undefined && oldAnswers[stem] !== null && oldAnswers[stem] !== '';

    const answerIndex = value ? currentQuestion.options.findIndex(opt => opt.value === value).toString() : '';

    const oldAnswerIndices = oldAnswers.map(ans => {
      if (!ans) return '';
      return currentQuestion.options.findIndex(opt => opt.value === ans).toString();
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
