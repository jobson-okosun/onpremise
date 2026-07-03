import { Component, computed, ElementRef, inject, model, signal, viewChild } from '@angular/core';
import { Store } from '../../../store/store';
import { QuestionTools } from '../../question-tools/question-tools';
import { AnswerTools } from '../../answer-tools/answer-tools';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { EventService } from '../../../services/event';
import { CandidateEventType } from '../../../store/model/events/events.enum';

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

    // const oldAnswers = [...currentQuestion.responses];
    currentQuestion.responses[index] = value;

    // this._eventService.logEvent({
    //   event_type: oldAnswers[index] ? CandidateEventType.ANSWER_CHANGED : CandidateEventType.ANSWER_SELECTED,
    //   question_id: currentQuestion.id,
    //   section_id: this.store().currentSection!.id,
    //   answer: value,
    //   old_answer: oldAnswers.join(',')
    // })
    currentQuestion.lastUpdated = new Date()

    this._store.updateStore({ currentQuestion })
  }
}
