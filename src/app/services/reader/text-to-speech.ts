import { Injectable, computed, inject, signal } from '@angular/core';
import { Store } from '../../store/store';
import { AccessibilitySupport, AlphabetList, ItemType } from '../../store/model/types';
import { SpeechParserService } from './speech-parser';

@Injectable({
  providedIn: 'root'
})  
export class TextToSpeechService {
  private _store = inject(Store);
  private _speechParser = inject(SpeechParserService);
  
  public isTextToSpeechEnabled = computed(() => this._store.store().loginData?.candidate_data?.accessibility_support?.toUpperCase() === AccessibilitySupport.YES ? true : true);
  public isSpeechRuleEngineEnabled = signal(true);
  public isEmphasisParsingEnabled = signal(true);
  private alphabetList: typeof AlphabetList = AlphabetList;
  private lastAnnouncedQuestionId: string | null = null;
  private hasAnnouncedWelcome = false;

  public stop(): void {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  public speak(message: string): void {
    if (!this.isTextToSpeechEnabled()) {
      return;
    }

    this.stop();

    if ('speechSynthesis' in window) {
      // Split the message by our injected speed markers
      const chunks = message.split(/(\[SLOW\]|\[NORMAL\])/);
      let currentRate = 1.0;

      for (const chunk of chunks) {
        if (chunk === '[SLOW]') {
          currentRate = 0.75; // Slower rate for math equations
        } else if (chunk === '[NORMAL]') {
          currentRate = 1.0; // Return to normal rate
        } else if (chunk.trim().length > 0) {
          const utterance = new SpeechSynthesisUtterance(chunk);
          utterance.rate = currentRate;
          utterance.pitch = 1.0;
          window.speechSynthesis.speak(utterance);
        }
      }
    } else {
      console.warn('Text-to-Speech is not supported in this browser.');
    }
  }

  private getSupportedMode(itemType: ItemType | string): 'FULL' | 'QUESTION_ONLY' | 'SKIP' {
    const type = itemType as ItemType;
    if ([ItemType.MCQ, ItemType.MRQ, ItemType.TRUE_FALSE, ItemType.YES_NO].includes(type)) {
      return 'FULL';
    }
    if ([
      ItemType.ESSAY_PLAIN_TEXT, 
      ItemType.ESSAY_RICH_TEXT, 
      ItemType.SHORT_TEXT, 
      ItemType.IMAGE_DRAG_AND_DROP, 
      ItemType.CLOZE_TEXT_IMAGE, 
      ItemType.CLOZE_DROPDOWN_IMAGE
    ].includes(type)) {
      return 'QUESTION_ONLY';
    }
    return 'SKIP';
  }

  private isSupportedItemType(itemType: ItemType | string): boolean {
    return this.getSupportedMode(itemType) !== 'SKIP';
  }

  public announceWelcomeMessage(): void {
    const message = "Hello, welcome to the exam. " +
      "Here is a quick guide on how to navigate using shortcuts. " +
      "To read the current question, press letter Q. " +
      "To read the options, press letter O. " +
      "To select an answer, press the corresponding option letter, for example A, B, or C. " +
      "To navigate to the next question, press letter N. " +
      "To navigate to the previous question, press letter P. " +
      "To get started, press letter Q to read the current question.";
      
    this.speak(message);
    this.hasAnnouncedWelcome = true;
  }

  public autoAnnounceQuestion(): void {
    const question = this._store.store().currentQuestion;
    const section = this._store.store().currentSection;
    
    if (question && section && question.id !== this.lastAnnouncedQuestionId) {
      this.lastAnnouncedQuestionId = question.id;

      if (!this.hasAnnouncedWelcome) {
        this.hasAnnouncedWelcome = true;
        setTimeout(() => {
          this.announceWelcomeMessage();
        }, 1000);
      } else {
        if (!this.isSupportedItemType(question.item_type)) {
          this.stop()
          return;
        }
        setTimeout(() => {
          this.announceCurrentQuestion();
        }, 500);
      }
    }
  }

  public async announceCurrentQuestion(): Promise<void> {
    const question = this._store.store().currentQuestion;
    const section = this._store.store().currentSection;
    const index = this._store.store().currentQuestionIndex;

    if (!question) return;

    const mode = this.getSupportedMode(question.item_type);
    if (mode === 'SKIP') {
      this.stop();
      return;
    }

    let announcement = `${section?.name}, Question ${index + 1}. `;
    
    announcement += await this.buildPassageAndStimulus(question);
    announcement += this.buildImageDescription(question);

    if (mode === 'FULL') {
      const optionsResult = await this.buildOptionsText(question);
      announcement += optionsResult.text;
      announcement += this.buildSelectedResponsesText(question, optionsResult.letters);
    }

    this.speak(announcement);
  }

  public async announceCurrentOptions(): Promise<void> {
    const question = this._store.store().currentQuestion;
    if (!question || !question.options || this.getSupportedMode(question.item_type) !== 'FULL') return;

    const optionsResult = await this.buildOptionsText(question);
    let announcement = optionsResult.text;
    
    if (optionsResult.letters.length > 0) {
      announcement += `Press ${optionsResult.letters.join(' or ')} to select an answer. `;
    }
    
    this.speak(announcement);
  }

  private async buildPassageAndStimulus(question: any): Promise<string> {
    let stimulusText = '';
    let passageText = '';

    if (this.isSpeechRuleEngineEnabled()) {
      stimulusText = await this._speechParser.parseHtmlForSpeech(question.stimulus || '', this.isEmphasisParsingEnabled());
      passageText = await this._speechParser.parseHtmlForSpeech(question.passage_stimulus || '', this.isEmphasisParsingEnabled());
    } else {
      stimulusText = question.stimulus?.replace(/<[^>]*>?/gm, ' ').trim() || '';
      passageText = question.passage_stimulus?.replace(/<[^>]*>?/gm, ' ').trim() || '';
    }

    let result = '';
    if (passageText) result += passageText + '. ';
    if (stimulusText) result += stimulusText + '. ';
    return result;
  }

  private buildImageDescription(question: any): string {
    if ([ItemType.CLOZE_TEXT_IMAGE, ItemType.CLOZE_DROPDOWN_IMAGE, ItemType.IMAGE_DRAG_AND_DROP].includes(question.item_type as ItemType)) {
      const img = document.querySelector('.answer-space img') as HTMLImageElement;
      if (img && img.alt) {
        return `Image description: ${img.alt}. `;
      }
    }
    return '';
  }

  private async buildOptionsText(question: any): Promise<{ text: string, letters: string[] }> {
    let optionsAnnouncement = '';
    let letters: string[] = [];
    
    if (!question.options) return { text: optionsAnnouncement, letters };

    for (let idx = 0; idx < question.options.length; idx++) {
      const opt = question.options[idx];
      let optText = '';
      if (this.isSpeechRuleEngineEnabled()) {
        optText = await this._speechParser.parseHtmlForSpeech(opt.label || '', this.isEmphasisParsingEnabled());
      } else {
        optText = opt.label?.replace(/<[^>]*>?/gm, ' ').trim() || '';
      }
      const cleanLetter = this.alphabetList[idx].replace(/[\(\)]/g, '');
      letters.push(cleanLetter);
      optionsAnnouncement += `Option ${cleanLetter} is "${optText}". `;
    }
    return { text: optionsAnnouncement, letters };
  }

  private buildSelectedResponsesText(question: any, letters: string[]): string {
    if (question.responses && question.responses.length > 0) {
      const answeredLetters: string[] = [];
      for (const response of question.responses) {
        const optIndex = question.options.findIndex((o: any) => o.value === response);
        if (optIndex !== -1) {
          answeredLetters.push(this.alphabetList[optIndex].replace(/[\(\)]/g, ''));
        }
      }
      if (answeredLetters.length > 0) {
        return `You have currently selected option ${answeredLetters.join(' and ')}. `;
      }
    }
    
    if (letters.length > 0) {
      return `Press ${letters.join(' or ')} to select an answer. `;
    }
    return '';
  }

  public announceFeedback(message: string): void {
    this.speak(message);
  }
}
