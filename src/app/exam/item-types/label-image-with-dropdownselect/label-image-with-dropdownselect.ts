import { Component, computed, ElementRef, HostListener, inject, model, signal, viewChild } from '@angular/core';
import { Store } from '../../../store/store';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { AnswerTools } from '../../answer-tools/answer-tools';
import { QuestionTools } from '../../question-tools/question-tools';

@Component({
  selector: 'app-label-image-with-dropdownselect',
  imports: [QuestionTools, AnswerTools, CdkDrag],
  templateUrl: './label-image-with-dropdownselect.html',
  styleUrl: './label-image-with-dropdownselect.css',
})
export class LabelImageWithDropdownselect {
  private _store = inject(Store)

  input = viewChild<ElementRef>('input')
  fontSize = model<number>()
  store = computed(() => this._store.store())
  zoom = signal(1);

  captureResponses(index: number, value: string) {
    if (!value || index == undefined || index == null) {
      value = ''
    }

    const currentQuestion = this.store().currentQuestion;
    if (!currentQuestion) {
      return
    };

    currentQuestion.responses[index] = value;
    currentQuestion.lastUpdated = new Date()

    this._store.updateStore({ currentQuestion })
  }
}
