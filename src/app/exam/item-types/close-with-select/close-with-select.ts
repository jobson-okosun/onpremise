import { Component, computed, inject, model, signal } from '@angular/core';
import { Store } from '../../../store/store';
import { AnswerTools } from '../../answer-tools/answer-tools';
import { QuestionTools } from '../../question-tools/question-tools';
import { AlphabetList } from '../../../store/model/types';

@Component({
  selector: 'app-close-with-select',
  imports: [AnswerTools, QuestionTools],
  templateUrl: './close-with-select.html',
  styleUrl: './close-with-select.css',
})
export class CloseWithSelect {
  private _store = inject(Store);

  store = computed(() => this._store.store());
  fontSize = model(16);
  clozeRenderArray = signal<{ text: string; dropBox: boolean }[]>([]);
  alphabetList: typeof AlphabetList = AlphabetList;
  
  ngOnInit() {
    this.formatStimulus();
  }

  formatStimulus() {
    const currentQuestion = this.store().currentQuestion;
    if (!currentQuestion?.stimulus) {
      return
    }

    const parts = currentQuestion.stimulus.split('{{response}}');
    const arr: { text: string; dropBox: boolean; }[] = [];

    parts.forEach((text, i) => {
      if (i == parts.length - 1) {
        const entry = { text: text, dropBox: false };
        arr.push(entry);
      } else {
        const entry = { text: text, dropBox: true };
        arr.push(entry);
      }
    });

    this.clozeRenderArray.set(arr);
  }


  captureResponses(index: number, value: string) {
    const currentQuestion = this.store().currentQuestion;
    if (!currentQuestion) {
      return
    };

    currentQuestion.responses[index] = value;
    currentQuestion!.lastUpdated = new Date()

    this._store.updateStore({ currentQuestion })
  }
}
