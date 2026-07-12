import { Component, computed, ElementRef, HostListener, inject, model, viewChild } from '@angular/core';
import { Store } from '../../../store/store';
import { AnswerTools } from '../../answer-tools/answer-tools';
import { QuestionTools } from '../../question-tools/question-tools';
import { HotToastService } from '@ngxpert/hot-toast';
import { EventService } from '../../../services/event';
import { SafeHtmlPipe } from '../../../utils/safe-html.pipe';


@Component({
  selector: 'app-short-text',
  imports: [QuestionTools, AnswerTools, SafeHtmlPipe],
  templateUrl: './short-text.html',
  styleUrl: './short-text.css',
})
export class ShortText {
  private _store = inject(Store)
  private _toast = inject(HotToastService)
  private _eventService = inject(EventService)

  input = viewChild<ElementRef>('input')
  fontSize = model<number>()
  store = computed(() => this._store.store())


  @HostListener('document:copy', ['$event'])
  onCopy(event: ClipboardEvent): void {
    if (!this.store().currentQuestion!.allow_copy) {
      this._toast.warning('You are not allowed to copy')
      event.preventDefault();
    }
  }

  @HostListener('document:cut', ['$event'])
  onCut(event: ClipboardEvent): void {
    if (!this.store().currentQuestion!.allow_copy) {
      this._toast.warning('You are not allowed to cut')
      event.preventDefault();
    }
  }

  @HostListener('document:paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    if (!this.store().currentQuestion!.allow_copy) {
      this._toast.warning('You are not allowed to paste')
      event.preventDefault();
    }
  }

  captureResponses(input: HTMLTextAreaElement) {
    const currentQuestion = this.store().currentQuestion;
    if (!currentQuestion) {
      return;
    }

    let value = input.value;

    if (currentQuestion.numerical) {
      // Only allow numbers (digits, decimal, and minus sign)
      const cleanValue = value.replace(/[^0-9.-]/g, '');
      if (value !== cleanValue) {
        input.value = cleanValue;
        value = cleanValue;
      }

      // Enforce max length
      const maxLength = typeof currentQuestion.max_length === 'number' ? currentQuestion.max_length : 0;
      if (maxLength > 0 && value.length > maxLength) {
        this._toast.warning("You've reached the maximum length limit");
        input.value = currentQuestion.responses[0] || '';
        return;
      }
    } else {
      // Enforce max words
      let words = value.trim().split(/\s+/).filter(Boolean);
      const maxWords = typeof currentQuestion.max_words === 'number' ? currentQuestion.max_words : 0;
      if (maxWords > 0 && words.length > maxWords) {
        this._toast.warning("You've reached the maximum word limit");
        input.value = currentQuestion.responses[0] || '';
        return;
      }
    }

    currentQuestion.responses[0] = value;
    currentQuestion.lastUpdated = new Date();

    this._store.updateStore({ currentQuestion });
  }
}
