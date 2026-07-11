import { Component, computed, inject, model, signal, viewChild, viewChildren, ElementRef, AfterViewChecked, Renderer2 } from '@angular/core';
import { Store } from '../../../store/store';
import { QuestionTools } from '../../question-tools/question-tools';
import { AnswerTools } from '../../answer-tools/answer-tools';
import { CandidateEventType } from '../../../store/model/events/events.enum';
import { EventService } from '../../../services/event';
import { SafeHtmlPipe } from '../../../utils/safe-html.pipe';


@Component({
  selector: 'app-close-with-dropdown',
  imports: [QuestionTools, AnswerTools, SafeHtmlPipe],
  templateUrl: './close-with-dropdown.html',
  styleUrl: './close-with-dropdown.css',
})
export class CloseWithDropdown implements AfterViewChecked {
  private _store = inject(Store);
  private _eventService = inject(EventService);
  private renderer = inject(Renderer2);

  store = computed(() => this._store.store());
  fontSize = model(16);
  
  formattedStimulus = signal<string>('');

  contentContainer = viewChild<ElementRef>('contentContainer');
  dropdowns = viewChildren<ElementRef>('clozeDropdown');

  ngOnInit() {
    this.formatStimulus();
  }

  formatStimulus() {
    const currentQuestion = this.store().currentQuestion;
    if (!currentQuestion?.stimulus) {
      return;
    }

    let stim = currentQuestion.stimulus;
    let i = 0;
    while (stim.includes('{{response}}')) {
       // Replace each occurrence sequentially with an incrementing index
       stim = stim.replace('{{response}}', `<span class="cloze-placeholder inline-flex align-middle" data-index="${i}"></span>`);
       i++;
    }

    this.formattedStimulus.set(stim);
  }

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

    const possibleResponses = currentQuestion.possible_responses?.[index]?.responses || [];
    const answerIndex = value ? possibleResponses.findIndex((opt: any) => opt.value === value).toString() : '';

    const oldAnswerIndices = oldAnswers.map((ans, idx) => {
      if (!ans) return '';
      const pr = currentQuestion.possible_responses?.[idx]?.responses || [];
      return pr.findIndex((opt: any) => opt.value === ans).toString();
    }).join(',');

    this._eventService.logEvent({
      event_type: hasOldAnswer ? CandidateEventType.ANSWER_CHANGED : CandidateEventType.ANSWER_SELECTED,
      question_id: currentQuestion.id,
      section_id: this.store().currentSection!.id,
      answer: answerIndex,
      old_answer: oldAnswerIndices
    });

    currentQuestion!.lastUpdated = new Date()

    this._store.updateStore({ currentQuestion })
  }
}
