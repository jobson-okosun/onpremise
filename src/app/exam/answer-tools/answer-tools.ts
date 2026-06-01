import { Component, computed, inject, input, model, signal } from '@angular/core';
import { ExamService } from '../../services/exam';
import { Store } from '../../store/store';
import { ItemType, UsageEvents } from '../../store/model/types';
import { EventService } from '../../services/event';


@Component({
  selector: 'app-answer-tools',
  imports: [],
  templateUrl: './answer-tools.html',
  styleUrl: './answer-tools.css',
})
export class AnswerTools {
  private _exam = inject(ExamService)
  private _store = inject(Store)
  private _eventService = inject(EventService)

  itemTypes = signal(ItemType);
  store = computed(() => this._store.store())
  currentQuestionIndex = computed(() => this.store().currentQuestionIndex)
  currentSectionSummary = computed(() => this._exam.currentSectionSummary())
  showClearAnwer = input(true)
  isExamAlpha = computed(() => this._exam.isExamAlpha())

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

    this._eventService.logEvent({
      event_type: UsageEvents.ANSWER_CLEARED,
      current_question_id: this.store().currentQuestion?.id,
      current_section_id: this.store().currentSection?.id,
      timestamp: new Date()
    })
  }
}
