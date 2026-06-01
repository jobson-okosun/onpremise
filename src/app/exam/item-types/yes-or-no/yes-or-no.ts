import { Component, computed, inject, model } from '@angular/core';
import { Store } from '../../../store/store';
import { AlphabetList, UsageEvents } from '../../../store/model/types';
import { QuestionTools } from '../../question-tools/question-tools';
import { AnswerTools } from '../../answer-tools/answer-tools';
import { EventService } from '../../../services/event';

@Component({
  selector: 'app-yes-or-no',
  imports: [QuestionTools, AnswerTools],
  templateUrl: './yes-or-no.html',
  styleUrl: './yes-or-no.css',
})
export class YesOrNo {
  private _store = inject(Store);
  private _eventService = inject(EventService)

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
