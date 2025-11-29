import { Component, computed, inject, model } from '@angular/core';
import { ExamService } from '../../../services/exam';
import { Store } from '../../../store/store';
import { QuestionTools } from '../../question-tools/question-tools';
import { AnswerTools } from '../../answer-tools/answer-tools';
import { AlphabetList } from '../../../store/model/types';

@Component({
  selector: 'app-single-choice',
  imports: [QuestionTools, AnswerTools],
  templateUrl: './single-choice.html',
  styleUrl: './single-choice.css',
})
export class SingleChoice {
  private _store = inject(Store)

  fontSize = model<number>()
  store = computed(() => this._store.store())
  alphabetList: typeof AlphabetList = AlphabetList;

  selectOption(value: any) {
    const currentQuestion = this.store().currentQuestion;
    if (!currentQuestion) {
      return
    };
    
    currentQuestion!.responses[0] = value
    currentQuestion!.lastUpdated = new Date()

    this._store.updateStore({ currentQuestion })
  }
}
