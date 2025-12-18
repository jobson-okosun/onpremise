import { Component, computed, effect, inject, linkedSignal, model, signal } from '@angular/core';
import { Store } from '../../../store/store';
import { ExamService } from '../../../services/exam';
import { AlphabetList } from '../../../store/model/types';
import { QuestionTools } from '../../question-tools/question-tools';
import { AnswerTools } from '../../answer-tools/answer-tools';

@Component({
  selector: 'app-multiple-response',
  imports: [QuestionTools, AnswerTools],
  templateUrl: './multiple-response.html',
  styleUrl: './multiple-response.css',
})
export class MultipleResponse {
  private _store = inject(Store);
  private _exam = inject(ExamService);
  private multipleResponseAnswers = linkedSignal(() => this._store.store().currentQuestion?.responses!);
  protected maxResponses = computed(() => this.store().currentQuestion?.max_responses);
  protected selectedAnswersCount = computed(() => this.store().currentQuestion?.responses.length);
  protected isMaxResponsesReached = computed( () => this.maxResponses() === this.selectedAnswersCount());

  fontSize = model<number>();
  store = computed(() => this._store.store());
  alphabetList: typeof AlphabetList = AlphabetList;

  selectOption(value: string) {

    this.multipleResponseAnswers.update((answers: string[]) => {
      if (!answers.includes(value)) {
        return [...answers, value];
      }

      answers.splice(answers.indexOf(value), 1);
      return [...answers];
    });

    this.store().currentQuestion!.responses = this.multipleResponseAnswers();
    this.store().currentQuestion!.lastUpdated = new Date()
    
    this._store.updateStore({ currentQuestion: this.store().currentQuestion });
  }
}
