import { Component, computed, inject, output, signal } from '@angular/core';
import { Store } from '../../store/store';
import { ExamService } from '../../services/exam';

@Component({
  selector: 'app-paginator',
  imports: [],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css',
})
export class Paginator {
  private _store = inject(Store)
  private _exam = inject(ExamService)

  isMobile = signal(true)
  store = computed(() => this._store.store())
  currentQuestionIndex = computed(() => this.store().currentQuestionIndex)
  currentSection = computed(() => this.store().currentSection)
  totalQuestions = computed(() => this.store().currentSection?.items.length ?? 0)
  // pageWindow = computed(() => (this.isMobile() ? 5 : 15));
  screenWidth = computed(() => this._exam.screenWidth())
  pageWindow = computed(() => {
    let num = 0
    if (this.screenWidth() >= 1700) {
      num = 30
    } else if (this.screenWidth() >= 1652) {
      num = 27
    } else if (this.screenWidth() >= 1536) {
      num = 25
    } else if (this.screenWidth() >= 1440) {
      num = 21
    } else if (this.screenWidth() >= 1280) {
      num = 19
    } else if (this.screenWidth() >= 1104) {
      num = 14
    } else if (this.screenWidth() >= 1080) {
      num = 16
    } else if (this.screenWidth() >= 1024) {
      num = 12
    } else if (this.screenWidth() >= 820) {
      num = 17
    } else if (this.screenWidth() >= 768) {
      num = 17
    } else if (this.screenWidth() >= 640) {
      num = 14
    } else if (this.screenWidth() >= 428) {
      num = 8
    } else if (this.screenWidth() >= 320) {
      num = 5
    } else {
      num = 5
    }

    return num
  });

  onSelect = output<number>()
  currentSectionSummary = computed(() => this._exam.currentSectionSummary())

  pages = computed(() => {
    const total = this.totalQuestions();
    if (total === 0) return [];

    const max = this.pageWindow();

    if (total <= max) {
      return Array.from({ length: total }, (_, i) => i);
    }

    let start = Math.max(0, this.currentQuestionIndex() - Math.floor(max / 2));
    let end = start + max - 1;

    if (end >= total) {
      end = total - 1;
      start = Math.max(0, end - (max - 1));
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });


  isAttempted(index: number): boolean {
    const summary = this.currentSectionSummary()?.summary;
    return summary?.attempted.includes(index) ?? false;
  }

  isUnattempted(index: number): boolean {
    const summary = this.currentSectionSummary()?.summary;
    return summary?.unattempted.includes(index) ?? false;
  }

  isRevisit(index: number): boolean {
    const summary = this.currentSectionSummary()?.summary;
    return summary?.revisits.includes(index) ?? false;
  }

  isCurrent(index: number): boolean {
    return this.currentQuestionIndex() === index;
  }


  prev() {
    if (this.currentQuestionIndex() > 0) {
      const index = this.currentQuestionIndex() - 1
      const currentQuestion = this.store().currentSection?.items[index]

      this._store.updateStore({ currentQuestionIndex: index, currentQuestion })
    }
  }

  next() {
    if (this.currentQuestionIndex() < this.totalQuestions() - 1) {
      const index = this.currentQuestionIndex() + 1
      const currentQuestion = this.store().currentSection?.items[index]

      this._store.updateStore({ currentQuestionIndex: index, currentQuestion })
    }
  }

  nextSection() {
    const sectionIndex = this.store().sections.indexOf(this.store().currentSection as any)
    const section = this.store().sections[sectionIndex + 1]
    const currentQuestion = section.items[0]
    this._store.updateStore({ currentQuestionIndex: 0, currentSection: section, currentQuestion })
  }

  prevSection() {
    const sectionIndex = this.store().sections.indexOf(this.store().currentSection as any)
    const section = this.store().sections[sectionIndex - 1]
    const currentQuestion = section.items[0]
    this._store.updateStore({ currentQuestionIndex: 0, currentSection: section, currentQuestion })
  }

  selectPage(index: number) {
    const currentQuestion = this.store().currentSection?.items[index]
    this._store.updateStore({ currentQuestionIndex: index, currentQuestion })
  }

  ngOnInit() {
    this.isMobile.set(window.matchMedia('(max-width: 1200px)').matches)
  }
}
