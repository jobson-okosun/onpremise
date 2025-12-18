import { Component, computed, inject, model } from '@angular/core';
import { Store } from '../../../store/store';
import { ExamService } from '../../../services/exam';
import { AlphabetList } from '../../../store/model/types';
import { QuestionTools } from '../../question-tools/question-tools';
import { AnswerTools } from '../../answer-tools/answer-tools';

@Component({
  selector: 'app-true-or-false',
  imports: [QuestionTools, AnswerTools],
  templateUrl: './true-or-false.html',
  styleUrl: './true-or-false.css',
})
export class TrueOrFalse {
  private _store = inject(Store);
  private _exam = inject(ExamService);

  fontSize = model<number>();
  store = computed(() => this._store.store());
  alphabetList: typeof AlphabetList = AlphabetList;

  selectOption(value: any) {
    const currentQuestion = this.store().currentQuestion;
    currentQuestion!.responses[0] = value;

    this._store.updateStore({ currentQuestion });
  }
}
