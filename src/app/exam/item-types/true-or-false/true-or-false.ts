import { Component, computed, inject, model } from '@angular/core';
import { Store } from '../../../store/store';
import { ExamService } from '../../../services/exam';
import { AlphabetList } from '../../../store/model/types';
import { CandidateEventType } from '../../../store/model/events/events.enum';
import { QuestionTools } from '../../question-tools/question-tools';
import { AnswerTools } from '../../answer-tools/answer-tools';
import { EventService } from '../../../services/event';
import { SafeHtmlPipe } from '../../../utils/safe-html.pipe';

@Component({
  selector: 'app-true-or-false',
  imports: [QuestionTools, AnswerTools, SafeHtmlPipe],
  templateUrl: './true-or-false.html',
  styleUrl: './true-or-false.css',
})
export class TrueOrFalse {
  private _store = inject(Store);
  private _exam = inject(ExamService);
  private _eventService = inject(EventService);

  fontSize = model<number>();
  store = computed(() => this._store.store());
  alphabetList: typeof AlphabetList = AlphabetList;

  selectOption(value: any) {
    const currentQuestion = this.store().currentQuestion;

    const oldAnswer = currentQuestion!.responses[0];
    const isSameAnswer = oldAnswer === value;

    if (isSameAnswer) {
      return;
    }

    const hasOldAnswer = oldAnswer !== undefined && oldAnswer !== null && oldAnswer !== '';

    const answerIndex = currentQuestion!.options.findIndex(opt => opt.value === value).toString();
    const oldAnswerIndex = hasOldAnswer ? currentQuestion!.options.findIndex(opt => opt.value === oldAnswer).toString() : null;

    this._eventService.logEvent({
      event_type: hasOldAnswer ? CandidateEventType.ANSWER_CHANGED : CandidateEventType.ANSWER_SELECTED,
      question_id: currentQuestion!.id,
      section_id: this.store().currentSection!.id,
      answer: answerIndex,
      old_answer: oldAnswerIndex
    })
    
    currentQuestion!.responses[0] = value;
    this._store.updateStore({ currentQuestion });
  }
}
