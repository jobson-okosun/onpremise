import { Injectable, computed, inject, signal } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Store } from '../../store/store';
import { AccessibilitySupport, AlphabetList, ItemType } from '../../store/model/types';

@Injectable({
  providedIn: 'root'
})
export class ScreenReaderService {
  private liveAnnouncer = inject(LiveAnnouncer);
  private _store = inject(Store);
  
  public isScreenReaderModeEnabled = computed(() => this._store.store().loginData?.candidate_data?.accessibility_support?.toUpperCase() === AccessibilitySupport.YES ? true : false);
  private lastAnnouncedQuestionId: string | null = null;
  private hasAnnouncedWelcome = false;
  private alphabetList: typeof AlphabetList = AlphabetList;

  public announce(message: string, politeness: 'polite' | 'assertive' = 'polite'): void {
    if (this.isScreenReaderModeEnabled()) {
      this.liveAnnouncer.announce(message, politeness);
    }
  }

  private isSupportedItemType(itemType: ItemType | string): boolean {
    return [ItemType.MCQ, ItemType.MRQ, ItemType.YES_NO, ItemType.TRUE_FALSE].includes(itemType as ItemType);
  }

  private getWelcomeMessage(): string {
    return "Hello, welcome to the exam. " +
      "Here is a quick guide on how to use the screen reader shortcuts. " +
      "To read the options, press Alt plus Shift plus O. " +
      "To select an answer, press Alt plus Shift plus the corresponding option letter. " +
      "To navigate to the next question, press Alt plus Shift plus N. " +
      "To navigate to the previous question, press Alt plus Shift plus P. " +
      "To get started, press Alt plus Shift plus Q to read the current question.";
  }

  public autoAnnounceQuestion(): void {
    const question = this._store.store().currentQuestion;
    const section = this._store.store().currentSection;
    
    if (question && section && question.id !== this.lastAnnouncedQuestionId) {
      this.lastAnnouncedQuestionId = question.id;

      if (!this.isSupportedItemType(question.item_type)) {
        return;
      }

      if (!this.hasAnnouncedWelcome) {
        this.hasAnnouncedWelcome = true;
        setTimeout(() => {
          this.announce(this.getWelcomeMessage(), 'assertive');
        }, 4000);
      } else {
        setTimeout(() => {
          this.announceCurrentQuestion();
        }, 500);
      }
    }
  }

  public announceCurrentQuestion(): void {
    const question = this._store.store().currentQuestion;
    const section = this._store.store().currentSection;
    const index = this._store.store().currentQuestionIndex;

    if (!question || !this.isSupportedItemType(question.item_type)) return;

    const stimulusText = question.stimulus?.replace(/<[^>]*>?/gm, '').trim();
    const passageText = question.passage_stimulus?.replace(/<[^>]*>?/gm, '').trim() || '';
    
    let announcement = `${section?.name}, Question ${index + 1}. `;
    if (passageText) announcement += passageText + '. ';
    if (stimulusText) announcement += stimulusText + '. ';
    
    if (question.options) {
      let letters: string[] = [];
      question.options.forEach((opt: any, idx: number) => {
        const optText = opt.label?.replace(/<[^>]*>?/gm, '').trim();
        const cleanLetter = this.alphabetList[idx].replace(/[\(\)]/g, ''); // Remove parentheses
        letters.push(cleanLetter);
        announcement += `Option ${cleanLetter} is "${optText}". `;
      });
      if (letters.length > 0) {
        announcement += `Press Alt Shift ${letters.join(' or ')} to select an answer. `;
      }
    }

    this.announce(announcement, 'assertive');
  }

  public announceCurrentOptions(): void {
    const question = this._store.store().currentQuestion;
    if (!question || !question.options || !this.isSupportedItemType(question.item_type)) return;

    let optionsAnnouncement = '';
    let letters: string[] = [];
    question.options.forEach((opt: any, index: number) => {
      const optText = opt.label?.replace(/<[^>]*>?/gm, '').trim();
      const cleanLetter = this.alphabetList[index].replace(/[\(\)]/g, '');
      letters.push(cleanLetter);
      optionsAnnouncement += `Option ${cleanLetter} is "${optText}". `;
    });
    if (letters.length > 0) {
      optionsAnnouncement += `Press Alt Shift ${letters.join(' or ')} to select an answer. `;
    }
    this.announce(optionsAnnouncement, 'assertive');
  }

  public handleSharedShortcuts(event: KeyboardEvent): boolean {
    if (!event.altKey || !event.shiftKey) return false;

    const question = this._store.store().currentQuestion;
    if (!question || !this.isSupportedItemType(question.item_type)) return false;

    if (event.key.toLowerCase() === 'q') {
      this.announceCurrentQuestion();
      return true;
    }

    if (event.key.toLowerCase() === 'o') {
      this.announceCurrentOptions();
      return true;
    }

    return false;
  }
}
