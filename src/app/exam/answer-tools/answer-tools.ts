import { Component, computed, inject, input } from '@angular/core';
import { ExamService } from '../../services/exam';
import { Store } from '../../store/store';

@Component({
  selector: 'app-answer-tools',
  imports: [],
  templateUrl: './answer-tools.html',
  styleUrl: './answer-tools.css',
})
export class AnswerTools {
  private _exam = inject(ExamService)
  private _store = inject(Store)

  store = computed(() => this._store.store())
  currentQuestionIndex = computed(() => this.store().currentQuestionIndex)
  currentSectionSummary = computed(() => this._exam.currentSectionSummary())
  showClearAnwer = input(true)

  clearAnwser() {
    const currentQuestion = this.store().currentQuestion
    currentQuestion!.responses = []
    
    this._store.updateStore({ currentQuestion })
  }
}
