import { Component, computed, inject, input, model, signal } from '@angular/core';
import { ExamService } from '../../services/exam';
import { Store } from '../../store/store';
import { ItemType } from '../../store/model/types';

@Component({
  selector: 'app-answer-tools',
  imports: [],
  templateUrl: './answer-tools.html',
  styleUrl: './answer-tools.css',
})
export class AnswerTools {
  private _exam = inject(ExamService)
  private _store = inject(Store)

  itemTypes = signal(ItemType);
  store = computed(() => this._store.store())
  currentQuestionIndex = computed(() => this.store().currentQuestionIndex)
  currentSectionSummary = computed(() => this._exam.currentSectionSummary())
  showClearAnwer = input(true)

  wordCount = computed(() => {
    const str = this.store().currentQuestion?.responses[0] ?? ''
    return str.split(/\s+/).filter(word => word.length).length
  })

  maxWords = computed(() => {
    const max = this.store().currentQuestion?.max_words;
    return max && max > 0 ? max : '∞';
  });

  zoom = model(1); 

  clearAnwser() {
    const currentQuestion = this.store().currentQuestion
    currentQuestion!.responses = []

    this._store.updateStore({ currentQuestion })
  }
}
