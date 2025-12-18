import { Component, computed, inject, model } from '@angular/core';
import { Store } from '../../../store/store';
import { AlphabetList } from '../../../store/model/types';
import { QuestionTools } from '../../question-tools/question-tools';
import { AnswerTools } from '../../answer-tools/answer-tools';

@Component({
  selector: 'app-yes-or-no',
  imports: [QuestionTools, AnswerTools],
  templateUrl: './yes-or-no.html',
  styleUrl: './yes-or-no.css',
})
export class YesOrNo {
  private _store = inject(Store);

  fontSize = model<number>();
  store = computed(() => this._store.store());
  alphabetList: typeof AlphabetList = AlphabetList;

  selectOption(value: any) {
    const currentQuestion = this.store().currentQuestion;
    currentQuestion!.responses[0] = value;

    this._store.updateStore({ currentQuestion });
  }
}
