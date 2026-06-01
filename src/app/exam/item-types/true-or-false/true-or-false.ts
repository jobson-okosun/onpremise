import { Component, computed, inject, model } from '@angular/core';
import { Store } from '../../../store/store';
import { ExamService } from '../../../services/exam';
import { AlphabetList, UsageEvents } from '../../../store/model/types';
import { QuestionTools } from '../../question-tools/question-tools';
import { AnswerTools } from '../../answer-tools/answer-tools';
import { EventService } from '../../../services/event';

@Component({
  selector: 'app-true-or-false',
  imports: [QuestionTools, AnswerTools],
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

    this._eventService.logEvent({
      event_type: currentQuestion!.responses[0] ? UsageEvents.ANSWER_SELECTED_CHANGED : UsageEvents.ANSWER_SELECTED,
      current_question_id: currentQuestion?.id,
      current_section_id: this.store().currentSection?.id,
      timestamp: new Date()
    })
    
    currentQuestion!.responses[0] = value;
    this._store.updateStore({ currentQuestion });
  }
}
