import { Component, computed, effect, ElementRef, HostListener, inject, linkedSignal, OnDestroy, signal, TemplateRef, untracked, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '../../store/store';
import { ExamService } from '../../services/exam';
import { AttemptRule, DeliveryMethod, ExamType, ItemType, SectionType, StoreSection } from '../../store/model/types';
import { useShortcut } from '../../utils/helper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { MINIMUM_REASONABLE_DOWNLOAD_SPEED } from '../../utils/constants';
import { driver } from 'driver.js';
import Swal from 'sweetalert2';

// All the components from layout
import { SingleChoice } from '../item-types/single-choice/single-choice';
import { ExamTools } from '../exam-tools/exam-tools';
import { Paginator } from '../paginator/paginator';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TheoryPaginator } from '../theory-paginator/theory-paginator';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { Calculator } from '../calculator/calculator';
import { ScientificCalculator } from '../scientific-calculator/scientific-calculator';
import { PopoverModule } from 'primeng/popover';
import { Overview } from '../overview/overview';

@Component({
  selector: 'app-practice-mode',
  templateUrl: './practice-mode.html',
  styleUrl: '../layout/layout.css',
  imports: [
    SingleChoice,
    ExamTools, Paginator, Dialog, MenuModule, CdkDrag, Calculator, ScientificCalculator, PopoverModule, Overview, TheoryPaginator
  ]
})
export default class PracticeMode implements OnDestroy {
  private _store = inject(Store)
  private _exam = inject(ExamService)
  private breakpointObserver = inject(BreakpointObserver);
  private _router = inject(Router)
  private sub!: Subscription;

  isTargetSpeaking = computed(() => false)

  lastPressTime = signal(0);
  threshold = signal(2000);
  showCalculator = signal<'SIMPLE' | 'SCIENTIFIC' | null>(null);
  autoProctoringFailed = signal(false);
  showItemTypesContainer = signal<boolean>(true)
  itemTypesContainer = viewChild<ElementRef>('itemTypesContainer')
  infractionToastTemplate = viewChild<TemplateRef<HTMLDivElement>>('infractionToastTemplate');
  showUserProfileModal = signal<boolean>(false);
  _blurTimestamp: number | null = null;
  expandedPane = signal<number | null>(0);
  isMobile = signal(true)
  questionFontSize = signal(16)
  itemTypes = signal(ItemType);
  deliveryMethods = signal(DeliveryMethod)
  attemptRules = signal(AttemptRule)
  sectionTypes = signal(SectionType)
  examTypes = Object.values(ExamType)
  paginator = viewChild(Paginator)
  standardChoice = viewChild<any>('standardChoice')
  multipleChoice = viewChild<any>('multipleChoice')
  yesOrNo = viewChild<any>('yesOrNo')
  trueOrFalse = viewChild<any>('trueOrFalse')

  store = computed(() => this._store.store())
  isCandidateSuspendedModalActive = computed(() => false)
  isLogoutNoticeActive = computed(() => false)
  logoutNoticeReason = computed(() => 'Logout notice')
  closeCandidateBrowser = computed(() => null)
  
  allSectionsAttemp = computed(() => this._exam.sectionsSummary()?.reduce((curr, item) => curr + item.summary.attempted.length, 0))
  totalSectionsQuestions = computed(() => this._exam.totalSectionsQuestions())
  currentSectionSummary = computed(() => this._exam.currentSectionSummary())
  showUnattemptedModal = linkedSignal(() => this._exam.showUnattemptedModal())
  currentSectionIndex = computed(() => this.store().sections.findIndex(sec => sec.id === this.store().currentSection?.id))

  isLiveProctoring = computed(() => false)
  isAutoProctoring = computed(() => false)
  isProctoredExam = computed(() => false)

  isExamAlpha = computed(() => false)
  isAutoSaving = computed(() => false)
  isAutoSaveSuccessful = computed(() => true)
  connectionStatus = computed(() => true)
  screenWidth = computed(() => this._exam.screenWidth())
  canEndExam = computed(() => true)
  examEnded = computed(() => false)

  proctoringNetworkSpeed = computed(() => '0 Mbps')
  proctoringLatencyStatus = computed(() => 'good')
  isCheckingProctoringNetwork = computed(() => false)
  proctoringNetworkRetryCountdown = computed(() => 0)
  isProctoringNetworkRetryActive = computed(() => false)
  hasSharedFullScreen = computed(() => true)
  DOWNLOAD_SPEED = MINIMUM_REASONABLE_DOWNLOAD_SPEED

  showNextSectionButton = computed(() => {
    if (!this.store().sections.length) return false
    const onLastItem = this.store().currentQuestionIndex == (this.store().currentSection!.items!.length - 1)
    const sectionIndex = this.store().sections.indexOf(this.store().currentSection as any)
    return onLastItem && (sectionIndex < (this.store().sections.length - 1))
  })

  showPrevSectionButton = computed(() => {
    if (!this.store().sections.length) return false
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
    if (map.length > 0) { map[0].open = true }
    return map
  })

  hasUnattemptedOrRevisited = computed(() => {
    return this.overviewSections().some(s => (s.summary?.unattempted?.length ?? 0) > 0);
  })

  examName = computed(() => 'Practice Mode')

  candidateName = computed(() => {
    const name = this.store().loginData?.candidate_data?.name! ?? 'Student'
    return name.length > 15 ? name.slice(0, 15).concat('...') : name
  })

  interactiveDriver: any = null;
  isInteractiveTourActive = signal(false);
  interactiveStep = signal(0);
  isLeavingPractice = false;
  
  practiceTimerInterval: any = null;
  practiceTimeLeft = signal(300);

  constructor() {
    this.sub = this.breakpointObserver
      .observe('(min-width: 1280px)')
      .subscribe(() => {
        const width = window.innerWidth;
        this._exam.screenWidth.set(width);
      }); 

    effect(() => {
      if (!this.isInteractiveTourActive()) return;

      const step = this.interactiveStep();
      const currentQIdx = this.store().currentQuestionIndex;
      const responses = this.store().currentQuestion?.responses || [];
      const showModal = this._exam.showUnattemptedModal();
      const currentQId = this.store().currentQuestion?.id;
      const isFlagged = currentQId ? this._exam.isItemFlagged(currentQId) : false;

      untracked(() => {
        if (step === 1 || step === 2 || step === 5 || step === 8 || step === 9 || step === 12 || step === 15) {
          // Handled by onNextClick in the step config
          if (step === 9 && isFlagged) {
            this.advanceInteractiveTour(10);
          }
        } else if (step === 3 && currentQIdx === 0 && responses.length > 0) {
          this.advanceInteractiveTour(4); // Paginator to 2
        } else if (step === 4 && currentQIdx === 1) {
          this.advanceInteractiveTour(5); // Read Q2
        } else if (step === 6 && currentQIdx === 1 && responses.length > 0) {
          this.advanceInteractiveTour(7); // Next Button to 3
        } else if (step === 7 && currentQIdx === 2) {
          this.advanceInteractiveTour(8); // Read Q3
        } else if (step === 10 && currentQIdx === 2 && responses.length > 0) {
          this.advanceInteractiveTour(11); // Paginator to 4
        } else if (step === 11 && currentQIdx === 3) {
          this.advanceInteractiveTour(12); // Read Q4
        } else if (step === 13 && currentQIdx === 3 && responses.length > 0) {
          this.advanceInteractiveTour(14); // Next Button to 5
        } else if (step === 14 && currentQIdx === 4) {
          this.advanceInteractiveTour(15); // Read Q5
        } else if (step === 16 && currentQIdx === 4 && responses.length > 0) {
          this.advanceInteractiveTour(17); // Submit
        } else if (step === 17 && showModal) {
          setTimeout(() => {
            this.advanceInteractiveTour(18); // Confirm
          }, 300);
        }
      });
    });
  }

  advanceInteractiveTour(nextStep: number) {
    this.interactiveStep.set(nextStep);
    this.interactiveDriver?.moveNext();
  }

  startPracticeTimer() {
    this.practiceTimeLeft.set(300); // 5 minutes
    this._exam.timeDisplay.set({ min: 5, sec: 0 });
    
    if (this.practiceTimerInterval) clearInterval(this.practiceTimerInterval);
    
    this.practiceTimerInterval = setInterval(() => {
      this.practiceTimeLeft.update(v => Math.max(0, v - 1));
      const timeLeft = this.practiceTimeLeft();
      this._exam.timeDisplay.set({ min: Math.floor(timeLeft / 60), sec: timeLeft % 60 });
      
      if (timeLeft === 0) {
        this.stopPracticeTimer();
      }
    }, 1000);
  }

  stopPracticeTimer() {
    if (this.practiceTimerInterval) {
      clearInterval(this.practiceTimerInterval);
      this.practiceTimerInterval = null;
    }
  }

  async ngOnInit() {
    this.isMobile.set(window.matchMedia('(max-width: 768px)').matches)
    
    // Set up practice mode dummy data
    this.initMockData();

    // Start tour
    setTimeout(() => {
        this.startOverviewTour();
    }, 800)
  }

  initMockData() {
    const createMockItems = (startIndex: number, sectionName: string) => 
      Array.from({ length: 5 }).map((_, i) => ({
        id: `mock-q-${startIndex + i}`,
        stimulus: `<p>This is practice question ${i + 1} for ${sectionName}. What is the correct answer?</p>`,
        options: [
          { label: 'Option A', value: 'A' },
          { label: 'Option B', value: 'B' },
          { label: 'Option C', value: 'C' },
          { label: 'Option D', value: 'D' }
        ],
        item_type: ItemType.MCQ,
        responses: [],
        max_responses: 1,
        revisit: false,
        block_id: startIndex,
        isPassageItem: false,
        roughWorkResponse: [],
        drawing_writing_split_type: '',
        image_data: { image: '', width: 0, height: 0 },
        storeMapIdex: startIndex + i
      }));

    const mathItems = createMockItems(0, 'Mathematics');
    const englishItems = createMockItems(5, 'English Language');

    const mathSection: StoreSection = {
      id: 'mock-section-1',
      name: 'Mathematics',
      items: mathItems,
      section_type: SectionType.OBJECTIVE,
      blocks: [
        {
          id: 1,
          sectionName: 'Mathematics',
          blockName: 'Block 1',
          attempt_rule: AttemptRule.ATTEMPT_ALL,
          items_to_attempt: 5,
          questions: mathItems.map(q => ({ id: q.id, storeMapIdex: q.storeMapIdex }))
        }
      ]
    };

    const englishSection: StoreSection = {
      id: 'mock-section-2',
      name: 'English Language',
      items: englishItems,
      section_type: SectionType.OBJECTIVE,
      blocks: [
        {
          id: 2,
          sectionName: 'English Language',
          blockName: 'Block 1',
          attempt_rule: AttemptRule.ATTEMPT_ALL,
          items_to_attempt: 5,
          questions: englishItems.map(q => ({ id: q.id, storeMapIdex: q.storeMapIdex }))
        }
      ]
    };

    this._store.updateStore({
      sections: [mathSection, englishSection],
      currentSection: mathSection,
      currentQuestion: mathItems[0],
      currentQuestionIndex: 0
    });

    this.startPracticeTimer();
  }

  startOverviewTour() {
    const mathSection = this.store().sections[0];
    this._store.updateStore({
      currentQuestion: mathSection.items[1],
      currentQuestionIndex: 1 // Start at 1 to show the Previous button
    });

    setTimeout(() => {
      const isMobile = window.innerWidth <= 500;
      const subjectSwitcherSelector = isMobile ? '.sm\\:hidden.bg-gray-100' : '.divide-gray-200.snap-x';

      const driverObj = driver({
        showProgress: true,
        allowClose: false,
        showButtons: ['next', 'previous', 'close'],
        onPopoverRender: (popover, opts) => {
          const { driver, state } = opts;
          const currentIndex = state.activeIndex || 0;

          if (popover.footerButtons.querySelector('.leave-practice-btn')) return;
          
          const leaveBtn = document.createElement('button');
          leaveBtn.innerText = 'Finish';
          leaveBtn.style.backgroundColor = '#fff';
          leaveBtn.style.color = '#dc2626';
          leaveBtn.style.border = '1px solid #fca5a5';
          leaveBtn.style.padding = '4px 10px';
          leaveBtn.style.borderRadius = '5px';
          leaveBtn.style.fontSize = '13px';
          leaveBtn.style.cursor = 'pointer';

          leaveBtn.onclick = (e) => {
             e.preventDefault();
             e.stopPropagation();
             
             this.isLeavingPractice = true;
             driver.destroy();

             Swal.fire({
               title: 'Leave Practice?',
               text: 'Are you sure you want to exit the practice simulation?',
               icon: 'warning',
               showCancelButton: true,
               confirmButtonText: 'Yes, exit',
               cancelButtonText: 'Cancel',
               confirmButtonColor: '#dc2626',
               cancelButtonColor: '#6b7280',
             }).then((result) => {
               if (result.isConfirmed) {
                 this._store.updateStore({ sections: [], currentSection: null, currentQuestion: null });
                 this._router.navigate(['/proctored/onboarding/start-exam']);
               } else {
                 setTimeout(() => driver.drive(currentIndex), 100);
               }
             });
          };

          popover.footerButtons.style.display = 'flex';
          popover.footerButtons.style.gap = '5px';
          popover.footerButtons.prepend(leaveBtn);
        },
        onDestroyed: () => {
          if (this.isLeavingPractice) {
            this.isLeavingPractice = false;
            return;
          }
          this._store.updateStore({
            currentQuestion: mathSection.items[0],
            currentQuestionIndex: 0
          });
          this.promptInteractiveTour();
        },
        steps: [
        { 
          element: subjectSwitcherSelector, 
          popover: { 
            title: 'Switch Subjects', 
            description: 'If your exam has multiple subjects or sections, you can switch between them here at any time, or simply press the corresponding number key (1, 2, 3...) on your keyboard to switch directly.', 
            side: 'bottom', align: 'start' 
          }
        },
        { 
          element: 'app-exam-tools .border.border-gray-200', 
          popover: { 
            title: 'Exam Timer', 
            description: 'Keep an eye on this timer. It shows how much time you have left.', 
            side: 'bottom', align: 'start' 
          }
        },
        { 
          element: 'app-exam-tools button.bg-red-700\\!', 
          popover: { 
            title: 'Submit Exam', 
            description: 'When you have finished answering all questions, click this button or press the "S" key twice quickly (S-S) on your keyboard to submit your exam. It will display a summary of any unanswered questions before final submission.', 
            side: 'bottom', align: 'start' 
          }
        },
        { 
          element: 'app-exam-tools button[pTooltip="Connection status"]', 
          popover: { 
            title: 'Connection Status', 
            description: 'This icon shows that your connection is good. Watch out if it turns red, as it means your network is unstable!', 
            side: 'bottom', align: 'start' 
          }
        },
        { 
          element: 'app-exam-tools button[pTooltip="Calculator"]', 
          popover: { 
            title: 'Calculator', 
            description: 'Need to do some math? Use this on-screen calculator.', 
            side: 'bottom', align: 'start' 
          }
        },
        { 
          element: 'app-exam-tools button[pTooltip="Font size"]', 
          popover: { 
            title: 'Adjust Font Size', 
            description: 'Click here to increase or decrease the text size for better readability.', 
            side: 'bottom', align: 'start' 
          }
        },
        { 
          element: '#tour-paginator', 
          popover: { 
            title: 'Question Navigator', 
            description: 'You can quickly jump to any question using this panel.', 
            side: 'bottom', align: 'start' 
          }
        },
        { 
          element: 'app-question-tools > div > button:nth-child(1)', 
          popover: { 
            title: 'Show Question', 
            description: 'Click this to open the question and any passage in a larger, focused modal.', 
            side: 'bottom', align: 'start' 
          }
        },
        { 
          element: 'app-question-tools > div > button:nth-child(2)', 
          popover: { 
            title: 'Revisit Later', 
            description: 'Not sure about the answer? Click here to mark this question so you can review it again later.', 
            side: 'bottom', align: 'start' 
          }
        },
        { 
          element: 'app-question-tools button[title*="Flag"]', 
          popover: { 
            title: 'Flag Question', 
            description: 'If you notice an error with a question (such as missing options, unclear diagrams, or incorrect content), click here to report and flag it.', 
            side: 'bottom', align: 'start' 
          }
        },
        { 
          element: 'app-question-tools > div > button:last-child', 
          popover: { 
            title: 'Instructions', 
            description: 'Click this info icon to review the exam or section instructions at any time.', 
            side: 'bottom', align: 'start' 
          }
        },
        { 
          element: '#tour-options', 
          popover: { 
            title: 'Answering', 
            description: 'You can click on any option to select it, or simply use your keyboard by pressing A, B, C, or D.', 
            side: 'top', align: 'start' 
          }
        },
        { 
          element: 'app-answer-tools', 
          popover: { 
            title: 'Undo Answer', 
            description: 'After you select an answer, an "Undo answer" button will appear here allowing you to clear your choice.', 
            side: 'top', align: 'start' 
          }
        },
        { 
          element: '#tour-prev-btn', 
          popover: { 
            title: 'Moving Backward', 
            description: 'You can click this button or press the "P" key on your keyboard to go back to the previous question.', 
            side: 'top', align: 'start' 
          }
        },
        { 
          element: '#tour-next-btn', 
          popover: { 
            title: 'Moving Forward', 
            description: 'You can click this button or press the "N" key on your keyboard to proceed to the next question.', 
            side: 'top', align: 'start' 
          }
        },
        { 
          element: '#tour-end-btn',  
          popover: { 
            title: 'Review Your Attempts', 
            description: 'Click here or press the "S" key twice quickly (S-S) on your keyboard to review which questions you have answered and to submit or end the exam.', 
            side: 'top', align: 'start' 
          }
        }
      ]
      });
      driverObj.drive();
    }, 100);
  }

  promptInteractiveTour() {
    Swal.fire({
      title: 'Tour Complete!',
      text: 'Would you like to take a guided interactive practice test to see how it works in action?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0e7087',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, start practice!',
      cancelButtonText: 'No, thanks'
    }).then((result) => {
      if (result.isConfirmed) {
        this.initMockData(); 
        this.startInteractivePracticeTour();
      }
    });
  }

  startInteractivePracticeTour() {
    this.isInteractiveTourActive.set(true);
    this.interactiveStep.set(1);
    
    this.interactiveDriver = driver({
      showProgress: true,
      showButtons: ['close'],
      allowClose: false,
      onDestroyStarted: () => {
        this.isInteractiveTourActive.set(false);
        this.interactiveDriver?.destroy();
      },
      onPopoverRender: (popover, opts) => {
        const { driver, state } = opts;
        const currentIndex = state.activeIndex || 0;

        if (popover.footerButtons.querySelector('.leave-practice-btn')) return;
        
        const leaveBtn = document.createElement('button');
        leaveBtn.innerText = 'Finish';
        leaveBtn.style.backgroundColor = '#fff';
        leaveBtn.style.color = '#dc2626';
        leaveBtn.style.border = '1px solid #fca5a5';
        leaveBtn.style.padding = '4px 10px';
        leaveBtn.style.borderRadius = '5px';
        leaveBtn.style.fontSize = '13px';
        leaveBtn.style.cursor = 'pointer';

        leaveBtn.onclick = (e) => {
           e.preventDefault();
           e.stopPropagation();

           this.isLeavingPractice = true;
           driver.destroy();

           Swal.fire({
             title: 'Leave Practice?',
             text: 'Are you sure you want to exit the practice simulation?',
             icon: 'warning',
             showCancelButton: true,
             confirmButtonText: 'Yes, exit',
             cancelButtonText: 'Cancel',
             confirmButtonColor: '#dc2626',
             cancelButtonColor: '#6b7280',
           }).then((result) => {
             if (result.isConfirmed) {
               this._store.updateStore({ sections: [], currentSection: null, currentQuestion: null });
               this._router.navigate(['/proctored/onboarding/start-exam']);
             } else {
               this.isInteractiveTourActive.set(true);
               setTimeout(() => driver.drive(currentIndex), 100);
             }
           });
        };

        popover.footerButtons.style.display = 'flex';
        popover.footerButtons.style.gap = '5px';
        popover.footerButtons.prepend(leaveBtn);
      },
      steps: [
        { 
          element: 'app-exam-tools .border.border-gray-200', 
          popover: { title: 'Exam Timer', description: 'Keep an eye on the time! You have 5 minutes to finish this practice. Click Next when ready.', side: 'bottom', align: 'start', showButtons: ['next'], onNextClick: () => this.advanceInteractiveTour(2) }
        },
        { 
          element: 'app-single-choice .lg\\:w-1\\/2:first-child .bg-white', 
          popover: { title: 'Read the Question', description: 'Read Question 1 carefully before answering. Click Next when ready.', side: 'right', align: 'start', showButtons: ['next'], onNextClick: () => this.advanceInteractiveTour(3) }
        },
        { 
          element: 'app-single-choice .p-5 > div:nth-child(1)', 
          popover: { title: 'Answer Question 1', description: 'You can click directly on Option A, or simply press the "A" key on your keyboard to select it.', side: 'top', align: 'start' }
        },
        { 
          element: 'app-paginator .flex-1 > button:nth-child(2)', 
          popover: { title: 'Use the Paginator', description: 'Instead of the Next button, click "2" here at the top to jump directly to Question 2.', side: 'bottom', align: 'start' }
        },
        { 
          element: 'app-single-choice .lg\\:w-1\\/2:first-child .bg-white', 
          popover: { title: 'Read the Question', description: 'Read Question 2 carefully. Click Next when ready.', side: 'right', align: 'start', showButtons: ['next'], onNextClick: () => this.advanceInteractiveTour(6) }
        },
        { 
          element: 'app-single-choice .p-5 > div:nth-child(2)', 
          popover: { title: 'Answer Question 2', description: 'Select Option B by either clicking on it, or pressing the "B" key on your keyboard.', side: 'top', align: 'start' }
        },
        { 
          element: '#tour-next-btn', 
          popover: { title: 'Use the Next Button', description: 'You can click the Next button here, or press the "N" key on your keyboard to proceed to Question 3.', side: 'top', align: 'start' }
        },
        { 
          element: 'app-single-choice .lg\\:w-1\\/2:first-child .bg-white', 
          popover: { title: 'Read the Question', description: 'Read Question 3 carefully. Click Next when ready.', side: 'right', align: 'start', showButtons: ['next'], onNextClick: () => this.advanceInteractiveTour(9) }
        },
        { 
          element: 'app-question-tools button[title*="Flag"]', 
          popover: { title: 'Flag Question', description: 'If you ever spot a mistake in a question or diagram, you can click this Flag button to report it. Click Next to continue.', side: 'bottom', align: 'start', showButtons: ['next'], onNextClick: () => this.advanceInteractiveTour(10) }
        },
        { 
          element: 'app-single-choice .p-5 > div:nth-child(3)', 
          popover: { title: 'Answer Question 3', description: 'Select Option C by clicking it or pressing the "C" key.', side: 'top', align: 'start' }
        },
        { 
          element: 'app-paginator .flex-1 > button:nth-child(4)', 
          popover: { title: 'Use the Paginator', description: 'Let\'s use the paginator again. Click "4" to go to Question 4.', side: 'bottom', align: 'start' }
        },
        { 
          element: 'app-single-choice .lg\\:w-1\\/2:first-child .bg-white', 
          popover: { title: 'Read the Question', description: 'Read Question 4 carefully. Click Next when ready.', side: 'right', align: 'start', showButtons: ['next'], onNextClick: () => this.advanceInteractiveTour(13) }
        },
        { 
          element: 'app-single-choice .p-5 > div:nth-child(4)', 
          popover: { title: 'Answer Question 4', description: 'Select Option D by clicking it or pressing the "D" key.', side: 'top', align: 'start' }
        },
        { 
          element: '#tour-next-btn', 
          popover: { title: 'Use the Next Button', description: 'Click Next or press the "N" key on your keyboard to go to the final question.', side: 'top', align: 'start' }
        },
        { 
          element: 'app-single-choice .lg\\:w-1\\/2:first-child .bg-white', 
          popover: { title: 'Read the Question', description: 'Read Question 5 carefully. Click Next when ready.', side: 'right', align: 'start', showButtons: ['next'], onNextClick: () => this.advanceInteractiveTour(16) }
        },
        { 
          element: 'app-single-choice .p-5 > div:nth-child(2)', 
          popover: { title: 'Answer Question 5', description: 'Select Option B by clicking it or pressing the "B" key.', side: 'top', align: 'start' }
        },
        { 
          element: 'app-exam-tools button.bg-red-700\\!', 
          popover: { title: 'Submit Exam', description: 'You have answered enough questions! Click Submit Exam or press the "S" key twice quickly (S-S) on your keyboard to finish the practice.', side: 'bottom', align: 'start' }
        },
        { 
          element: 'p-dialog button.bg-red-600', 
          popover: { title: 'Confirm Submission', description: 'Click here to finally end the practice and submit! This will take you to the onboarding page.', side: 'top', align: 'start' }
        }
      ]
    });
    this.interactiveDriver.drive();
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
    if (currentSection?.id == section.id) return
    
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

  confirm(): void {
    this.endPractice();
  }

  endExam() {
    this.showUnattemptedModal.set(true);
  }

  endPractice() {
    this._exam.showUnattemptedModal.set(false);
    
    if (this.interactiveDriver) {
      this.isInteractiveTourActive.set(false);
      this.interactiveDriver.destroy();
    }

    Swal.fire({
      title: 'Practice Exam Submitted!',
      text: 'You have successfully completed the practice simulation. What would you like to do next?',
      icon: 'success',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Retake Practice',
      denyButtonText: 'Explore on My Own',
      cancelButtonText: 'Exit to Login',
      confirmButtonColor: '#0e7087',
      denyButtonColor: '#10b981',
      cancelButtonColor: '#ef4444',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.initMockData();
        this.startInteractivePracticeTour();
      } else if (result.isDenied) {
        this.initMockData();
        Swal.fire({
          title: 'Explore Mode',
          text: 'You are now free to explore the interface. When you are done, click "Submit Exam" again and choose "Exit to Login" to leave.',
          icon: 'info',
          confirmButtonColor: '#0e7087'
        });
      } else {
        this._store.updateStore({ sections: [], currentSection: null, currentQuestion: null });
        this._router.navigate(['/proctored/onboarding/start-exam']);
      }
    });
  }

  closeEndExamSummaryModal() {
    this._exam.showUnattemptedModal.set(false)
  }

  isUnattempted(index: number, sectionSummary: any): boolean {
    const summary = sectionSummary?.summary;
    return summary?.unattempted.includes(index) ?? false;
  }

  isRevisit(index: number, sectionSummary: any): boolean {
    const summary = sectionSummary?.summary;
    return summary?.revisits.includes(index) ?? false;
  }

  showCloseAppWithPasswordModal() {}

  @HostListener('window:keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    const target = event.target as HTMLElement
    const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
    if (isInput) return;

    if (event.key.toLowerCase() === 's') {
      const currentTime = Date.now();
      if (currentTime - this.lastPressTime() < this.threshold()) {
        if (this.canEndExam()) {
          this._exam.showUnattemptedModal.set(true);
        }
      }
      this.lastPressTime.set(currentTime);
    }

    if (!this.store().currentQuestion) return;

    let component;
    if (this.store().currentQuestion!.item_type == this.itemTypes().MCQ) {
      component = this.standardChoice() as any
    }

    useShortcut(event.key, this.store().currentQuestionIndex, this.paginator()!, this.totalSectionsQuestions(), this.store().currentQuestion!, component)
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
    
    if (isInput) return;

    if (event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    const num = parseInt(event.key, 10);
    if (!isNaN(num) && num >= 1 && num <= 9) {
      const targetIndex = num - 1;
      const sections = this.store().sections;
      if (sections && targetIndex < sections.length) {
        const targetSection = sections[targetIndex];
        if (this.store().currentSection?.id !== targetSection.id) {
          this.selectSectionInFullMode(targetSection);
        }
      }
      return;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.stopPracticeTimer();
    this._store.updateStore({ sections: [], currentSection: null, currentQuestion: null });
  }
}
