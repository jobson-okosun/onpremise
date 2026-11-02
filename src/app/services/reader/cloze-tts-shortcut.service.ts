import { Injectable, inject, signal } from '@angular/core';
import { ExamSpeechService } from './exam-speech.service';
import { Store } from '../../store/store';
import { AlphabetList } from '../../store/model/types';
import { ExamService } from '../exam';
import { normalizeForSpeech, SpeechChunk } from './speech/normalizer';

@Injectable()
export class ClozeTtsShortcutService {
  private _tts = inject(ExamSpeechService);
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

    const chunks: SpeechChunk[] = [];
    if (prefixMessage) {
      chunks.push(...normalizeForSpeech(prefixMessage));
    }
    chunks.push({ text: `Options for Blank ${activeIndex + 1} are:`, pauseAfterMs: 200 });

    const letters: string[] = [];
    possibleResponses.forEach((opt: any, idx: number) => {
      let cleanLetter = '';
      if (this.alphabetList && this.alphabetList[idx]) {
        cleanLetter = this.alphabetList[idx].replace(/[()]/g, '');
      } else {
        cleanLetter = String.fromCharCode(65 + idx);
      }
      letters.push(cleanLetter);

      chunks.push({ text: `Option ${cleanLetter}.`, pauseAfterMs: 150 });
      const optChunks = normalizeForSpeech(opt.label || '');
      if (optChunks.length) {
        optChunks[optChunks.length - 1].pauseAfterMs = 350;
      }
      chunks.push(...optChunks);
    });

    chunks.push({
      text: `Press ${letters.join(' or ')} to select an answer for Blank ${activeIndex + 1}.`,
      pauseAfterMs: 200,
    });

    this._tts.play(chunks);
  }
}
