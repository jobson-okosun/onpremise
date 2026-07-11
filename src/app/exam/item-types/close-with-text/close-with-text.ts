import { Component, computed, inject, model, signal, viewChild, viewChildren, ElementRef, AfterViewChecked, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { Store } from '../../../store/store';
import { QuestionTools } from '../../question-tools/question-tools';
import { AnswerTools } from '../../answer-tools/answer-tools';
import { SafeHtmlPipe } from '../../../utils/safe-html.pipe';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-close-with-text',
  imports: [QuestionTools, AnswerTools, SafeHtmlPipe],
  templateUrl: './close-with-text.html',
  styleUrl: './close-with-text.css',
})
export class CloseWithText implements OnInit, AfterViewChecked, OnDestroy {
  private _store = inject(Store);
  private renderer = inject(Renderer2);
  
  store = computed(() => this._store.store());
  fontSize = model(16);
  
  formattedStimulus = signal<string>('');

  contentContainer = viewChild<ElementRef>('contentContainer');
  dropdowns = viewChildren<ElementRef>('clozeDropdown');

  private responseSubject = new Subject<{index: number, value: string}>();
  private subscription?: Subscription;

  ngOnInit() {
    this.formatStimulus();
    this.subscription = this.responseSubject.pipe(
      debounceTime(500)
    ).subscribe(({index, value}) => {
      this.saveResponse(index, value);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  formatStimulus() {
    const currentQuestion = this.store().currentQuestion;
    if (!currentQuestion?.stimulus) {
      return
    }

    let stim = currentQuestion.stimulus;
    let i = 0;
    while (stim.includes('{{response}}')) {
       stim = stim.replace('{{response}}', `<span class="cloze-placeholder inline-flex align-middle" data-index="${i}"></span>`);
       i++;
    }

    this.formattedStimulus.set(stim);
    this.clozeRenderArray.set(Array.from({ length: i }, (_, idx) => idx));
  }

  clozeRenderArray = signal<number[]>([]);

  ngAfterViewChecked() {
    const container = this.contentContainer()?.nativeElement;
    const drops = this.dropdowns();

    if (container && drops.length > 0) {
      const placeholders = container.querySelectorAll('.cloze-placeholder');
      placeholders.forEach((placeholder: HTMLElement, i: number) => {
        const dropEl = drops[i]?.nativeElement;
        if (dropEl && !placeholder.contains(dropEl)) {
          this.renderer.appendChild(placeholder, dropEl);
        }
      });
    }
  }

  captureResponses(index: number, value: string) {
    this.responseSubject.next({index, value});
  }

  saveResponse(index: number, value: string) {
    const currentQuestion = this.store().currentQuestion;
    if (!currentQuestion) {
      return
    };

    currentQuestion.responses[index] = value;
    currentQuestion!.lastUpdated = new Date()

    this._store.updateStore({ currentQuestion })
  }
}
