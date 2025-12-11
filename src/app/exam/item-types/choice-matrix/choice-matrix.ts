import { Component, computed, inject, model } from '@angular/core';
import { Store } from '../../../store/store';
import { AlphabetList } from '../../../store/model/types';
import { AnswerTools } from '../../answer-tools/answer-tools';
import { QuestionTools } from '../../question-tools/question-tools';

@Component({
  selector: 'app-choice-matrix', 
  imports: [QuestionTools, AnswerTools],
  templateUrl: './choice-matrix.html',
  styleUrl: './choice-matrix.css',
})
export class ChoiceMatrix {
  private _store = inject(Store)
  
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
      currentQuestion.responses[i] = currentQuestion.responses[i] ? currentQuestion.responses[i] : ''
    })

    currentQuestion!.responses[stem] = value
    currentQuestion!.lastUpdated = new Date()

    this._store.updateStore({ currentQuestion })
  }
}
