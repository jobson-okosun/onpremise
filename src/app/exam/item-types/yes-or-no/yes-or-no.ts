import { Component, computed, effect, inject, model } from '@angular/core';
import { Store } from '../../../store/store';
import { AlphabetList } from '../../../store/model/types';
import { CandidateEventType } from '../../../store/model/events/events.enum';
import { QuestionTools } from '../../question-tools/question-tools';
import { AnswerTools } from '../../answer-tools/answer-tools';
import { EventService } from '../../../services/event';
import { SafeHtmlPipe } from '../../../utils/safe-html.pipe';
import { ScreenReaderService } from '../../../services/screen-reader';


@Component({
  selector: 'app-yes-or-no',
  imports: [QuestionTools, AnswerTools, SafeHtmlPipe],
  templateUrl: './yes-or-no.html',
  styleUrl: './yes-or-no.css',
})
export class YesOrNo {
  private _store = inject(Store);
  private _eventService = inject(EventService);
  private _screenReaderService = inject(ScreenReaderService);

  constructor() {
    effect(() => {
      this._screenReaderService.autoAnnounceQuestion();
    });
  }

  fontSize = model<number>();
  store = computed(() => this._store.store());
  alphabetList: typeof AlphabetList = AlphabetList;

  selectOptionByIndex(index: number): boolean {
    const question = this.store().currentQuestion;
    if (!question || !question.options || index >= question.options.length) {
      return false;
    }
    this.selectOption(question.options[index].value);
    return true;
  }

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
