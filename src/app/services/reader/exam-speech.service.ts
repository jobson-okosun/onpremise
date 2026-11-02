import { Injectable, OnDestroy, computed, inject, signal } from '@angular/core';
import { Store } from '../../store/store';
import { AccessibilitySupport, AlphabetList, ItemType } from '../../store/model/types';
import {
  NormalizeOptions,
  SpeakableItem,
  SpeechChunk,
  buildItemSpeech,
  normalizeForSpeech,
} from './speech/normalizer';
import { ExamPauseService } from '../exam-pause';
import { ExamService } from '../exam';

export interface ExamSpeechConfig {
  /** BCP-47 tags in order of preference. */
  langs: string[];
  /** Only use voices that run on-device (needed for offline exam centres). */
  offlineOnly: boolean;
  rate: number;
  pitch: number;
  volume: number;
  /** Chrome cuts utterances off after ~15 s; keep each one well under that. */
  maxUtteranceChars: number;
  normalize: NormalizeOptions;
  /**
   * What to do with a non-English chunk (French, Yoruba …) when no voice for that
   * language is installed. 'default-voice' reads it with the English voice;
   * 'announce' says "Text in Yoruba" instead.
   */
  missingVoice: 'default-voice' | 'announce';
}

const DEFAULT_CONFIG: ExamSpeechConfig = {
  langs: ['en-NG', 'en-GB', 'en-US', 'en'],
  offlineOnly: false,
  rate: 0.95,
  pitch: 1.0,
  volume: 1.0,
  maxUtteranceChars: 180,
  normalize: {},
  missingVoice: 'announce',
};

export type ExamSpeechState = 'idle' | 'speaking' | 'paused';

@Injectable({ providedIn: 'root' })
export class ExamSpeechService implements OnDestroy {
  private _store = inject(Store);
  private _examPause = inject(ExamPauseService, { optional: true });
  private _exam = inject(ExamService, { optional: true });

  private readonly synth: SpeechSynthesis | null =
    typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;

  public isTextToSpeechEnabled = computed(() => {
    const store = this._store.store();
    const acc = store.loginData?.candidate_data?.accessibility_support?.toUpperCase();
    if (acc === AccessibilitySupport.YES) return true;
    return false;
  });

  private config: ExamSpeechConfig = { ...DEFAULT_CONFIG };
  private queue: SpeechChunk[] = [];
  private current: SpeechSynthesisUtterance | null = null;
  private generation = 0;
  private pauseTimer: ReturnType<typeof setTimeout> | null = null;
  private lastUnlockTime = 0;
  private selectedVoice: SpeechSynthesisVoice | null = null;

  private alphabetList = AlphabetList;
  private lastAnnouncedQuestionId: string | null = null;
  private lastAnnouncedSectionId: string | null = null;
  private hasAnnouncedWelcome = false;
  private autoAnnounceTimer: any = null;

  readonly supported = !!this.synth;
  readonly state = signal<ExamSpeechState>('idle');
  readonly index = signal<number>(-1);
  readonly chunks = signal<SpeechChunk[]>([]);
  readonly speaking = computed(() => this.state() === 'speaking');
  readonly currentText = computed(() => this.chunks()[this.index()]?.text ?? '');

  constructor() {
    if (!this.synth) return;

    this.initVoice();
    this.synth.onvoiceschanged = () => {
      this.initVoice();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('click', () => {
        this.unlockAudioEngine();
      });

      // Global listener for Spacebar to pause/resume speech
      window.addEventListener('keydown', (event) => {
        this.unlockAudioEngine();

        const target = event.target as HTMLElement;
        const isInput =
          target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
        if (isInput) return;

        // Global Spacebar shortcut to pause/resume during an active/paused read
        if (event.key === ' ' || event.code === 'Space') {
          if (this.state() !== 'idle') {
            event.preventDefault();
            this.toggle();
          }
        }
      });
    }
  }

  public unlockAudioEngine(): void {
    const now = Date.now();
    if (now - this.lastUnlockTime < 2000) return;

    if (this.synth && this.isTextToSpeechEnabled()) {
      if (!this.synth.speaking && !this.synth.pending) {
        const unlockUtterance = new SpeechSynthesisUtterance('');
        unlockUtterance.volume = 0;
        this.synth.speak(unlockUtterance);
        this.lastUnlockTime = now;
      }
    }
  }

  private initVoice(): void {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return;

    this.selectedVoice =
      voices.find((v) => v.name.includes('Microsoft Zira')) ||
      voices.find((v) => v.name.includes('Samantha') || v.name.includes('Victoria')) ||
      voices.find((v) => v.lang.startsWith('en-') && v.name.toLowerCase().includes('female')) ||
      voices.find((v) => v.lang === 'en-US' || v.lang === 'en-GB') ||
      voices[0];
  }

  public configure(partial: Partial<ExamSpeechConfig>): void {
    this.config = { ...this.config, ...partial };
  }

  public get rate(): number {
    return this.config.rate;
  }

  public setRate(rate: number): void {
    this.configure({ rate: Math.max(0.2, Math.min(2.0, rate)) });
  }

  // ─────────────────────────────── Core Playback ───────────────────────────────

  public play(chunks: SpeechChunk[]): void {
    if (!this.synth || !this.isTextToSpeechEnabled()) return;

    // Safety guard: if exam pause or suspended modal is active, do not speak
    if (this.isExamPaused()) {
      this.stop();
      return;
    }

    this.stop();
    const split = chunks.flatMap((c) => this.split(c));
    this.chunks.set(split);
    this.queue = split;
    this.state.set('speaking');

    if (this.synth.paused) {
      this.synth.resume();
    }

    this.speakAt(0);
  }

  public speakItem(item: SpeakableItem): void {
    this.play(buildItemSpeech(item, this.config.normalize));
  }

  public speakHtml(html: string): void {
    this.play(normalizeForSpeech(html, this.config.normalize));
  }

  public speak(message: string): void {
    this.play(normalizeForSpeech(message, this.config.normalize));
  }

  public pause(): void {
    if (this.state() !== 'speaking') return;
    this.generation++;
    this.clearPauseTimer();
    this.synth?.cancel();
    this.state.set('paused');
  }

  public resume(): void {
    if (this.state() !== 'paused') return;
    if (this.isExamPaused()) return;

    this.state.set('speaking');
    this.speakAt(Math.max(0, this.index()));
  }

  public toggle(): void {
    this.state() === 'speaking' ? this.pause() : this.resume();
  }

  public skip(delta: number): void {
    if (!this.queue.length) return;
    const target = Math.min(this.queue.length - 1, Math.max(0, this.index() + delta));
    this.generation++;
    this.clearPauseTimer();
    this.synth?.cancel();
    this.state.set('speaking');
    const gen = this.generation;
    setTimeout(() => {
      if (gen === this.generation) {
        this.speakAt(target);
      }
    }, 50);
  }

  public stop(): void {
    this.generation++;
    this.clearPauseTimer();
    if (this.autoAnnounceTimer) {
      clearTimeout(this.autoAnnounceTimer);
      this.autoAnnounceTimer = null;
    }
    this.synth?.cancel();
    this.current = null;
    this.queue = [];
    this.index.set(-1);
    this.state.set('idle');
  }

  public resetSession(): void {
    this.stop();
    this.lastAnnouncedQuestionId = null;
    this.lastAnnouncedSectionId = null;
    this.hasAnnouncedWelcome = false;
  }

  ngOnDestroy(): void {
    this.stop();
  }

  // ─────────────────────────────── Internal Engine ─────────────────────────────

  private speakAt(i: number): void {
    if (!this.synth) return;
    if (i >= this.queue.length) {
      this.current = null;
      this.index.set(-1);
      this.state.set('idle');
      return;
    }

    if (this.isExamPaused()) {
      this.stop();
      return;
    }

    if (!this.selectedVoice) {
      this.initVoice();
    }

    const gen = this.generation;
    const chunk = this.queue[i];
    const text = chunk.text;

    const u = new SpeechSynthesisUtterance(text);
    u.rate = chunk.emphasis ? this.config.rate * 0.85 : this.config.rate;
    u.pitch = 1.0;
    u.volume = this.config.volume;
    if (this.selectedVoice) {
      u.voice = this.selectedVoice;
    }

    u.onend = () => {
      if (gen !== this.generation) return;
      const next = () => {
        if (gen === this.generation) {
          this.speakAt(i + 1);
        }
      };
      if (chunk.pauseAfterMs) {
        this.pauseTimer = setTimeout(next, chunk.pauseAfterMs);
      } else {
        next();
      }
    };

    u.onerror = (e) => {
      if (gen !== this.generation) return;
      if (e.error === 'interrupted' || e.error === 'canceled') return;
      console.warn('[ExamSpeechService] utterance failed:', e.error, chunk.text);
      this.speakAt(i + 1);
    };

    this.current = u;
    this.index.set(i);
    this.synth.speak(u);
  }

  private split(chunk: SpeechChunk): SpeechChunk[] {
    const max = this.config.maxUtteranceChars;
    if (chunk.text.length <= max) return [chunk];
    const pieces: string[] = [];
    let rest = chunk.text;
    while (rest.length > max) {
      const window = rest.slice(0, max);
      const cut = Math.max(
        window.lastIndexOf('. '),
        window.lastIndexOf('? '),
        window.lastIndexOf('; '),
        window.lastIndexOf(', ')
      );
      const at =
        cut > max * 0.4 ? cut + 1 : window.lastIndexOf(' ') > 0 ? window.lastIndexOf(' ') : max;
      pieces.push(rest.slice(0, at).trim());
      rest = rest.slice(at).trim();
    }
    if (rest) pieces.push(rest);
    return pieces.map((text, i) => ({
      text,
      emphasis: chunk.emphasis,
      lang: chunk.lang,
      pauseAfterMs: i === pieces.length - 1 ? chunk.pauseAfterMs : undefined,
    }));
  }

  private clearPauseTimer(): void {
    if (this.pauseTimer) clearTimeout(this.pauseTimer);
    this.pauseTimer = null;
  }

  private isExamPaused(): boolean {
    if (this._examPause?.hasActivePauses?.()) return true;
    if (this._exam?.isCandidateSuspendedModalActive?.()) return true;
    if (this._exam?.isConcurrentExamModalActive?.()) return true;
    if (this._exam?.isPermanentNetworkLossModalActive?.()) return true;
    if (this._exam?.isProctoringNetworkRetryActive?.()) return true;
    return false;
  }

  // ─────────────────────────────── Question & Mode Handling ───────────────────

  public getSupportedMode(itemType: ItemType | string): 'FULL' | 'QUESTION_ONLY' | 'SKIP' {
    const type = itemType as ItemType;
    if ([ItemType.MCQ, ItemType.MRQ, ItemType.TRUE_FALSE, ItemType.YES_NO].includes(type)) {
      return 'FULL';
    }
    if (
      [
        ItemType.ESSAY_PLAIN_TEXT,
        ItemType.ESSAY_RICH_TEXT,
        ItemType.SHORT_TEXT,
        ItemType.IMAGE_DRAG_AND_DROP,
        ItemType.CLOZE_TEXT_IMAGE,
        ItemType.CLOZE_DROPDOWN_IMAGE,
        ItemType.CLOZE_DROPDOWN,
        ItemType.CLOZE_RADIO,
      ].includes(type)
    ) {
      return 'QUESTION_ONLY';
    }
    return 'SKIP';
  }

  public isSupportedItemType(itemType: ItemType | string): boolean {
    return this.getSupportedMode(itemType) !== 'SKIP';
  }

  // ─────────────────────────────── Workflow Announcements ─────────────────────

  public announceWelcomeMessage(): void {
    this.stop();

    const welcomeHtml =
      '<p>Hello, welcome to the exam.</p>' +
      '<p>Here is a quick guide on how to navigate using shortcuts.</p>' +
      '<p>To read the current question, press letter Q.</p>' +
      '<p>To read the options, press letter O.</p>' +
      '<p>To select an answer, press the corresponding option letter, for example A, B, or C.</p>' +
      '<p>To navigate to the next question, press letter N.</p>' +
      '<p>To navigate to the previous question, press letter P.</p>' +
      '<p>To switch between subjects, press the number of the subject, such as 1, 2, or 3.</p>' +
      '<p>To pause or resume reading, press the spacebar.</p>' +
      '<p>To check your remaining time and question summary, press letter T.</p>' +
      '<p>To end or submit the exam, press the letter S twice quickly.</p>' +
      '<p>To re-read these shortcut instructions at any time, press letter R.</p>' +
      '<p>So, are you ready to begin? Press the letter Q so I can read to you the first question.</p>';

    this.play(normalizeForSpeech(welcomeHtml, this.config.normalize));
    this.hasAnnouncedWelcome = true;
  }

  public announceOverview(): void {
    const storeData = this._store.store();
    const loginData = storeData.loginData;
    const preloginData = storeData.preloginData;
    const sections = storeData.sections || [];
    const examDuration = storeData.examDuration;
    const totalQuestions = sections.reduce(
      (s: number, item: any) => s + (item.items?.length || 0),
      0
    );

    let html = `<p>Welcome to ${loginData?.assessment_data?.name || 'the Exam'}.</p>`;
    if (preloginData?.description) {
      html += `<p>${preloginData.description}.</p>`;
    }

    html += `<p>Candidate name: ${loginData?.candidate_data?.name || 'Unknown'}.</p>`;
    if (loginData?.candidate_data?.login_field_value) {
      html += `<p>Login ID: ${loginData.candidate_data.login_field_value}.</p>`;
    }

    html += `<p>Exam Details.</p>`;
    html += `<p>Sections: ${sections.length}. Total Questions: ${totalQuestions}. Exam Duration: ${examDuration} minutes.</p>`;

    if (sections.length > 0) {
      html += `<p>The sections are:</p><ul>`;
      sections.forEach((sec: any, idx: number) => {
        html += `<li>Section ${idx + 1}: ${sec.name}.</li>`;
      });
      html += `</ul>`;
    }

    html += `<p>Please confirm the exam information before continuing.</p>`;
    html += `<p>Here is a quick guide on how to navigate using shortcuts.</p>`;
    html += `<p>To continue to the instructions, press the Enter key.</p>`;
    html += `<p>To re-read this overview, press the letter R.</p>`;
    html += `<p>To pause or resume reading, press the spacebar.</p>`;

    this.play(normalizeForSpeech(html, this.config.normalize));
  }

  public announceInstructions(): void {
    const storeData = this._store.store();
    const loginData = storeData.loginData;

    let html = `<p>Instructions. Please read through the following instruction sets carefully.</p>`;
    html += `<p>Here is a quick guide on how to navigate this page using shortcuts.</p>`;
    html += `<p>To go back to the overview page, press the Backspace key or letter B.</p>`;
    html += `<p>To re-read these instructions, press the letter R.</p>`;
    html += `<p>To pause or resume reading, press the spacebar.</p>`;
    html += `<p>To begin the exam, press the Enter key.</p>`;

    if (loginData?.sections_questions) {
      for (const item of loginData.sections_questions) {
        if (item.section_settings?.section_instruction) {
          html += `<p>Instructions for ${item.name}:</p>`;
          html += `<div>${item.section_settings.section_instruction}</div>`;
        }
      }
    }

    if (loginData?.assessment_data?.start_exam_instruction) {
      html += `<p>Exam Instructions:</p>`;
      html += `<div>${loginData.assessment_data.start_exam_instruction}</div>`;
    }

    this.play(normalizeForSpeech(html, this.config.normalize));
  }

  public announceEndExamSummary(overviewSections?: any[]): void {
    if (!this.isTextToSpeechEnabled()) return;

    this.stop();

    const sections = overviewSections || this._store.store().sections.map(sec => {
      const s = this._exam?.sectionsSummary()?.find((item: any) => item.id === sec.id);
      return { ...sec, summary: s?.summary };
    });

    const formatNumbers = (indices: number[]): string => {
      const nums = indices.map(i => i + 1);
      if (nums.length === 0) return '';
      if (nums.length === 1) return `${nums[0]}`;
      if (nums.length === 2) return `${nums[0]} and ${nums[1]}`;
      return `${nums.slice(0, -1).join(', ')}, and ${nums[nums.length - 1]}`;
    };

    let speechHtml = '<p>You are attempting to end the exam.</p>';

    const totalUnattempted = sections.reduce(
      (acc: number, sec: any) => acc + (sec.summary?.unattempted?.length || 0),
      0
    );
    const totalRevisits = sections.reduce(
      (acc: number, sec: any) => acc + (sec.summary?.revisits?.length || 0),
      0
    );

    if (totalUnattempted === 0 && totalRevisits === 0) {
      speechHtml += '<p>All questions across all subjects have been attempted.</p>';
    } else {
      sections.forEach((sec: any) => {
        const unattempted: number[] = sec.summary?.unattempted || [];
        const revisits: number[] = sec.summary?.revisits || [];

        let secDetails = '';

        if (unattempted.length === 0 && revisits.length === 0) {
          secDetails = 'All questions answered.';
        } else {
          const parts: string[] = [];

          if (unattempted.length > 0) {
            if (unattempted.length <= 5) {
              const qWord = unattempted.length === 1 ? 'Question' : 'Questions';
              parts.push(
                `${unattempted.length} ${unattempted.length === 1 ? 'question is' : 'questions are'} unanswered, ${qWord} ${formatNumbers(unattempted)}`
              );
            } else {
              parts.push(`${unattempted.length} questions are unanswered`);
            }
          } else {
            parts.push('All questions answered');
          }

          if (revisits.length > 0) {
            if (revisits.length <= 5) {
              const qWord = revisits.length === 1 ? 'Question' : 'Questions';
              parts.push(
                `${revisits.length} ${revisits.length === 1 ? 'question is' : 'questions are'} marked for revisit, ${qWord} ${formatNumbers(revisits)}`
              );
            } else {
              parts.push(`${revisits.length} questions are marked for revisit`);
            }
          }

          secDetails = parts.join('. ') + '.';
        }

        speechHtml += `<p>In ${sec.name}: ${secDetails}</p>`;
      });
    }

    speechHtml += '<p>If you want to continue your exam, select Continue Exam. If you are ready to submit, select End Exam.</p>';

    this.play(normalizeForSpeech(speechHtml, this.config.normalize));
  }

  public announceStatusSummary(overviewSections?: any[]): void {
    if (!this.isTextToSpeechEnabled()) return;

    this.stop();

    const timer = this._exam?.timeDisplay?.() || { min: 0, sec: 0 };
    const sections = overviewSections || this._store.store().sections.map(sec => {
      const s = this._exam?.sectionsSummary()?.find((item: any) => item.id === sec.id);
      return { ...sec, summary: s?.summary };
    });

    const formatNumbers = (indices: number[]): string => {
      const nums = indices.map(i => i + 1);
      if (nums.length === 0) return '';
      if (nums.length === 1) return `${nums[0]}`;
      if (nums.length === 2) return `${nums[0]} and ${nums[1]}`;
      return `${nums.slice(0, -1).join(', ')}, and ${nums[nums.length - 1]}`;
    };

    let speechHtml = '<p>Exam status summary.</p>';

    // Time remaining
    if (timer.min > 0 && timer.sec > 0) {
      speechHtml += `<p>Time remaining: ${timer.min} ${timer.min === 1 ? 'minute' : 'minutes'} and ${timer.sec} ${timer.sec === 1 ? 'second' : 'seconds'}.</p>`;
    } else if (timer.min > 0) {
      speechHtml += `<p>Time remaining: ${timer.min} ${timer.min === 1 ? 'minute' : 'minutes'}.</p>`;
    } else if (timer.sec > 0) {
      speechHtml += `<p>Time remaining: ${timer.sec} ${timer.sec === 1 ? 'second' : 'seconds'}.</p>`;
    } else {
      speechHtml += `<p>Exam time has expired.</p>`;
    }

    const totalAttempted = sections.reduce(
      (acc: number, sec: any) => acc + (sec.summary?.attempted?.length || 0),
      0
    );
    const totalUnattempted = sections.reduce(
      (acc: number, sec: any) => acc + (sec.summary?.unattempted?.length || 0),
      0
    );
    const totalRevisits = sections.reduce(
      (acc: number, sec: any) => acc + (sec.summary?.revisits?.length || 0),
      0
    );
    const totalQuestions = totalAttempted + totalUnattempted;

    if (totalUnattempted === 0 && totalRevisits === 0) {
      speechHtml += `<p>All ${totalQuestions} questions across all subjects have been attempted.</p>`;
    } else {
      speechHtml += `<p>Across all subjects: ${totalAttempted} of ${totalQuestions} questions answered. ${totalUnattempted} unanswered.`;
      if (totalRevisits > 0) {
        speechHtml += ` ${totalRevisits} marked for revisit.`;
      }
      speechHtml += `</p>`;

      sections.forEach((sec: any) => {
        const unattempted: number[] = sec.summary?.unattempted || [];
        const revisits: number[] = sec.summary?.revisits || [];

        let secDetails = '';

        if (unattempted.length === 0 && revisits.length === 0) {
          secDetails = 'All questions answered.';
        } else {
          const parts: string[] = [];

          if (unattempted.length > 0) {
            if (unattempted.length <= 5) {
              const qWord = unattempted.length === 1 ? 'Question' : 'Questions';
              parts.push(
                `${unattempted.length} ${unattempted.length === 1 ? 'question is' : 'questions are'} unanswered, ${qWord} ${formatNumbers(unattempted)}`
              );
            } else {
              parts.push(`${unattempted.length} questions are unanswered`);
            }
          } else {
            parts.push('All questions answered');
          }

          if (revisits.length > 0) {
            if (revisits.length <= 5) {
              const qWord = revisits.length === 1 ? 'Question' : 'Questions';
              parts.push(
                `${revisits.length} ${revisits.length === 1 ? 'question is' : 'questions are'} marked for revisit, ${qWord} ${formatNumbers(revisits)}`
              );
            } else {
              parts.push(`${revisits.length} questions are marked for revisit`);
            }
          }

          secDetails = parts.join('. ') + '.';
        }

        speechHtml += `<p>In ${sec.name}: ${secDetails}</p>`;
      });
    }

    speechHtml += '<p>Press letter Q to return to your current question, or spacebar to pause.</p>';

    this.play(normalizeForSpeech(speechHtml, this.config.normalize));
  }

  public autoAnnounceQuestion(): void {
    if (this.autoAnnounceTimer) {
      clearTimeout(this.autoAnnounceTimer);
      this.autoAnnounceTimer = null;
    }

    const question = this._store.store().currentQuestion;
    const section = this._store.store().currentSection;

    if (!question || !section) return;

    const questionChanged = question.id !== this.lastAnnouncedQuestionId;
    const sectionChanged = section.id !== this.lastAnnouncedSectionId;

    if (questionChanged || sectionChanged) {
      this.lastAnnouncedQuestionId = question.id;

      if (!this.hasAnnouncedWelcome) {
        this.hasAnnouncedWelcome = true;
        this.lastAnnouncedSectionId = section.id;
        this.autoAnnounceTimer = setTimeout(() => {
          this.announceWelcomeMessage();
        }, 2000);
      } else {
        if (!this.isSupportedItemType(question.item_type)) {
          this.stop();
          return;
        }
        this.stop();
        this.autoAnnounceTimer = setTimeout(() => {
          this.announceCurrentQuestion();
        }, 500);
      }
    }
  }

  public announceCurrentQuestion(): void {
    const question = this._store.store().currentQuestion;
    const index = this._store.store().currentQuestionIndex;

    if (!question) return;

    const mode = this.getSupportedMode(question.item_type);
    if (mode === 'SKIP') {
      this.stop();
      return;
    }

    const isCloze =
      [
        ItemType.CLOZE_DROPDOWN,
        ItemType.CLOZE_RADIO,
        ItemType.CLOZE_DROPDOWN_IMAGE,
      ].includes(question.item_type as ItemType) ||
      ((question.possible_responses?.length ?? 0) > 0 &&
        /\{\{\s*response\s*\}\}/i.test(question.stimulus || ''));

    const section = this._store.store().currentSection;
    const isSubjectSwitch =
      this.lastAnnouncedSectionId !== null &&
      !!section?.id &&
      section.id !== this.lastAnnouncedSectionId;
    this.lastAnnouncedSectionId = section?.id ?? null;

    const sectionPrefix = isSubjectSwitch
      ? `Switched to ${section?.name}. `
      : section?.name
      ? `${section.name}, `
      : '';

    // Specialized cloze reading with navigation guide and inlined gap options
    if (isCloze) {
      const chunks: SpeechChunk[] = [];
      chunks.push({ text: `${sectionPrefix}Question ${index + 1}.`, pauseAfterMs: 300 });

      const clozeGuide =
        "For this question only, here is a quick guide. Whenever you hear the word blank, it means you need to choose the correct answer to fill in that gap. Use the Left and Right Arrow keys to move from one blank to the other, and press the corresponding letter, such as A or B, to select your answer. The main question is as follows.";
      const guideChunks = normalizeForSpeech(clozeGuide, this.config.normalize);
      if (guideChunks.length) {
        guideChunks[guideChunks.length - 1].pauseAfterMs = 400;
      }
      chunks.push(...guideChunks);

      if (question.passage_stimulus) {
        const passageChunks = normalizeForSpeech(question.passage_stimulus, this.config.normalize);
        if (passageChunks.length) {
          passageChunks[passageChunks.length - 1].pauseAfterMs = 400;
        }
        chunks.push(...passageChunks);
      }

      let stimulus = question.stimulus || '';
      let blankIndex = 0;
      stimulus = stimulus.replace(/\{\{\s*response\s*\}\}/gi, () => {
        let replacement = ` blank number ${blankIndex + 1}: options are: `;
        const possibleResponses =
          question.possible_responses?.[blankIndex]?.responses || [];

        if (possibleResponses.length > 0) {
          possibleResponses.forEach((opt: any, idx: number) => {
            const cleanLetter = this.alphabetList[idx]
              ? this.alphabetList[idx].replace(/[()]/g, '')
              : String.fromCharCode(65 + idx);
            const optText = opt.label?.replace(/<[^>]*>?/gm, ' ').trim() || '';
            replacement += `${cleanLetter}, ${optText}. `;
          });
        }

        blankIndex++;
        return replacement;
      });

      chunks.push(...normalizeForSpeech(stimulus, this.config.normalize));

      const emphasisSummary = this.extractEmphasisSummary(question.stimulus || '');
      if (emphasisSummary) {
        chunks.push({ text: emphasisSummary, pauseAfterMs: 400 });
      }

      this.play(chunks);
      return;
    }

    // Standard items (MCQ, MRQ, True/False, Yes/No, Essays, etc.)
    let stimulus = question.stimulus || '';
    stimulus = stimulus.replace(/\{\{\s*response\s*\}\}/gi, '____');

    const chunks: SpeechChunk[] = [];
    chunks.push({ text: `${sectionPrefix}Question ${index + 1}.`, pauseAfterMs: 300 });

    if (question.passage_stimulus) {
      const passageChunks = normalizeForSpeech(question.passage_stimulus, this.config.normalize);
      if (passageChunks.length) {
        passageChunks[passageChunks.length - 1].pauseAfterMs = 400;
      }
      chunks.push(...passageChunks);
    }

    const stemChunks = normalizeForSpeech(stimulus, this.config.normalize);
    if (stemChunks.length) {
      stemChunks[stemChunks.length - 1].pauseAfterMs = 400;
    }
    chunks.push(...stemChunks);

    // Announce emphasis summary if any b/i/u tags are present in the question
    const emphasisSummary = this.extractEmphasisSummary(question.stimulus || '');
    if (emphasisSummary) {
      chunks.push({ text: emphasisSummary, pauseAfterMs: 400 });
    }

    if (mode === 'FULL' && question.options?.length) {
      const letters: string[] = [];
      for (const [idx, opt] of question.options.entries()) {
        const label = this.alphabetList[idx]
          ? this.alphabetList[idx].replace(/[()]/g, '')
          : String.fromCharCode(65 + idx);
        letters.push(label);
        chunks.push({ text: `Option ${label}.`, pauseAfterMs: 150 });
        const body = normalizeForSpeech(opt.label || '', this.config.normalize);
        if (body.length) {
          body[body.length - 1].pauseAfterMs = 400;
        }
        chunks.push(...body);
      }

      if (question.responses && question.responses.length > 0) {
        const answeredLetters: string[] = [];
        for (const resp of question.responses) {
          const optIdx = question.options.findIndex((o: any) => o.value === resp);
          if (optIdx !== -1) {
            answeredLetters.push(
              this.alphabetList[optIdx]
                ? this.alphabetList[optIdx].replace(/[()]/g, '')
                : String.fromCharCode(65 + optIdx)
            );
          }
        }
        if (answeredLetters.length > 0) {
          chunks.push({
            text: `You have currently selected option ${answeredLetters.join(' and ')}.`,
            pauseAfterMs: 300,
          });
        }
      } else if (letters.length > 0) {
        chunks.push({
          text: `Press ${letters.join(' or ')} to select an answer.`,
          pauseAfterMs: 300,
        });
      }
    }

    this.play(chunks);
  }

  public announceCurrentOptions(): void {
    const question = this._store.store().currentQuestion;
    if (
      !question ||
      !question.options?.length ||
      this.getSupportedMode(question.item_type) !== 'FULL'
    ) {
      return;
    }

    const chunks: SpeechChunk[] = [];
    const letters: string[] = [];
    for (const [idx, opt] of question.options.entries()) {
      const label = this.alphabetList[idx]
        ? this.alphabetList[idx].replace(/[()]/g, '')
        : String.fromCharCode(65 + idx);
      letters.push(label);
      chunks.push({ text: `Option ${label}.`, pauseAfterMs: 150 });
      const body = normalizeForSpeech(opt.label || '', this.config.normalize);
      if (body.length) {
        body[body.length - 1].pauseAfterMs = 400;
      }
      chunks.push(...body);
    }

    if (letters.length > 0) {
      chunks.push({
        text: `Press ${letters.join(' or ')} to select an answer.`,
        pauseAfterMs: 300,
      });
    }

    this.play(chunks);
  }

  public announceFeedback(message: string): void {
    this.play(normalizeForSpeech(message, this.config.normalize));
  }

  private buildImageDescription(question: any): string {
    if (
      [
        ItemType.CLOZE_TEXT_IMAGE,
        ItemType.CLOZE_DROPDOWN_IMAGE,
        ItemType.CLOZE_RADIO,
      ].includes(question.item_type as ItemType)
    ) {
      if (typeof document !== 'undefined') {
        const img = document.querySelector('.answer-space img') as HTMLImageElement;
        if (img && img.alt) {
          return `Image description: ${img.alt}.`;
        }
      }
    }
    return '';
  }

  private extractEmphasisSummary(html: string): string {
    if (!html || typeof DOMParser === 'undefined') return '';
    try {
      const doc = new DOMParser().parseFromString(html, 'text/html');

      const bolds: string[] = [];
      const italics: string[] = [];
      const underlines: string[] = [];

      doc.querySelectorAll('b, strong').forEach((el) => {
        const txt = el.textContent?.trim();
        if (txt && !bolds.includes(txt)) bolds.push(txt);
      });
      doc.querySelectorAll('i, em').forEach((el) => {
        const txt = el.textContent?.trim();
        if (txt && !italics.includes(txt)) italics.push(txt);
      });
      doc.querySelectorAll('u').forEach((el) => {
        const txt = el.textContent?.trim();
        if (txt && !underlines.includes(txt)) underlines.push(txt);
      });

      const summaries: string[] = [];
      if (bolds.length > 0) summaries.push(`bolded: ${bolds.join(', ')}`);
      if (italics.length > 0) summaries.push(`italicized: ${italics.join(', ')}`);
      if (underlines.length > 0) summaries.push(`underlined: ${underlines.join(', ')}`);

      if (summaries.length > 0) {
        return `In the question text we just heard, the following words were ${summaries.join('. And ')}.`;
      }
    } catch {
      // fallback silently if DOMParser throws
    }
    return '';
  }
}
