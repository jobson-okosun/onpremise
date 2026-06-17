import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { PopoverModule } from 'primeng/popover';
import { ChoiceMatrix } from '../item-types/choice-matrix/choice-matrix';
import { ClassifyByMatching } from '../item-types/classify-by-matching/classify-by-matching';
import { ClassifyByOrdering } from '../item-types/classify-by-ordering/classify-by-ordering';
import { CloseWithDropdown } from '../item-types/close-with-dropdown/close-with-dropdown';
import { CloseWithSelect } from '../item-types/close-with-select/close-with-select';
import { CloseWithText } from '../item-types/close-with-text/close-with-text';
import { DrawingAndWritingRoughMode } from '../item-types/drawing-and-writing-rough-mode/drawing-and-writing-rough-mode';
import { DrawingAndWriting } from '../item-types/drawing-and-writing/drawing-and-writing';
import { EssayPlainText } from '../item-types/essay-plain-text/essay-plain-text';
import { EssayRichText } from '../item-types/essay-rich-text/essay-rich-text';
import { LabelImageWithDragAndDrop } from '../item-types/label-image-with-drag-and-drop/label-image-with-drag-and-drop';
import { LabelImageWithDropdownselect } from '../item-types/label-image-with-dropdownselect/label-image-with-dropdownselect';
import { LabelImageWithText } from '../item-types/label-image-with-text/label-image-with-text';
import { MultipleResponse } from '../item-types/multiple-response/multiple-response';
import { ShortText } from '../item-types/short-text/short-text';
import { SingleChoice } from '../item-types/single-choice/single-choice';
import { TrueOrFalse } from '../item-types/true-or-false/true-or-false';
import { YesOrNo } from '../item-types/yes-or-no/yes-or-no';
import { Overview } from '../overview/overview';
import { Paginator } from '../paginator/paginator';
import { IAssessmentPreLoginData, ICandidateLoginResponse, ItemType, StoreSection } from '../../store/model/types';
import { Store } from '../../store/store';
import { ExamService } from '../../services/exam';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { loginData, preloginData } from '../../utils/constants';
import { PostLogin } from '../../services/post-login';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-preview-mode-layout',
  templateUrl: './preview-mode-layout.html',
  styleUrl: './preview-mode-layout.css',
  imports: [
    SingleChoice, DrawingAndWriting, DrawingAndWritingRoughMode, CloseWithDropdown, CloseWithText, CloseWithSelect,
    ShortText, EssayRichText, EssayPlainText, ClassifyByMatching, ClassifyByOrdering, LabelImageWithText, LabelImageWithDropdownselect,
    LabelImageWithDragAndDrop, ChoiceMatrix, MultipleResponse, TrueOrFalse, YesOrNo,
    Paginator, MenuModule, PopoverModule, Overview
  ]
})
export default class PreviewModeLayout {
  private _store = inject(Store)
  private _exam = inject(ExamService)
  private breakpointObserver = inject(BreakpointObserver);
  private _postLoginService = inject(PostLogin)
  private _authService = inject(AuthService)
  private sub!: Subscription;

  paginator = viewChild(Paginator)
  showItemTypesContainer = signal<boolean>(false)
  itemTypesContainer = viewChild<ElementRef>('itemTypesContainer')
  expandedPane = signal<number | null>(0);
  isMobile = signal(true)
  questionFontSize = signal(16)
  itemTypes = signal(ItemType);
  store = computed(() => this._store.store())
  allSectionsAttemp = computed(() => this._exam.sectionsSummary()?.reduce((curr, item) => curr + item.summary.attempted.length, 0))
  totalSectionsQuestions = computed(() => this._exam.totalSectionsQuestions())
  currentSectionSummary = computed(() => this._exam.currentSectionSummary())
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

  examName = computed(() => {
    const name = this.store().loginData?.assessment_data.name ?? ''
    return name.length > 21 ? name.slice(0, 21).concat('...') : name
  })

  candidateName = computed(() => {
    const name = this.store().loginData?.candidate_data?.name! ?? ''
    return name.length > 15 ? name.slice(0, 15).concat('...') : name
  })

  screenWidth = computed(() => this._exam.screenWidth())

  constructor() {
    this.sub = this.breakpointObserver
      .observe('(min-width: 1280px)')
      .subscribe(() => {

        const width = window.innerWidth;
        this._exam.screenWidth.set(width);
      }); 
  }

  async ngOnInit() {
    this.isMobile.set(window.matchMedia('(max-width: 768px)').matches)
    this.updateDrawingAndWritingLayoutConfigInStore()
    this._store.updateStore({ isPreviewMode: true })

    const state = localStorage.getItem('exam-preview-mode');

    if (!!state) {
      const store = JSON.parse(state)

      // const preloginData = store.preloginData as IAssessmentPreLoginData
      // const loginData = store.loginData as ICandidateLoginResponse

      this._authService.setPreLoginData(preloginData as any);
      this._postLoginService.formatLoginDataToStore(loginData as any)

      // _store.updateStore({ isPreviewMode: true })
    }


    // this.initiateExam()
  }

  private initiateExam() {
    this._exam.startExam()
  }

  selectSection(section: StoreSection) {
    const currentSection = this.store().currentSection
    if (currentSection?.id == section.id) {
      return
    }

    const currentQuestion = section.items[0]
    this._store.updateStore({ currentQuestionIndex: 0, currentSection: section, currentQuestion })
  }

  selectSectionInFullMode(section: StoreSection) {
    const currentSection = this.store().currentSection
    if (currentSection?.id == section.id) {
      return
    }

    const currentQuestion = section.items[0]
    section = this.store().sections.find(item => item.id == section.id) as StoreSection
    this._store.updateStore({ currentQuestionIndex: 0, currentSection: section, currentQuestion })
  }

  sectionNameInFullMode(section: StoreSection): string {
    let str = section.name
    if (this.screenWidth() > 1536) {
      str = section.name.length > 25 ? (section.name.slice(0, 25) + '...') : section.name
      return str
    }

    if (this.screenWidth() > 1280) {
      str = section.name.length > 20 ? (section.name.slice(0, 20) + '...') : section.name
      return str
    }

    str = section.name.length > 15 ? (section.name.slice(0, 16) + '...') : section.name
    return str
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
}
