import { Injectable, inject, signal } from '@angular/core';
import { TextToSpeechService } from './text-to-speech';
import { Store } from '../../store/store';
import { AlphabetList } from '../../store/model/types';
import { ExamService } from '../exam';

@Injectable()
export class ClozeTtsShortcutService {
  private _tts = inject(TextToSpeechService);
  private _store = inject(Store);
  private _exam = inject(ExamService);
  private alphabetList = AlphabetList;

  activeBlankIndex = signal<number>(0);

  private captureCallback!: (index: number, value: string) => void;
  private getBlanksCount!: () => number;

  init(captureCallback: (index: number, value: string) => void, getBlanksCount: () => number) {
    this.captureCallback = captureCallback;
    this.getBlanksCount = getBlanksCount;
  }

  handleKeyDown(event: KeyboardEvent) {
    if (!this._tts.isTextToSpeechEnabled()) return;
    if (this._exam.isProctoringNetworkRetryActive() || this._exam.isPermanentNetworkLossModalActive()) return;

    const target = event.target as HTMLElement;
    const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
    
    if (isInput) return;

    const currentQuestion = this._store.store().currentQuestion;
    if (!currentQuestion) return;

    const key = event.key.toLowerCase();
    const blanksCount = this.getBlanksCount();

    if (blanksCount === 0) return;

    if (key === 'arrowright') {
      event.preventDefault();
      event.stopImmediatePropagation();
      let nextIndex = this.activeBlankIndex() + 1;
      if (nextIndex >= blanksCount) nextIndex = 0; // Wrap around
      this.activeBlankIndex.set(nextIndex);
      this.announceOptionsForActiveBlank(`Switched to Blank ${nextIndex + 1}. `);
      return;
    }

    if (key === 'arrowleft') {
      event.preventDefault();
      event.stopImmediatePropagation();
      let prevIndex = this.activeBlankIndex() - 1;
      if (prevIndex < 0) prevIndex = blanksCount - 1; // Wrap around
      this.activeBlankIndex.set(prevIndex);
      this.announceOptionsForActiveBlank(`Switched to Blank ${prevIndex + 1}. `);
      return;
    }

    if (key === 'o') {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.announceOptionsForActiveBlank();
      return;
    }

    // Handle answer selection
    const letters = 'abcdefghijk';
    const index = letters.indexOf(key);
    
    if (index !== -1) {
      const activeIndex = this.activeBlankIndex();
      const possibleResponses = currentQuestion.possible_responses?.[activeIndex]?.responses || [];
      const option = possibleResponses[index];

      if (option) {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.captureCallback(activeIndex, option.value);
        this._tts.speak(`You selected option ${key.toUpperCase()} for Blank ${activeIndex + 1}.`);
      }
    }
  }

  private announceOptionsForActiveBlank(prefixMessage: string = '') {
    const currentQuestion = this._store.store().currentQuestion;
    if (!currentQuestion) return;

    const activeIndex = this.activeBlankIndex();
    const possibleResponses = currentQuestion.possible_responses?.[activeIndex]?.responses || [];

    if (possibleResponses.length === 0) return;

    let message = prefixMessage + `Options for Blank ${activeIndex + 1} are: `;
    const letters: string[] = [];

    possibleResponses.forEach((opt: any, idx: number) => {
      let cleanLetter = '';
      if (this.alphabetList && this.alphabetList[idx]) {
        cleanLetter = this.alphabetList[idx].replace(/[()]/g, '');
      } else {
        cleanLetter = String.fromCharCode(65 + idx); // fallback A, B, C...
      }
      
      letters.push(cleanLetter);
      const optText = opt.label?.replace(/<[^>]*>?/gm, ' ').trim() || '';
      message += `Option ${cleanLetter} is "${optText}". `;
    });

    message += `Press ${letters.join(' or ')} to select an answer for Blank ${activeIndex + 1}. `;
    this._tts.speak(message);
  }
}
