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
import { AssessmentFont, BlockType, DeliveryMethod, ExamType, IAssessmentPreLoginData, ICandidateLoginResponse, ItemType, StoreSection } from '../../store/model/types';
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

    let state = localStorage.getItem('exam-preview-mode') || sessionStorage.getItem('exam-preview-mode') ||
                localStorage.getItem('exam-preive-mode') || sessionStorage.getItem('exam-preive-mode');

    if (!!state) {
      try {
        const storeObj = JSON.parse(state);
        const assessment = storeObj.assessment;
        const sections = storeObj.sections || [];

        if (assessment) {
          const settings = assessment.assessmentSettings || assessment.assessment_settings || {};

          // 1. Construct preloginData matching IAssessmentPreLoginData interface
          const mappedPreLogin: IAssessmentPreLoginData = {
            name: assessment.name || preloginData.name,
            description: settings.description || preloginData.description,
            login_field: 'Registration Number',
            id: assessment.id || preloginData.id,
            unique_id: assessment.id || preloginData.unique_id,
            passport_location: preloginData.passport_location,
            delivery_method: (settings.deliveryMethod || settings.delivery_method || preloginData.delivery_method) as DeliveryMethod,
            exam_type: (settings.examType || settings.exam_type || 'EXAMALPHA') as ExamType
          };

          // 2. Map candidate section ids
          const section_ids = sections.map((sec: any, idx: number) => {
            const meta = (assessment.assessmentSections && assessment.assessmentSections[idx]) || {};
            return sec.id || meta.id || `sec-${idx}`;
          });

          // 3. Construct candidate_data
          const candidate_data = {
            name: 'Candidate Preview',
            id: 'CAND-PREVIEW-1',
            minutes_left: settings.durationMinutes || settings.duration_minutes || 60,
            seconds_left: 0,
            login_field_value: 'PREVIEW-VALUE',
            section_ids: section_ids,
            login_times: [],
            passport: preloginData.passport_location
          };

          // 4. Map the sections to SectionsOverview
          const sections_overview = sections.map((sec: any, idx: number) => {
            const meta = (assessment.assessmentSections && assessment.assessmentSections[idx]) || {};
            const sectionSettings = sec.sectionSettings || sec.section_settings || {};
            const duration = sectionSettings.durationInMinutes || sectionSettings.duration_in_minutes || meta.sectionSettings?.durationInMinutes || 0;
            const name = sec.name || meta.name || sec.subjectName || meta.subjectName || `Section ${idx + 1}`;
            
            const totalQuestionsInBlocks = sec.blocks?.reduce((acc: number, blk: any) => {
              const directItemsCount = blk.items?.length || 0;
              const passageItemsCount = blk.passages?.reduce((sum: number, p: any) => sum + (p.items?.length || 0), 0) || 0;
              return acc + directItemsCount + passageItemsCount;
            }, 0) || meta.totalQuestions || 0;

            return {
              duration: duration,
              name: name,
              total_questions: totalQuestionsInBlocks
            };
          });

          // 5. Construct assessment_data
          const assessment_data = {
            name: assessment.name || loginData.assessment_data.name,
            start_exam_instruction: settings.startExamInstruction || settings.start_exam_instruction || '',
            end_exam_instruction: settings.endExamInstruction || settings.end_exam_instruction || '',
            duration_minutes: settings.durationMinutes || settings.duration_minutes || 60,
            display_all_sections_at_once: settings.displayAllSectionsAtOnce ?? settings.display_all_sections_at_once ?? false,
            instruction_read_time_sec: settings.instructionReadTimeSec ?? settings.instruction_read_time_sec ?? 120,
            warn_end_of_reading_time_sec: settings.warnEndOfReadingTimeSec ?? settings.warn_end_of_reading_time_sec ?? 40,
            auto_save_sec: settings.autoSaveSec ?? settings.auto_save_sec ?? 30,
            inactivity_waring_sec: settings.inactivityWaringSec ?? settings.inactivity_waring_sec ?? 0,
            warn_unattempted_questions: settings.warnUnattemptedQuestions ?? settings.warn_unattempted_questions ?? true,
            end_exam_confirmation: settings.endExamConfirmation ?? settings.end_exam_confirmation ?? true,
            allow_end_exam_after_xquestions: settings.allowEndExamAfterXQuestions ?? settings.allow_end_exam_after_xquestions ?? 0,
            preserve_section_order: settings.preserveSectionOrder ?? settings.preserve_section_order ?? false,
            font_size: (settings.fontSize || settings.font_size || 'NORMAL') as AssessmentFont,
            compensatory_time_value: settings.compensatoryTimeMins || settings.compensatory_time_mins || settings.compensatoryTimeValue || settings.compensatory_time_value || 0,
            exam_type: (settings.examType || settings.exam_type || 'EXAMALPHA') as ExamType
          };

          // Helper to map single candidate item
          const mapItem = (item: any, blockId: number) => {
            return {
              id: item.id,
              passage_stimulus: item.passageStimulus || item.passage_stimulus || undefined,
              stimulus: item.stimulus || '',
              options: (item.options || []).map((opt: any) => ({
                label: opt.label,
                value: opt.value
              })),
              stems: item.stems || undefined,
              possible_responses: item.possibleResponses || item.possible_responses || undefined,
              response_positions: item.responsePositions || item.response_positions || undefined,
              item_type: (item.itemType || item.item_type) as ItemType,
              numerical: item.numerical ?? false,
              case_sensitive: item.caseSensitive ?? item.case_sensitive ?? false,
              shuffle_options: item.shuffleOptions ?? item.shuffle_options ?? true,
              multiple_response: item.multipleResponse ?? item.multiple_response ?? false,
              max_words: item.maxWords ?? item.max_words ?? 0,
              max_length: item.maxLength ?? item.max_length ?? 0,
              allow_paste: item.allowPaste ?? item.allow_paste ?? false,
              allow_copy: item.allowCopy ?? item.allow_copy ?? false,
              allow_cut: item.allowCut ?? item.allow_cut ?? false,
              plain_text: item.plainText ?? item.plain_text ?? false,
              responses: [],
              selectedResponse: undefined,
              block_id: blockId,
              revisit: false,
              max_responses: item.maxResponses ?? item.max_responses ?? 1,
              image_data: item.imageData || item.image_data || { image: "", width: null, height: null },
              background_type: item.backgroundType || item.background_type || undefined,
              drawing_writing_split_type: item.drawingWritingSplitType || item.drawing_writing_split_type || "NONE",
              roughWorkResponse: [],
              isPassageItem: !!(item.passageId || item.passage_id)
            };
          };

          // 6. Construct sections_questions
          const sections_questions = sections.map((sec: any, idx: number) => {
            const meta = (assessment.assessmentSections && assessment.assessmentSections[idx]) || {};
            const sectionSettingsSource = sec.sectionSettings || sec.section_settings || {};
            const metaSectionSettings = meta.sectionSettings || {};

            const section_settings = {
              minutes_left: sectionSettingsSource.durationInMinutes || sectionSettingsSource.duration_in_minutes || metaSectionSettings.durationInMinutes || 0,
              seconds_left: 0, 
              duration_in_minutes: sectionSettingsSource.durationInMinutes || sectionSettingsSource.duration_in_minutes || metaSectionSettings.durationInMinutes || 0,
              shuffle_items: sectionSettingsSource.shuffleItems ?? sectionSettingsSource.shuffle_items ?? metaSectionSettings.shuffleItems ?? true,
              shuffle_options: sectionSettingsSource.shuffleOptions ?? sectionSettingsSource.shuffle_options ?? metaSectionSettings.shuffleOptions ?? true,
              allow_calculator: sectionSettingsSource.allowCalculator ?? sectionSettingsSource.allow_calculator ?? metaSectionSettings.allowCalculator ?? false,
              shuffle_blocks: sectionSettingsSource.shuffleBlocks ?? sectionSettingsSource.shuffle_blocks ?? metaSectionSettings.shuffleBlocks ?? true,
              prevent_navigation_to_attempted_items: sectionSettingsSource.preventNavigationToAttemptedItems ?? sectionSettingsSource.prevent_navigation_to_attempted_items ?? metaSectionSettings.preventNavigationToAttemptedItems ?? false,
              section_instruction: sectionSettingsSource.sectionInstruction || sectionSettingsSource.section_instruction || metaSectionSettings.sectionInstruction || undefined
            };

            const question_blocks = (sec.blocks || []).map((blk: any) => {
              const items = (blk.items || []).map((item: any) => mapItem(item, blk.id));
              
              const passages = (blk.passages || []).map((passage: any) => {
                const passageItems = (passage.items || []).map((item: any) => mapItem(item, blk.id));
                return {
                  id: passage.id,
                  stimulus: passage.stimulus || '',
                  items: passageItems
                };
              });

              const totalQuestions = blk.totalQuestions ?? blk.total_questions ?? (items.length + passages.reduce((sum: number, p: any) => sum + p.items.length, 0));

              return {
                id: blk.id,
                total_questions: totalQuestions,
                index: blk.index ?? 1,
                block_type: (blk.blockType || blk.block_type) as BlockType,
                items: items,
                passages: passages
              };
            });

            return {
              id: sec.id || meta.id || `sec-${idx}`,
              name: sec.name || meta.name || sec.subjectName || meta.subjectName || `Section ${idx + 1}`,
              section_settings: section_settings,
              question_blocks: question_blocks
            };
          });

          const mappedLogin: ICandidateLoginResponse = {
            candidate_data,
            sections_overview,
            assessment_data,
            sections_questions
          };

          this._authService.setPreLoginData(mappedPreLogin);
          this._postLoginService.formatLoginDataToStore(mappedLogin);
        } else {
          this._authService.setPreLoginData(preloginData as any);
          this._postLoginService.formatLoginDataToStore(loginData as any);
        }
      } catch (err) {
        console.error('Error parsing exam-preview-mode state', err);
        this._authService.setPreLoginData(preloginData as any);
        this._postLoginService.formatLoginDataToStore(loginData as any);
      }
    } else {
      this._authService.setPreLoginData(preloginData as any);
      this._postLoginService.formatLoginDataToStore(loginData as any);
    }

    this.initiateExam();
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
