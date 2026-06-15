import { Component, computed, effect, ElementRef, HostListener, inject, linkedSignal, OnDestroy, signal, TemplateRef, viewChild } from '@angular/core';
import { DrawingAndWriting } from '../item-types/drawing-and-writing/drawing-and-writing';
import { ExamTools } from '../exam-tools/exam-tools';
import { Paginator } from '../paginator/paginator';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { Store } from '../../store/store';
import { ExamService } from '../../services/exam';
import { ProctorService } from '../../services/auto-proctoring/proctor';
import { DeliveryMethod, ExamType, ItemType, StoreSection, UsageEvents } from '../../store/model/types';
import { SingleChoice } from '../item-types/single-choice/single-choice';
import { blockContextMenuHandler, fullscreen, useShortcut } from '../../utils/helper';
import { NgClass } from '@angular/common';
import { CloseWithDropdown } from '../item-types/close-with-dropdown/close-with-dropdown';
import { CloseWithText } from '../item-types/close-with-text/close-with-text';
import { CloseWithSelect } from '../item-types/close-with-select/close-with-select';
import { DrawingAndWritingRoughMode } from '../item-types/drawing-and-writing-rough-mode/drawing-and-writing-rough-mode';
import { ShortText } from '../item-types/short-text/short-text';
import { EssayRichText } from '../item-types/essay-rich-text/essay-rich-text';
import { EssayPlainText } from '../item-types/essay-plain-text/essay-plain-text';
import { ClassifyByMatching } from '../item-types/classify-by-matching/classify-by-matching';
import { ClassifyByOrdering } from '../item-types/classify-by-ordering/classify-by-ordering';
import { LabelImageWithText } from '../item-types/label-image-with-text/label-image-with-text';
import { LabelImageWithDropdownselect } from '../item-types/label-image-with-dropdownselect/label-image-with-dropdownselect';
import { LabelImageWithDragAndDrop } from '../item-types/label-image-with-drag-and-drop/label-image-with-drag-and-drop';
import { ChoiceMatrix } from '../item-types/choice-matrix/choice-matrix';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { Calculator } from '../calculator/calculator';
import { ScientificCalculator } from '../scientific-calculator/scientific-calculator';
import { MultipleResponse } from '../item-types/multiple-response/multiple-response';
import { TrueOrFalse } from '../item-types/true-or-false/true-or-false';
import { YesOrNo } from '../item-types/yes-or-no/yes-or-no';
import { ProctorPreview } from '../proctor-preview/proctor-preview';
import { HotToastService } from '@ngxpert/hot-toast';
import { PopoverModule } from 'primeng/popover';
import { Overview } from '../overview/overview';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { PostLogin } from '../../services/post-login';
import { environment } from '../../../environments/environment';
import { LiveProctoringConfig, LiveProctoringService } from '../../services/live-proctoring/live-proctoring.service';
import { AuthService } from '../../services/auth';
import { loginData, MINIMUM_REASONABLE_DOWNLOAD_SPEED, preloginData } from '../../utils/constants';
import { EventService } from '../../services/event';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  imports: [
    SingleChoice, DrawingAndWriting, DrawingAndWritingRoughMode, CloseWithDropdown, CloseWithText, CloseWithSelect,
    ShortText, EssayRichText, EssayPlainText, ClassifyByMatching, ClassifyByOrdering, LabelImageWithText, LabelImageWithDropdownselect,
    LabelImageWithDragAndDrop, ChoiceMatrix, MultipleResponse, TrueOrFalse, YesOrNo,
    ExamTools, Paginator, Dialog, MenuModule, Dialog, NgClass, CdkDrag, Calculator, ScientificCalculator, ProctorPreview, PopoverModule, Overview
  ]
})
export default class Layout implements OnDestroy {
  private _store = inject(Store)
  private _exam = inject(ExamService)
  private _autoProctorService = inject(ProctorService)
  private _toast = inject(HotToastService)
  private _postLoginService = inject(PostLogin)
  private _authService = inject(AuthService)
  private _liveProctoring = inject(LiveProctoringService)
  private breakpointObserver = inject(BreakpointObserver);
  private _eventService = inject(EventService)
  private sub!: Subscription;

  isTargetSpeaking = computed(() => this._liveProctoring.isTargetSpeaking())

  lastPressTime = signal(0);
  threshold = signal(2000);
  showCalculator = signal<null | string>(null)
  showItemTypesContainer = signal<boolean>(false)
  itemTypesContainer = viewChild<ElementRef>('itemTypesContainer')
  infractionToastTemplate = viewChild<TemplateRef<HTMLDivElement>>('infractionToastTemplate');
  showUserProfileModal: boolean = false;
  expandedPane = signal<number | null>(0);
  isMobile = signal(true)
  questionFontSize = signal(16)
  itemTypes = signal(ItemType);
  deliveryMethods = signal(DeliveryMethod)
  examTypes = Object.values(ExamType)
  paginator = viewChild(Paginator)
  standardChoice = viewChild(SingleChoice)
  multipleChoice = viewChild(MultipleResponse)
  yesOrNo = viewChild(YesOrNo)
  trueOrFalse = viewChild(TrueOrFalse)
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

  examName = computed(() => {
    const name = this.store().loginData?.assessment_data.name ?? ''
    return name.length > 21 ? name.slice(0, 21).concat('...') : name
  })

  candidateName = computed(() => {
    const name = this.store().loginData?.candidate_data?.name! ?? ''
    return name.length > 15 ? name.slice(0, 15).concat('...') : name
  })

  isLiveProctoring = computed(() => this._exam.isLiveProctoring())
  isAutoProctoring = computed(() => this._exam.isAutoProctoring())
  isProctoredExam = computed(() => this._exam.isProctoredExam())

  isExamAlpha = computed(() => this._exam.isExamAlpha())
  isAutoSaving = computed(() => this._exam.isAutoSaving())
  isAutoSaveSuccessful = computed(() => this._exam.isAutoSaveSuccessful())
  connectionStatus = computed(() => this._exam.connectionStatus())
  screenWidth = computed(() => this._exam.screenWidth())
  canEndExam = computed(() => this._exam.canEndExam())

  proctoringNetworkSpeed = computed(() => this._exam.proctoringNetworkSpeed())
  isCheckingProctoringNetwork = computed(() => this._exam.isCheckingProctoringNetwork())
  proctoringNetworkRetryCountdown = computed(() => this._exam.proctoringNetworkRetryCountdown())
  isProctoringNetworkRetryActive = computed(() => this._exam.isProctoringNetworkRetryActive())
  hasSharedFullScreen = computed(() => this._liveProctoring.hasSharedFullScreen())
  DOWNLOAD_SPEED = MINIMUM_REASONABLE_DOWNLOAD_SPEED

  constructor() {
    this.sub = this.breakpointObserver
      .observe('(min-width: 1280px)')
      .subscribe(() => {

        const width = window.innerWidth;
        this._exam.screenWidth.set(width);
      });

    effect(() => {
      const el = this.infractionToastTemplate();
      if (el) {
        this._autoProctorService.infractionTemplateRef.set(el)
      }
    });

    effect(() => {
      if (this._liveProctoring.hasSharedFullScreen() === true) {
        this.initiateExam()
      } else if (this._liveProctoring.hasSharedFullScreen() === false) {
        this._toast.error('Full screen sharing is mandatory!', { duration: 1500000, dismissible: true })
        this._liveProctoring.cleanUpLiveProctoring()
      }
    })
  }

  async ngOnInit() {
    this.isMobile.set(window.matchMedia('(max-width: 768px)').matches)
    this.updateDrawingAndWritingLayoutConfigInStore()

    // if (!this.store().loginData) {
    //   this._authService.setPreLoginData(preloginData as any);
    //   this._postLoginService.formatLoginDataToStore(loginData as any)
    // }

    if (!this.store().platformIsTauri) {
      fullscreen()
    }

    if (this.isProctoredExam()) {

      if (this.isLiveProctoring()) {
        const success = await this._liveProctoring.initialize()
        if (!success) {
          this._toast.error('Unable to start live proctoring. Please try again.', { duration: 150000, dismissible: true })
        }

        // effect tracking full screen sharing will start the exam
        return
      } 

      if (this.isAutoProctoring()) {
        const success = await this._autoProctorService.initialize()

        if (!success) {
          this._toast.error('Unable to start proctoring. Please check your device settings.', { duration: 150000, dismissible: true })
          return
        }
      }

      this._exam.startProctoringNetworkMonitor()
    }

    this.initiateExam()
  }

  private initiateExam() {
    this.disableContextMenu()
    this.disableCopyAndPaste()

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

    this._eventService.logEvent({
      event_type: UsageEvents.SUBJECT_CHANGED,
      current_question_id: currentQuestion.id,
      current_section_id: section.id,
      timestamp: new Date()
    })
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

  confirm(): void {
    this._exam.examTimedOut.set(false)
    this._exam.confirm()
  }

  endExam() {
    this._exam.examTimedOut.set(false)
    this.closeEndExamSummaryModal()
    this._exam.showSubmitExamModalOnExamEnd()
  }

  closeEndExamSummaryModal() {
    this._exam.showUnattemptedModal.set(false)
  }

  @HostListener('window:keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    const globalModalIsOpened = document.querySelector('.root-modal')
    if (globalModalIsOpened) {
      return
    }

    const target = event.target as HTMLElement
    if (target.classList.contains('close-item')) {
      return
    }

    if (event.key.toLowerCase() === 's') {
      const currentTime = Date.now();
      if (currentTime - this.lastPressTime() < this.threshold()) {
        if (this.canEndExam()) {
          this._exam.showUnattemptedModal.set(true)
        }
      }

      this.lastPressTime.set(currentTime);
    }

    if (!this.store().currentQuestion) {
      return
    }

    let component;

    if (this.store().currentQuestion!.item_type == this.itemTypes().MCQ) {
      component = this.standardChoice() as any
    }

    if (this.store().currentQuestion!.item_type == this.itemTypes().MRQ) {
      component = this.multipleChoice() as any
    }

    if (this.store().currentQuestion!.item_type == this.itemTypes().TRUE_FALSE) {
      component = this.trueOrFalse() as any
    }

    if (this.store().currentQuestion!.item_type == this.itemTypes().YES_NO) {
      component = this.yesOrNo() as any
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

  showCloseAppWithPasswordModal() {
    this._store.updateStore({ showCloseAppWithPasswordModal: true })
  }

  disableContextMenu() {
    if (environment.production) {
      document.addEventListener('contextmenu', blockContextMenuHandler);
    }
  }

  disableCopyAndPaste() {
    document.addEventListener('keydown', (e) => {
      const isCtrl = e.ctrlKey || e.metaKey;

      if (isCtrl && ['a', 'c'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        this._toast.warning('Command not allowed', { position: 'bottom-right' })
      }
    });
  }

  ngOnDestroy(): void {
    this._exam.destroySubscription()
    this.sub.unsubscribe();
    this._exam.cleanUpProctoring()
  }

  handleAutoProctorEvent(msg: any) {
    if (msg.type === 'video_streaming_stopped') {
      this._toast.warning('Video streaming stopped', { duration: 150000, dismissible: true })
    }
  }
}
