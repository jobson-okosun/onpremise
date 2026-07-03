import { Component, computed, inject, input, model, signal } from '@angular/core';
import { ExamService } from '../../services/exam';
import { Store } from '../../store/store';
import { ItemType } from '../../store/model/types';
import { CandidateEventType } from '../../store/model/events/events.enum';
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
    const oldAnswers = [...currentQuestion!.responses];
    currentQuestion!.responses = []

    this._store.updateStore({ currentQuestion })

    this._eventService.logEvent({
      event_type: CandidateEventType.ANSWER_CLEARED,
      question_id: this.store().currentQuestion!.id,
      section_id: this.store().currentSection!.id,
      answer: null,
      old_answer: oldAnswers.length ? oldAnswers.join(',') : null
    })
  }
}
