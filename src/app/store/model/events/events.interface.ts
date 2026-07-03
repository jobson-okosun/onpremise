import { CandidateEventType, NavigationMethod } from './events.enum';

export type BasePayload = {
  battery_level?: number | null;
  duration_ms?: number;
};

export type BasicEventPayload = BasePayload & {
  event_type: 
      | CandidateEventType.SESSION_STARTED
      | CandidateEventType.SESSION_RESUMED
      | CandidateEventType.SESSION_PAUSED
      | CandidateEventType.SESSION_TERMINATED
      | CandidateEventType.SESSION_TIMEOUT
      | CandidateEventType.SESSION_LOGOUT
      | CandidateEventType.LOGIN_ATTEMPTED
      | CandidateEventType.LOGIN_SUCCEEDED
      | CandidateEventType.LOGIN_FAILED
      | CandidateEventType.SECURE_ENVIRONMENT_FAILED
      | CandidateEventType.ONBOARDING_STARTED
      | CandidateEventType.ONBOARDING_STEP_CHANGED
      | CandidateEventType.SYSTEM_CHECK_STARTED
      | CandidateEventType.SYSTEM_CHECK_COMPLETED
      | CandidateEventType.SYSTEM_CHECK_FAILED
      | CandidateEventType.MIC_TEST_STARTED
      | CandidateEventType.MIC_TEST_COMPLETED
      | CandidateEventType.CAMERA_TEST_STARTED
      | CandidateEventType.CAMERA_TEST_COMPLETED
      | CandidateEventType.GUIDELINES_ACCEPTED
      | CandidateEventType.INSTRUCTIONS_VIEWED
      | CandidateEventType.READING_TIME_WARNING
      | CandidateEventType.READING_TIME_EXPIRED
      | CandidateEventType.EXAM_START_REQUESTED
      | CandidateEventType.EXAM_SELECTED
      | CandidateEventType.EXAM_STARTED
      | CandidateEventType.EXAM_SUBMIT_REQUESTED
      | CandidateEventType.EXAM_SUBMIT_CANCELLED
      | CandidateEventType.EXAM_SUBMITTED
      | CandidateEventType.EXAM_AUTO_SUBMITTED
      | CandidateEventType.EXAM_OVERVIEW_OPENED
      | CandidateEventType.LAYOUT_CHANGED
      | CandidateEventType.INSTRUCTIONS_PANEL_TOGGLED
      | CandidateEventType.PROFILE_OPENED
      | CandidateEventType.CALCULATOR_OPENED
      | CandidateEventType.CALCULATOR_CLOSED
      | CandidateEventType.NETWORK_ONLINE
      | CandidateEventType.NETWORK_OFFLINE
      | CandidateEventType.SYNC_STARTED
      | CandidateEventType.SYNC_COMPLETED
      | CandidateEventType.SYNC_FAILED
      | CandidateEventType.WINDOW_FOCUSED
      | CandidateEventType.WINDOW_BLURRED
      | CandidateEventType.COPY_ATTEMPT
      | CandidateEventType.PASTE_ATTEMPT
      | CandidateEventType.PRINT_ATTEMPT
      | CandidateEventType.SCREENSHOT_ATTEMPT
      | CandidateEventType.FULLSCREEN_ENTERED
      | CandidateEventType.FULLSCREEN_EXITED
      | CandidateEventType.BATTERY_LOW
      | CandidateEventType.DEVICE_SLEEP
      | CandidateEventType.DEVICE_RESUMED
      | CandidateEventType.PROCTOR_CHAT_OPENED
      | CandidateEventType.PROCTOR_CHAT_CLOSED
      | CandidateEventType.PROCTOR_MESSAGE_SENT
      | CandidateEventType.PROCTOR_MESSAGE_RECEIVED
      | CandidateEventType.FACE_DETECTED
      | CandidateEventType.FACE_LOST
      | CandidateEventType.MULTIPLE_FACES
      | CandidateEventType.PHONE_DETECTED
      | CandidateEventType.BOOK_DETECTED
      | CandidateEventType.LOOKING_AWAY
      | CandidateEventType.MIC_BLOCKED
      | CandidateEventType.CAMERA_BLOCKED
      | CandidateEventType.APPLICATION_EXIT_REQUESTED
      | CandidateEventType.APPLICATION_EXITED
      | CandidateEventType.APPLICATION_CRASHED;
};

export type SectionEventPayload = BasePayload & {
  event_type: CandidateEventType.SECTION_ENTERED | CandidateEventType.SECTION_EXITED;
  section_id: string;
};

export type QuestionNavigationPayload = BasePayload & {
  event_type: CandidateEventType.QUESTION_ENTERED | CandidateEventType.QUESTION_EXITED | CandidateEventType.QUESTION_FLAGGED | CandidateEventType.QUESTION_UNFLAGGED;
  section_id: string;
  question_id: string;
  navigation_method?: NavigationMethod;
};

export type QuestionAnswerPayload = BasePayload & {
  event_type: CandidateEventType.ANSWER_SELECTED | CandidateEventType.ANSWER_CHANGED | CandidateEventType.ANSWER_CLEARED;
  section_id: string;
  question_id: string;
  answer: string | null;
  old_answer: string | null;
};



export type ICandidateEventPayload = 
  | BasicEventPayload 
  | SectionEventPayload 
  | QuestionNavigationPayload 
  | QuestionNavigationPayload 
  | QuestionAnswerPayload;

export interface ICandidateEvent {
  event_id: string;
  events_session_id: string;
  sequence: number;
  event_type: CandidateEventType;
  elapsed_ms: number;
  section_id: string | null;
  question_id: string | null;
  answer: string | null;
  old_answer: string | null;
  navigation_method?: NavigationMethod | null;
  duration_ms: number;
  battery_level: number | null;
}
