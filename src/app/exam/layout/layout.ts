import { Component, computed, ElementRef, HostListener, inject, linkedSignal, OnDestroy, signal, viewChild } from '@angular/core';
import { DrawingAndWriting } from '../item-types/drawing-and-writing/drawing-and-writing';
import { ExamTools } from '../exam-tools/exam-tools';
import { Paginator } from '../paginator/paginator';
import { Calculator } from '../calculator/calculator';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { Store } from '../../store/store';
import { ExamService } from '../../services/exam';
import { DeliveryMethod, ItemType, StoreSection } from '../../store/model/types';
import { SingleChoice } from '../item-types/single-choice/single-choice';
import { mockStore } from '../../utils/constants';
import { fullscreen, useShortcut } from '../../utils/helper';
import { NgClass } from '@angular/common';
import { CloseWithDropdown } from '../item-types/close-with-dropdown/close-with-dropdown';
import { CloseWithText } from '../item-types/close-with-text/close-with-text';
import { CloseWithSelect } from '../item-types/close-with-select/close-with-select';
import { DrawingAndWritingRoughMode } from '../item-types/drawing-and-writing-rough-mode/drawing-and-writing-rough-mode';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  imports: [SingleChoice, DrawingAndWriting, DrawingAndWritingRoughMode, CloseWithDropdown, CloseWithText, CloseWithSelect, ExamTools, Paginator, Dialog, MenuModule, Dialog, NgClass]
})
export default class Layout implements OnDestroy {
  private _store = inject(Store)
  private _exam = inject(ExamService)

  showItemTypesContainer = signal<boolean>(false)
  itemTypesContainer = viewChild<ElementRef>('itemTypesContainer')
  showUserProfileModal: boolean = false;
  expandedPane = signal<number | null>(0);
  isMobile = signal(true)
  questionFontSize = signal(16)
  itemTypes = signal(ItemType);
  deliveryMethods = signal(DeliveryMethod)
  paginator = viewChild(Paginator)
  standardChoice = viewChild(SingleChoice)
  store = computed(() => this._store.store())
  isCandidateSuspendedModalActive = computed(() => this._exam.isCandidateSuspendedModalActive())
  isLogoutNoticeActive = computed(() => this._exam.isConcurrentExamModalActive())
  logoutNoticeReason = computed(() => this._exam.logoutCandidateReason())
  closeCandidateBrowser = computed(() => this._exam.closeBrowerCounter())
  allSectionsAttemp = computed(() => this._exam.sectionsSummary()?.reduce((curr, item) => curr + item.summary.attempted.length, 0))
  totalSectionsQuestions = computed(() => this._exam.totalSectionsQuestions())
  currentSectionSummary = computed(() => this._exam.currentSectionSummary())
  showUnattemptedModal = linkedSignal(() => this._exam.showUnattemptedModal())
  currentSectionIndex = computed(() => this.store().sections.findIndex(sec => sec.id === this.store().currentSection?.id))
  showNextSectionButton = computed(() => {
    if (!this.store().sections.length) {
      return false
    }

    const onLastItem = this.store().currentQuestionIndex == (this.store().currentSection!.items!.length - 1)
    const sectionIndex = this.store().sections.indexOf(this.store().currentSection as any)

    return onLastItem && (sectionIndex < (this.store().sections.length - 1))
  })

  showPrevSectionButton = computed(() => {
    if (!this.store().sections.length) {
      return false
    }

    const onFirstItem = this.store().currentQuestionIndex === 0
    const sectionIndex = this.store().sections.indexOf(this.store().currentSection as any)

    return onFirstItem && (sectionIndex > 0)
  })

  overviewSections = computed(() => {
    const sections = this.store().sections
    const map = sections.map(sec => {
      const s = this._exam.sectionsSummary()?.find(s => s.id === sec.id)
      const update = { ...sec, summary: s?.summary, open: false }

      return update
    })

    map[0].open = true
    return map
  })

  ngOnInit() {
    this.isMobile.set(window.matchMedia('(max-width: 768px)').matches)
    this.updateDrawingAndWritingLayoutConfigInStore()

    if (!this.store().loginData) {
      this._exam.formatLoginDataToStore(mockStore as any)
    }

    if (!this.store().platformIsTauri) {
      fullscreen()
    }

    this._exam.startExam()
  }

  selectSection(section: StoreSection) {
    const currentQuestion = section.items[0]
    this._store.updateStore({ currentQuestionIndex: 0, currentSection: section, currentQuestion })
  }

  setFontSize(el: HTMLInputElement) {
    this.questionFontSize.set(+el.value)
  }

  nextQuestion() {
    this.paginator()?.next()
  }

  prev() {
    this.paginator()?.prev()
  }

  nextSection() {
    this.paginator()?.nextSection()
  }

  prevSection() {
    this.paginator()?.prevSection()
  }

  logout() {
    this._exam.logout()
  }

  togglePane(i: number) {
    this.expandedPane.set(this.expandedPane() === i ? null : i);
  }

  confirm(): void {
    this._exam.confirm()
  }

  endExam() {
    this._exam.examTimedOut.set(false)
    this._exam.endExam()
  }

  closeEndExamSummaryModal() {
    this._exam.showUnattemptedModal.set(false)
  }

  @HostListener('document:keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    const globalModalIsOpened = document.querySelector('.root-modal')
    if (globalModalIsOpened) {
      return
    }

    const target = event.target as HTMLElement
    if (target.classList.contains('close-item')) {
      return
    }

    if (!this.store().currentQuestion) {
      return
    }

    let component;

    if (this.store().currentQuestion!.item_type == this.itemTypes().MCQ) {
      component = this.standardChoice() as any
    }

    useShortcut(event.key, this.store().currentQuestionIndex, this.paginator()!, this.totalSectionsQuestions(), this.store().currentQuestion!, component)
  }

  isUnattempted(index: number, sectionSummary: any): boolean {
    const summary = sectionSummary?.summary;
    return summary?.unattempted.includes(index) ?? false;
  }

  isRevisit(index: number, sectionSummary: any): boolean {
    const summary = sectionSummary?.summary;
    return summary?.revisits.includes(index) ?? false;
  }

  updateDrawingAndWritingLayoutConfigInStore() {
    const itemTypeContainer = document.getElementById('itemTypesContainer') as HTMLElement;
    const configUpdate = { 
      ...this.store().drawingAndWritingConfig, 
      layoutFullModeWidth: itemTypeContainer.offsetWidth, 
      canvasContainerHeight: itemTypeContainer.offsetHeight - 54
    }
    
    this._store.updateStore({ drawingAndWritingConfig: configUpdate })
    this.showItemTypesContainer.set(true)
  }

  ngOnDestroy(): void {
    this._exam.destroySubscription()
  }
}
