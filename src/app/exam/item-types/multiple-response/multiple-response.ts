import { Component, computed, inject, linkedSignal, model } from '@angular/core';
import { Store } from '../../../store/store';
import { ExamService } from '../../../services/exam';
import { AlphabetList } from '../../../store/model/types';
import { CandidateEventType } from '../../../store/model/events/events.enum';
import { QuestionTools } from '../../question-tools/question-tools';
import { AnswerTools } from '../../answer-tools/answer-tools';
import { EventService } from '../../../services/event';
import { SafeHtmlPipe } from '../../../utils/safe-html.pipe';


@Component({
  selector: 'app-multiple-response',
  imports: [QuestionTools, AnswerTools, SafeHtmlPipe],
  templateUrl: './multiple-response.html',
  styleUrl: './multiple-response.css',
})
export class MultipleResponse {
  private _store = inject(Store);
  private _exam = inject(ExamService);
  private _eventService = inject(EventService)


  private multipleResponseAnswers = linkedSignal(() => this._store.store().currentQuestion?.responses!);
  protected maxResponses = computed(() => {
    const max = this.store().currentQuestion?.max_responses;
    return max == null ? undefined : max;
  });
  protected selectedAnswersCount = computed(() => this.store().currentQuestion!.responses.length);
  protected isMaxResponsesReached = computed(() => {
    return this.maxResponses() !== undefined && this.selectedAnswersCount() >= this.maxResponses()!;
  });


  fontSize = model<number>();
  store = computed(() => this._store.store());
  alphabetList: typeof AlphabetList = AlphabetList;

  selectOption(value: string) {
    const oldAnswers = [...(this.store().currentQuestion?.responses || [])];

    this.multipleResponseAnswers.update((answers: string[]) => {
      if (!answers.includes(value)) {
        return [...answers, value];
      }

      answers.splice(answers.indexOf(value), 1);
      return [...answers];
    });
    

    const newAnswers = this.multipleResponseAnswers();
    this.store().currentQuestion!.responses = newAnswers;
    this.store().currentQuestion!.lastUpdated = new Date()

    this._store.updateStore({ currentQuestion: this.store().currentQuestion });

    const isAdding = !oldAnswers.includes(value);

    const answerIndex = this.store().currentQuestion!.options.findIndex(opt => opt.value === value).toString();
    const oldAnswerIndices = oldAnswers.length ? oldAnswers.map(ans => this.store().currentQuestion!.options.findIndex(opt => opt.value === ans)).join(',') : null;

    this._eventService.logEvent({
      event_type: isAdding ? CandidateEventType.ANSWER_SELECTED : CandidateEventType.ANSWER_CLEARED,
      question_id: this.store().currentQuestion!.id,
      section_id: this.store().currentSection!.id,
      answer: answerIndex,
      old_answer: oldAnswerIndices
    })
  }
}
