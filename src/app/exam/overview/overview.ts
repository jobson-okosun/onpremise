import { Component, computed, inject, model, viewChild } from '@angular/core';
import { Store } from '../../store/store';
import { ExamService } from '../../services/exam';
import { Paginator } from '../paginator/paginator';
import { StoreSection } from '../../store/model/types';


@Component({
  selector: 'app-overview',
  imports: [Paginator],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview {
  private _store = inject(Store) 
  private _exam = inject(ExamService)

  paginator = viewChild(Paginator)
  
  store = computed(() => this._store.store())
  currentQuestionIndex = computed(() => this.store().currentQuestionIndex)
  currentSection = computed(() => this.store().currentSection)
  currentSectionSummary = computed(() => this._exam.currentSectionSummary())
  overviewSections = computed(() => {
    const sections = this.store().sections

    return sections.map(sec => {
      const s = this._exam.sectionsSummary()?.find(s => s.id === sec.id)
      const update = {
        ...sec,
        summary: s?.summary
      }

      return update
    })
  })

  activeTab = model(0)
  isExamAlpha = computed(() => this._exam.isExamAlpha())

  selectSection(section: any) {
    const { summary, ...rest } = section

    const currentQuestion = section.items[0]
    const currentSection = { ...rest } as StoreSection
    this._store.updateStore({ currentQuestionIndex: 0, currentSection, currentQuestion })
  }

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

  selectPage(page: number) {
    this.paginator()?.selectPage(page)
  }
}
