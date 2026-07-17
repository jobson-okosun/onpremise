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
  
  public normalSpeed = 0.75; 
  public slowSpeed = 0.65;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  
  // Custom queue logic to bypass browser bugs and enable rewinding
  private speechChunks: {text: string, rate: number}[] = [];
  private currentChunkIndex: number = 0;
  private currentCharIndex: number = 0;
  private isManualPause: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoice();
      window.speechSynthesis.onvoiceschanged = () => {
        this.initVoice();
      };
      
      // Global listener for Spacebar to pause/resume speech
      window.addEventListener('keydown', (event) => {
        const target = event.target as HTMLElement;
        const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
        if (isInput) return;

        if (event.key === ' ') {
          event.preventDefault();
          this.togglePause();
        }
      });
    }
  }

  private initVoice(): void {
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;
    
    // Fallback chain for a consistent female English voice across platforms (Chrome Android, Windows, Mac)
    this.selectedVoice = voices.find(v => v.name.includes('Google US English'))
        || voices.find(v => v.name.includes('Google UK English Female'))
        || voices.find(v => v.name.includes('Microsoft Zira'))
        || voices.find(v => v.name.includes('Samantha') || v.name.includes('Victoria'))
        || voices.find(v => v.lang.startsWith('en-') && v.name.toLowerCase().includes('female'))
        || voices.find(v => v.lang === 'en-US' || v.lang === 'en-GB')
        || voices[0];
  }

  public stop(): void {
    this.isManualPause = false;
    this.speechChunks = [];
    this.currentChunkIndex = 0;
    this.currentCharIndex = 0;
    
    if (this.currentUtterance) {
      this.currentUtterance.onend = null;
      this.currentUtterance.onboundary = null;
    }

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  public togglePause(): void {
    if (this.isManualPause) {
      this.isManualPause = false;
      
      if (this.speechChunks.length > 0 && this.currentChunkIndex < this.speechChunks.length) {
         let charsToRewind = 40; // Approx 3 seconds
         if (this.currentCharIndex >= charsToRewind) {
             this.currentCharIndex -= charsToRewind;
         } else {
             let remaining = charsToRewind - this.currentCharIndex;
             if (this.currentChunkIndex > 0) {
                 this.currentChunkIndex--;
                 this.currentCharIndex = Math.max(0, this.speechChunks[this.currentChunkIndex].text.length - remaining);
             } else {
                 this.currentCharIndex = 0;
             }
         }

         // Snap back to the beginning of a word
         const chunkText = this.speechChunks[this.currentChunkIndex].text;
         while (this.currentCharIndex > 0 && chunkText[this.currentCharIndex - 1] !== ' ') {
           this.currentCharIndex--;
         }
         
         this.playNextChunk();
      }
    } else {
      // PAUSE
      this.isManualPause = true;
      if (this.currentUtterance) {
         this.currentUtterance.onend = null; // Prevent race conditions
      }
      if (window.speechSynthesis) {
         window.speechSynthesis.cancel(); // Cancel clears the native queue instantly
      }
    }
  }

  private playNextChunk(): void {
    if (this.currentChunkIndex >= this.speechChunks.length) {
      this.isManualPause = false;
      return;
    }
    
    const chunk = this.speechChunks[this.currentChunkIndex];
    const textToSpeak = chunk.text.substring(this.currentCharIndex);
    
    if (textToSpeak.trim().length === 0) {
      this.currentChunkIndex++;
      this.currentCharIndex = 0;
      this.playNextChunk();
      return;
    }

    const baseCharIndex = this.currentCharIndex;
    this.currentUtterance = new SpeechSynthesisUtterance(textToSpeak);
    this.currentUtterance.rate = chunk.rate;
    this.currentUtterance.pitch = 1.0;
    if (this.selectedVoice) this.currentUtterance.voice = this.selectedVoice;

    this.currentUtterance.onboundary = (event) => {
      if (event.name === 'word') {
         this.currentCharIndex = baseCharIndex + event.charIndex;
      }
    };

    this.currentUtterance.onend = () => {
      if (this.isManualPause) return;
      
      this.currentChunkIndex++;
      this.currentCharIndex = 0;
      this.playNextChunk();
    };

    window.speechSynthesis.speak(this.currentUtterance);
  }

  public speak(message: string): void {
    if (!this.isTextToSpeechEnabled()) {
      return;
    }

    this.stop();

    if ('speechSynthesis' in window) {
      window.speechSynthesis.resume(); // Ensure engine isn't permanently paused natively
      
      this.speechChunks = [];
      const parts = message.split(/(\[SLOW\]|\[NORMAL\])/);
      let currentRate = this.normalSpeed;

      for (const part of parts) {
        if (part === '[SLOW]') {
          currentRate = this.slowSpeed;
        } else if (part === '[NORMAL]') {
          currentRate = this.normalSpeed;
        } else if (part.trim().length > 0) {
          this.speechChunks.push({ text: part, rate: currentRate });
        }
      }

      this.currentChunkIndex = 0;
      this.currentCharIndex = 0;
      this.isManualPause = false;
      
      this.playNextChunk();
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
      "To pause or resume reading, press the spacebar. " +
      "To get started, press letter Q to read the current question.";
      
    this.speak(message);
    this.hasAnnouncedWelcome = true;
  }

  public announceOverview(): void {
    const storeData = this._store.store();
    const loginData = storeData.loginData;
    const preloginData = storeData.preloginData;
    const sections = storeData.sections || [];
    const examDuration = storeData.examDuration;
    const totalQuestions = sections.reduce((s: number, item: any) => s + (item.items?.length || 0), 0);

    let message = `Welcome to ${loginData?.assessment_data?.name || 'the Exam'}. `;
    if (preloginData?.description) {
      message += `${preloginData.description}. `;
    }

    message += `Candidate name: ${loginData?.candidate_data?.name || 'Unknown'}. `;
    
    if (loginData?.candidate_data?.login_field_value) {
      message += `Login ID: ${loginData.candidate_data.login_field_value}. `;
    }

    message += `Exam Details. `;
    message += `Sections: ${sections.length}. `;
    message += `Total Questions: ${totalQuestions}. `;
    message += `Exam Duration: ${examDuration} minutes. `;

    if (sections.length > 0) {
      message += `The sections are: `;
      sections.forEach((sec: any, idx: number) => {
        message += `Section ${idx + 1}: ${sec.name}. `;
      });
    }

    message += `Please confirm the exam information before continuing.`;

    this.speak(message);
  }

  public async announceInstructions(): Promise<void> {
    const storeData = this._store.store();
    const loginData = storeData.loginData;
    
    let message = `Instructions. Please read through the following instruction sets carefully. `;
    
    if (loginData?.sections_questions) {
      for (const item of loginData.sections_questions) {
        if (item.section_settings?.section_instruction) {
           message += `Instructions for ${item.name}: `;
           const plainInstruction = await this._speechParser.parseHtmlForSpeech(item.section_settings.section_instruction);
           message += `${plainInstruction}. `;
        }
      }
    }

    if (loginData?.assessment_data?.start_exam_instruction) {
      message += `Exam Instructions: `;
      const plainInstruction = await this._speechParser.parseHtmlForSpeech(loginData.assessment_data.start_exam_instruction);
      message += `${plainInstruction}. `;
    }

    this.speak(message);
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
