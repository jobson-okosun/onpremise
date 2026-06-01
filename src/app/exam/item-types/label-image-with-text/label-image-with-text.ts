import { Component, computed, ElementRef, inject, model, signal, viewChild } from '@angular/core';
import { Store } from '../../../store/store';
import { QuestionTools } from '../../question-tools/question-tools';
import { AnswerTools } from '../../answer-tools/answer-tools';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { EventService } from '../../../services/event';
import { UsageEvents } from '../../../store/model/types';

@Component({
  selector: 'app-label-image-with-text',
  imports: [QuestionTools, AnswerTools, CdkDrag],
  templateUrl: './label-image-with-text.html',
  styleUrl: './label-image-with-text.css',
})
export class LabelImageWithText {
  private _store = inject(Store)
  private _eventService = inject(EventService)

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

    this._eventService.logEvent({
      event_type: currentQuestion!.responses[index] ? UsageEvents.ANSWER_SELECTED_CHANGED : UsageEvents.ANSWER_SELECTED,
      current_question_id: this.store().currentQuestion?.id,
      current_section_id: this.store().currentSection?.id,
      timestamp: new Date()
    })

    currentQuestion.responses[index] = value;
    currentQuestion.lastUpdated = new Date()

    this._store.updateStore({ currentQuestion })
  }
}
