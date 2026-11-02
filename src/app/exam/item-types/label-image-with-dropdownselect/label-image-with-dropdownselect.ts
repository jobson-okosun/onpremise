import { Component, computed, ElementRef, inject, model, signal, viewChild } from '@angular/core';
import { Store } from '../../../store/store';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { AnswerTools } from '../../answer-tools/answer-tools';
import { QuestionTools } from '../../question-tools/question-tools';
import { EventService } from '../../../services/event';
import { CandidateEventType } from '../../../store/model/events/events.enum';
import { SafeHtmlPipe } from '../../../utils/safe-html.pipe';


@Component({
  selector: 'app-label-image-with-dropdownselect',
  imports: [QuestionTools, AnswerTools, CdkDrag, SafeHtmlPipe],
  templateUrl: './label-image-with-dropdownselect.html',
  styleUrl: './label-image-with-dropdownselect.css',
})
export class LabelImageWithDropdownselect {
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

    const oldAnswers = [...currentQuestion.responses];
    
    if (oldAnswers[index] === value) {
      return;
    }

    currentQuestion.responses[index] = value;

    const oldAnswer = oldAnswers[index];
    const hasOldAnswer = oldAnswer !== undefined && oldAnswer !== null && oldAnswer !== '';

    this._eventService.logEvent({
      event_type: hasOldAnswer
        ? (!value ? CandidateEventType.ANSWER_CLEARED : CandidateEventType.ANSWER_CHANGED)
        : CandidateEventType.ANSWER_SELECTED,
      question_id: currentQuestion.id,
      section_id: this.store().currentSection!.id,
      answer: value ? value.toString() : null,
      old_answer: hasOldAnswer ? oldAnswer.toString() : null
    });
    currentQuestion.lastUpdated = new Date();

    this._store.updateStore({ currentQuestion });
  }
}
