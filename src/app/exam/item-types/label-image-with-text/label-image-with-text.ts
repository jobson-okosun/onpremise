import { Component, computed, ElementRef, inject, model, signal, viewChild, OnInit, OnDestroy } from '@angular/core';
import { Store } from '../../../store/store';
import { QuestionTools } from '../../question-tools/question-tools';
import { AnswerTools } from '../../answer-tools/answer-tools';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { EventService } from '../../../services/event';
import { SafeHtmlPipe } from '../../../utils/safe-html.pipe';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-label-image-with-text',
  imports: [QuestionTools, AnswerTools, CdkDrag, SafeHtmlPipe],
  templateUrl: './label-image-with-text.html',
  styleUrl: './label-image-with-text.css',
})
export class LabelImageWithText implements OnInit, OnDestroy {
  private _store = inject(Store)
  private _eventService = inject(EventService)

  input = viewChild<ElementRef>('input')
  fontSize = model<number>()
  store = computed(() => this._store.store())
  zoom = signal(1); 

  private responseSubject = new Subject<{index: number, value: string}>();
  private subscription?: Subscription;

  ngOnInit() {
    this.subscription = this.responseSubject.pipe(
      debounceTime(500)
    ).subscribe(({index, value}) => {
      this.saveResponse(index, value);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  captureResponses(index: number, value: string) {
    this.responseSubject.next({index, value});
  }

  saveResponse(index: number, value: string) {
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
