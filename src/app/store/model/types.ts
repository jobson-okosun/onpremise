import { ICandidateEvent } from './events/events.interface';

export interface ExamSettings {
  exam_mode: DeploymentMode
  prelogin_datas: IAssessmentPreLoginData[]
}

export enum DeploymentMode {
  Online = 'Online',
  Offline = 'Offline',
}

export interface IAssessmentPreLoginData {
  name: string;
  description: string;
  login_field: string;
  id: string;
  unique_id: string;
  passport_location: string;
  delivery_method: DeliveryMethod;
  exam_type: ExamType
  batch_id?: string;
  r_id?: string;
}

export enum DeliveryMethod {
  LIVE_PROCTORING = "LIVE_PROCTORING",
  AUTO_PROCTORING = "AUTO_PROCTORING",
  ONLINE_NO_PROCTORING = "ONLINE_NO_PROCTORING",
  ON_PREMISE_SECURE_BROWSER = "ON_PREMISE_SECURE_BROWSER",
  ON_PREMISE_NO_SECURE_BROWSER = "ON_PREMISE_NO_SECURE_BROWSER",
  E_PAPER = "E_PAPER",
}

export interface ICandidateLoginDTO {
  login_value: string;
  assessment_id: string;
  unique_id: string;
  exam_id: string;
}

export interface Slide {
  title: string;
  description: string;
  image: string;
  animation: string;
}

export interface ICandidateLoginResponse {
  candidate_data: ICandidateData;
  sections_overview: Array<ICandidateSectionsOverview>;
  assessment_data: ICandidateAssessmentData;
  sections_questions: Array<ICandidateSectionQuestions>;
  events_session_id: string;
  resume_elapsed_ms: number;
  last_sequence: number
}

export interface ICandidateData {
  name: string;
  id: string;
  minutes_left: number;
  seconds_left: number;
  login_field_value: string;
  section_ids: Array<string>;
  login_times: Array<string>;
  passport: string;
  participant_id?: string
  accessibility_support: AccessibilitySupport;
}

export enum AccessibilitySupport {
 YES = 'YES',
  NO = 'NO'
}

export interface ICandidateSectionsOverview {
  duration: number;
  name: string;
  total_questions: number;
}

export interface ICandidateAssessmentData {
  name: string;
  start_exam_instruction?: string;
  end_exam_instruction?: string;
  duration_minutes: number;
  display_all_sections_at_once: boolean;
  instruction_read_time_sec: number;
  warn_end_of_reading_time_sec: number;
  auto_save_sec: number;
  inactivity_waring_sec: number;
  warn_unattempted_questions: boolean;
  end_exam_confirmation: boolean;
  allow_end_exam_after_xquestions: number;
  preserve_section_order: boolean;
  font_size: AssessmentFont;
  compensatory_time_value: number;
  exam_type: ExamType
}

export interface ICandidateSectionQuestions {
  id: string;
  name: string;
  section_settings: ICandidateSectionSettings;
  question_blocks: Array<ICandidateSectionBlocks>;
  section_type: SectionType
}

export enum SectionType {
  OBJECTIVE = "OBJECTIVE",
  THEORY = "THEORY"
}

export enum AssessmentFont {
  SMALL = "SMALL",
  DEFAULT = "DEFAULT",
  NORMAL = "NORMAL",
  LARGE = " LARGE",
}

export interface ICandidateSectionSettings {
  minutes_left: number;
  seconds_left: number;
  duration_in_minutes: number;
  shuffle_items: boolean;
  shuffle_options: boolean;
  allow_calculator: boolean;
  shuffle_blocks: boolean;
  prevent_navigation_to_attempted_items: boolean;
  section_instruction?: string;
}

export interface ICandidateSectionBlocks {
  id: number;
  total_questions: number;
  index: number;
  block_type: BlockType;
  items: Array<ICandidateItem>;
  passages: Array<ICandidatePassageItem>;

  name: string
  attempt_rule: AttemptRule
  items_to_attempt: number
  instruction?: string
}

export enum AttemptRule {
  ATTEMPT_ALL = "ATTEMPT_ALL",
  ATTEMPT_ANY = "ATTEMPT_ANY"
}

export enum BlockType {
  SINGLE_QUESTIONS = "SINGLE_QUESTIONS",
  PASSAGES = "PASSAGES",
}

export class ICandidateItem {
  id: string;
  passage_stimulus?: string;
  stimulus: string;
  options: Array<IOptionDTO>;
  stems?: Array<string>;
  possible_responses?: Array<IPossibleResponse>;
  response_positions?: Array<IResponsePosition>;
  distractors?: Array<IOptionDTO>;
  item_type: ItemType;
  numerical?: boolean;
  case_sensitive?: boolean;
  shuffle_options?: boolean;
  multiple_response?: boolean;
  max_words?: number;
  max_length?: number;
  allow_paste?: boolean;
  allow_copy?: boolean;
  allow_cut?: boolean;
  plain_text?: boolean;
  responses: Array<string>;
  selectedResponse?: string;
  block_id: number;
  revisit: boolean = false;
  max_responses: number;
  image_data: { image: string; width: any; height: any };
  background_type?: string
  splitMode?: string
  drawing_writing_split_type: string
  lastUpdated?: any
  isPassageItem: boolean
  roughWorkResponse: string[]
  sub_questions?: SubQuestionUI[]
  storeMapIdex: number
}

export interface SubQuestionUI {
  id: string;
  stimulus: string;
  score: number;
  background_type: string;
  children: SubQuestionUI[];
}

export interface ICandidatePassageItem {
  id: string;
  stimulus: string;
  items: Array<ICandidateItem>;
}

export interface IOptionDTO {
  label: string;
  value: string;
}

export interface IPossibleResponse {
  responses: Array<IOptionDTO>;
}
export interface IResponsePosition {
  x: number;
  y: number;
  direction: ResponsePositionDirection
  width: number;
  height: number;
}

export enum ResponsePositionDirection {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

export enum ItemType {
  MCQ = 'MCQ',
  MRQ = 'MRQ',
  ESSAY_PLAIN_TEXT = 'ESSAY_PLAIN_TEXT',
  ESSAY_RICH_TEXT = 'ESSAY_RICH_TEXT',
  CLOZE_TEXT = 'CLOZE_TEXT',
  CLOZE_DROPDOWN = 'CLOZE_DROPDOWN',
  CLOZE_RADIO = 'CLOZERADIO',
  SHORT_TEXT = 'SHORT_TEXT',
  TRUE_FALSE = 'TRUE_FALSE',
  YES_NO = 'YES_NO',
  ASSOCIATION = 'ASSOCIATION',
  CHOICE_MATRIX = 'CHOICE_MATRIX',
  ORDER_LIST = 'ORDER_LIST',
  CLOZE_TEXT_IMAGE = 'CLOZE_TEXT_IMAGE',
  CLOZE_DROPDOWN_IMAGE = 'CLOZE_DROPDOWN_IMAGE',
  IMAGE_DRAG_AND_DROP = 'IMAGE_DRAG_AND_DROP',
  DRAWING_AND_WRITING = 'DRAWING_AND_WRITING'
}

export interface computedSection { name: string, id: string, total: number }
export const AlphabetList: string[] = ["(A)", "(B)", "(C)", "(D)", "(E)", "(F)", "(G)"];

export interface StoreSection {
  id: string,
  name: string,
  items: ICandidateItem[],
  section_type: SectionType,
  blocks: StoreSectionBlock[]
}

export interface StoreSectionBlock {
  attempt_rule: AttemptRule
  instruction?: string
  questions: Pick<ICandidateItem, 'storeMapIdex' | 'id'>[]
  items_to_attempt: number,
  id: number
  sectionName: string
  blockName: string
  sectionInstruction?: string
}

export interface Ping {
  message: string,
  timestamp?: string,
}

export interface Pong {
  message: String,
  timestamp: string,
  server_status: String,
}

export interface BatteryStatus {
  battery: string,
  data?: {
    percentage: number,
    charging: boolean
  }
}

export interface ICandidateAutoSave {
  sections_map: Record<string, { items: Array<ICandidateAutoSaveItems> }>;
  section_times: Record<string, ICandidateSectionTimes>;
  minutes: number;
  seconds: number;
  cand_id: string;
  battery_status?: BatteryStatus;
  pending_events?: ICandidateEvent[];
}

export class ICandidateAutoSaveItems {
  item_id: string;
  blk_id: number;
  answers: Array<string>;
  passage_id?: string;
  revisit_later: boolean = false;
  item_type: string
}

export interface ICandidateSectionTimes {
  minutes: number;
  seconds: number;
}

export interface ICandidateEndExamData {
  timed_out: boolean;
  autosave: ICandidateAutoSave;
  is_drawing_writing: boolean
}

export interface ICandidationEndExamResponse {
  end_instruction: string;
  pass_mark: {
    score_total: number;
    pass_fail: string;
    score_per_section: Array<{ section_name: string; score: number }>;
  };
}

export interface ICandidateAutoSaveResponse {
  auto_saved: boolean;
  compensatory_time_added: boolean;
  message_from_admin: string;
  log_out: ILogOutParticipant;
  exam_ended_response: ICandidationEndExamResponse;
  suspended: boolean;
  close_browser: boolean;
}

export interface ILogOutParticipant {
  logout: boolean;
  reason: string;
}

export type OnboardingStepId =
  | 'details'
  | 'system-check'
  | 'device-check-audio'
  | 'device-check-video'
  | 'facial'
  | 'guidelines'
  | 'rules'
  | 'start';

export interface OnboardingStep {
  id: OnboardingStepId;
  label: string;
  icon: string;
  route: string;
  requiresCompletion: boolean;
}

export type StepCompletionStatus = Record<OnboardingStepId, boolean>;

export interface OnboardingSettings {
  requireSystemCheck: boolean;
  requireAudioCheck: boolean;
  requireVideoCheck: boolean;
  requireFacialAuth: boolean;
  showGuidelines: boolean;
  showRules: boolean;
}

export const DEFAULT_ONBOARDING_SETTINGS: OnboardingSettings = {
  requireSystemCheck: true,
  requireAudioCheck: true,
  requireVideoCheck: true,
  requireFacialAuth: true,
  showGuidelines: true,
  showRules: true,
};

export const ALL_ONBOARDING_STEPS: OnboardingStep[] = [
  { id: 'details', label: 'Details', icon: 'info', route: '/proctored/onboarding/overview', requiresCompletion: false },
  { id: 'system-check', label: 'System', icon: 'monitor', route: '/proctored/onboarding/system-check', requiresCompletion: true },
  { id: 'device-check-audio', label: 'Audio', icon: 'mic', route: '/proctored/onboarding/device-check/audio', requiresCompletion: true },
  { id: 'device-check-video', label: 'Video', icon: 'camera', route: '/proctored/onboarding/device-check/video', requiresCompletion: true },
  // { id: 'facial', label: 'Photo', icon: 'user', route: '/proctored/onboarding/facial-biometric', requiresCompletion: true },
  { id: 'guidelines', label: 'Guidelines', icon: 'book', route: '/proctored/onboarding/guidelines', requiresCompletion: false },
  { id: 'rules', label: 'Rules', icon: 'clipboard', route: '/proctored/onboarding/rules', requiresCompletion: false },
  { id: 'start', label: 'Start', icon: 'play', route: '/proctored/onboarding/start-exam', requiresCompletion: false },
];

export const INITIAL_STEP_COMPLETION: StepCompletionStatus = {
  'details': true,
  'system-check': false,
  'device-check-audio': false,
  'device-check-video': false,
  'facial': false,
  'guidelines': true,
  'rules': true,
  'start': true
};

export enum ExamType {
  EXAMALPHA = 'EXAMALPHA',
  UTME = 'UTME',
  MOCK = 'MOCK',
  DUMMY = 'DUMMY'
}

export interface CandidateInfractionEntry {
  id: string;
  label: string;
  strikes: number;
  time: string;
  timestamp: string;
  type: "INFRINGMENT" | "INFO" | "WARNING";
  maxStrikeReached?: boolean;
  frameId?: number;
  savedFramePath?: string;
  color: string
}

export const INFRACTION_LABELS = {
  0: "Unspecified",
  1: "Looking Away",
  2: "Face Not Centered",
  3: "Multiple Faces",
  4: "Face Mismatch",
  5: "Face Not Detected",
  6: "Mobile Phone Detected",
  7: "Book Detected",
  8: "Headphone Detected",
  9: "External Keyboard",
  10: "External Mouse",
  11: "Calculator Detected",
  12: "Prohibited Object",
  13: "Talking Detected",
  14: "Background Voices",
  15: "App Minimisation",
  16: "Screenshot Detected",
  17: "Screen Sharing",
  18: "External Screen",
  19: "Screen Recording",
  20: "Copy/Paste Attempt",
  21: "VPN Detected",
  22: "Proxy Detected",
  23: "Network Instability",
  24: "Camera Disabled",
  25: "Microphone Disabled",
};

export const INFRACTION_COLORS = {
  0: "blue-500",
  1: "yellow-500",
  2: "yellow-500",
  3: "red-500",
  4: "red-500",
  5: "red-500",
  6: "red-500",
  7: "red-500",
  8: "red-500",
  9: "red-500",
  10: "red-500",
  11: "red-500",
  12: "red-500",
  13: "yellow-500",
  14: "yellow-500",
  15: "red-500",
  16: "red-500",
  17: "red-500",
  18: "red-500",
  19: "red-500",
  20: "red-500",
  21: "red-500",
  22: "red-500",
  23: "red-500",
  24: "red-500",
  25: "red-500",
}

export enum UsageEvents {
  SUBJECT_CHANGED = 'SUBJECT_CHANGED',
  NEXT_QUESTION = 'NEXT_QUESTION',
  PREVIOUS_QUESTION = 'PREVIOUS_QUESTION',
  NEXT_SECTION = 'NEXT_SECTION',
  PREVIOUS_SECTION = 'PREVIOUS_SECTION',
  QUESTION_NUMBER_SELECTED = 'QUESTION_NUMBER_SELECTED',
  ANSWER_SELECTED = 'ANSWER_SELECTED',
  ANSWER_SELECTED_CHANGED = 'ANSWER_SELECTED_CHANGED',
  ANSWER_CLEARED = 'ANSWER_CLEARED',
  QUESTION_REVISIT_LATER = 'QUESTION_REVISIT_LATER',
}

export interface UsageEvent {
  event_type: UsageEvents;
  current_question_id?: string;
  current_section_id?: string;
  timestamp: Date
}