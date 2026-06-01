import { Component, computed, inject, model, signal } from '@angular/core';
import { Store } from '../../../store/store';
import { QuestionTools } from '../../question-tools/question-tools';
import { AnswerTools } from '../../answer-tools/answer-tools';

@Component({
  selector: 'app-close-with-text',
  imports: [QuestionTools, AnswerTools],
  templateUrl: './close-with-text.html',
  styleUrl: './close-with-text.css',
})
export class CloseWithText {
  private _store = inject(Store);
  
  store = computed(() => this._store.store());
  fontSize = model(16);
  clozeRenderArray = signal<{ text: string; dropBox: boolean }[]>([]);

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
