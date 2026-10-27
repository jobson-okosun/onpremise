# ExamAlpha Secure Browser Integration Specification & Action Plan

This document details the exact technical contract, current implementation state, gap analysis, and comprehensive step-by-step implementation plan for integrating **ExamAlpha Secure Browser**, **AI Proctoring Streams**, **Integrity Events & Pauses**, and **Login Face Verification (Liveness & Photo Matching)** into the `onpremise` client.

---

## 1. Specification & Contract Overview

### 1.1 Documents Reviewed
1. **`exam-page-api (1).md`**: Master secure browser API reference (commands, events, proctoring delivery methods, login identity checks).
2. **`proctoring-stream-contract (1).md`**: AI stream connection contract (token authentication, 320×320 frame passthrough, PCM audio, origin restrictions).
3. **`integrity-events-contract (1).md`**: Infractions reporting contract (scope binding, backlog recovery, deduplication, server autosave payload sync).
4. **`exam-pause-contract.md`**: Active pause lifecycle, `in_place` vs `exit_required`, pause acknowledgment, and kiosk exit.

---

## 2. Technical Contracts & Protocol Specifications

### 2.1 Proctoring Delivery Methods (Online Exams)

| `delivery_method` | `ml_token` | `media_token` | Client Implementation | At Strike Limit |
|---|---|---|---|---|
| `AUTO_PROCTORING` | Present (field 12) | None | Runs `start_stream` (AI local WebSocket) | AI decides: `maxStrikeReached` can be true |
| `HYBRID_PROCTORING` | Present (field 12) | Present (field 8) | Runs **both** `start_stream` (AI) **and** Mediasoup Live Proctoring | Human proctor decides: `maxStrikeReached` is ignored (candidate still gets warning toasts) |
| `LIVE_PROCTORING` | None | Present (field 8) | Runs Mediasoup Live Proctoring only | Human proctor decides |
| `ON_PREMISE_SECURE_BROWSER` (Centre/CBT) | None | None | No camera or stream commands granted. Integrity events and pause handling only | Centre proctors manage candidates |

---

### 2.2 Protobuf Contract (`CandidateLoginResponseProto`)

File: `src/app/store/model/protobuf/candidate_http.proto`

```protobuf
message CandidateLoginResponseProto {
    CandidateDataProto                    candidate_data     = 1;
    repeated CandidateSectionsOverviewProto sections_overview  = 2;
    CandidateAssessmentDataProto          assessment_data    = 3;
    repeated CandidateSectionQuestionsProto sections_questions = 4;
    bytes  events_session_id  = 5;
    uint64 last_sequence      = 6;
    uint64 resume_elapsed_ms  = 7;
    optional string media_token        = 8;   // Live proctoring token
    optional string media_server_url   = 9;   // Live proctoring signaling URL
    optional string media_batch_id     = 10;  // Live proctoring batch ID
    optional string media_user_id      = 11;  // Live proctoring user ID
    optional string ml_token           = 12;  // AI Proctoring / Onboarding Token (Signed by scheduler)
}
```

---

### 2.3 Face Verification at Login Workflow

When the candidate submits credentials to `/auth/candidate_login`:

| HTTP Status | Body Payload | Meaning | Client Action |
|---|---|---|---|
| **`200 OK`** | Protobuf `CandidateLoginResponseProto` | Verification successful or not required | Starts exam normally (navigates to overview / exam layout). |
| **`428 Precondition Required`** | `{"identity_check": {"status": "NEED_ONBOARDING", "message": "...", "ml_token": "...", "exam_id": "...", "candidate_id": "...", "batch_id": "...", "onboarding_server": "..."}}` | Liveness check & passport photo match needed | 1. Open Onboarding Liveness UI.<br>2. Call Tauri IPC `start_onboarding(...)`.<br>3. Stream camera frames to local WS.<br>4. Follow step instructions.<br>5. On verdict, call `stop_onboarding` and **re-submit login request**. |
| **`428 Precondition Required`** | `{"identity_check": {"status": "PENDING_REVIEW", "message": "A proctor is confirming your identity."}}` | Liveness complete, pending human proctor confirmation | Show review modal; poll/re-attempt `login()` every 5–10 seconds. |
| **`403 Forbidden`** | `{"identity_check": {"status": "BLOCKED", "message": "..."}}` | Verification failed permanently or blocked | Show blocked screen. The candidate cannot sit the exam. |
| **`503 Service Unavailable`** | `{"identity_check": {"status": "UNAVAILABLE", "message": "..."}}` | Verification / ML service temporary unavailable | Show unavailable message with a "Try Again" retry button. |

---

### 2.4 Onboarding Tauri IPC Commands & WebSocket Contract

#### 1. Command: `start_onboarding`
```ts
const { port, token } = await invoke('start_onboarding', {
  examId: string,          // from identity_check.exam_id
  candidateId: string,     // from identity_check.candidate_id
  batchId: string,         // from identity_check.batch_id
  mlToken: string,         // from identity_check.ml_token
  onboardingServer?: string // from identity_check.onboarding_server (optional)
});
```

#### 2. Local WebSocket Connection:
* **URL**: `ws://127.0.0.1:${port}`
* **Handshake Protocol**: `token` passed as subprotocol: `new WebSocket(`ws://127.0.0.1:${port}`, token)`
* **Binary Type**: `ws.binaryType = 'arraybuffer'`
* **Video Frames**:
  * Sent as binary message: `0x01` byte + JPEG bytes.
  * Dimensions: **~640 px wide**, aspect ratio matching camera.
  * Rate: **~5 frames per second** (server processes latest and drops backlog).
  * **No audio** during onboarding.

#### 3. Command: `stop_onboarding`
```ts
await invoke('stop_onboarding');
```
Ends verification session and cleans up local WebSocket. Safe to call anytime.

#### 4. Onboarding Events:
* **`onboarding_instruction`**:
  ```ts
  type OnboardingInstruction = {
    step: 'LOOK_AT_CAMERA' | 'ONLY_YOU_IN_VIEW' | 'TURN_LEFT' | 'TURN_RIGHT' | 'LOOK_UP' | 'OPEN_MOUTH' | 'CLOSE_EYES' | 'PLEASE_WAIT';
    attempt: number;
    maxAttempts: number;
    stepIndex: number;
    steps: number;
    retryAfter?: string;     // e.g. 'LIVENESS_FAILED', 'NO_MATCH'
    timeAllowedS: number;    // Countdown seconds allowed for this step
    release: boolean;        // true = move was done, show "return" prompt
  };
  ```
  * **Step Copy Table**:
    | `step` | Initial Prompt | Prompt when `release === true` |
    |---|---|---|
    | `LOOK_AT_CAMERA` | "Look straight at the camera" | — |
    | `ONLY_YOU_IN_VIEW` | "Only you should be in view" | — |
    | `TURN_LEFT` | "Turn your head to your left" | "Good, now look back at the camera" |
    | `TURN_RIGHT` | "Turn your head to your right" | "Good, now look back at the camera" |
    | `LOOK_UP` | "Look up" | "Good, now look back at the camera" |
    | `OPEN_MOUTH` | "Open your mouth wide" | "Good, now close your mouth" |
    | `CLOSE_EYES` | "Close your eyes briefly" | "Good, now open your eyes" |
    | `PLEASE_WAIT` | "Checking…" | — |

* **`onboarding_result`**:
  ```ts
  type OnboardingResult = {
    verdict: 'PASSED' | 'REVIEW' | 'FAILED' | 'ALLOWED' | 'NOT_REQUIRED';
    reason?: string;
    attempts: number;
  };
  ```
  * **Action**: Immediately stop camera, call `stop_onboarding()`, and trigger `login()` again.

* **`onboarding_error`**:
  * String describing connection/server failure. Show error toast and provide a "Retry" button that re-invokes `start_onboarding`.

---

### 2.5 AI Proctoring Stream Contract (`start_stream`)

#### Command: `start_stream`
```ts
const { port, token } = await invoke('start_stream', {
  candidateId: string,
  examId: string,
  batchId: string,
  mlToken: string   // From login response field 12
});
```

* **Local WebSocket**: `ws://127.0.0.1:${port}` with subprotocol `token`.
* **Video Frames**: `0x01` + **320×320 JPEG bytes** (passed through directly without CPU decoding/resizing).
* **Audio Frames**: `0x02` + raw 32-bit float, little-endian, 16 kHz, mono PCM.
* **Tauri Events Received**:
  - `detection_result`: `DetectionResult` (preview UI only; do not forward to server).
  - `stream_connected`, `stream_closed`, `stream_error`.

---

### 2.6 Integrity Events & Scope Binding

* **Scope Binding**:
  ```ts
  await invoke('bind_integrity_scope', { scope: `${assessmentId}:${participantId}` });
  ```
  Must be executed before reading pending events.
* **Backlog Recovery**:
  ```ts
  const pendingEvents = await invoke('get_pending_integrity_events');
  ```
  Must be called on every page load/resume to retrieve events that occurred while the page was disconnected or after an unexpected exit (`APPLICATION_CRASHED`, `APPLICATION_EXIT_REQUESTED`).
* **Autosave Acknowledgment**:
  ```ts
  await invoke('ack_integrity_events', { eventIds: acknowledgedIds });
  ```
  Must be called **only after** the server confirms autosave HTTP 200.

---

### 2.7 Exam Pauses

* **Lifecycle**:
  - `exam-pause` event received $\rightarrow$ call `ack_exam_pause({ pauseId })`, set active in map, pause timer, display pause overlay.
  - `exam-resume` event received $\rightarrow$ delete `pauseId` from map, resume timer if map is empty.
  - `get_active_pauses()` $\rightarrow$ called on page load to restore active pauses.
* **Resolutions**:
  - `in_place`: Wait for condition to resolve (unplug extra monitor, USB drive, disconnect remote desktop).
  - `exit_required`: Prohibited process or VM running. Provide **"Close Browser"** button calling `close_app()`.

---

## 3. Current Codebase State vs. Specification Gap Analysis

| Component / Area | Existing State in `onpremise` | Gap / Required Modification |
|---|---|---|
| **`candidate_http.proto`** | Has fields 1–11 in `CandidateLoginResponseProto` | **Missing field 12 (`optional string ml_token = 12;`)**. Recompile proto to `.js` and `.d.ts`. |
| **`types.ts`** | Has `media_*` fields in `ICandidateLoginResponse` | **Missing `ml_token?: string`** and `DeliveryMethod.HYBRID_PROCTORING`. |
| **`ProctorService`** | Sends 320×320 JPEGs & 16kHz audio to local WS | Calls `start_stream` with only `{ candidateId, examId, batchId }`. **Must pass `mlToken: cInfo.ml_token`**. |
| **`TauriService`** | Implements integrity scope, events, pauses, closeApp | **Missing `start_onboarding`, `stop_onboarding`**, and onboarding event listeners. |
| **`LoginComponent`** | Handles standard login; treats all errors as generic failures | **Missing 428 `NEED_ONBOARDING`**, **428 `PENDING_REVIEW`**, **403 `BLOCKED`**, and **503 `UNAVAILABLE`** flows. |
| **Liveness UI Component** | Has obsolete static snapshot step in `proctor-onboarding` | **Missing interactive Liveness Face Verification UI** (mirrored camera, step copy, countdown, release cues, auto-relogin). |
| **`ExamService`** | Checks `AUTO_PROCTORING` and `LIVE_PROCTORING` separately | **Missing `HYBRID_PROCTORING` orchestration** (running both AI stream & Live stream simultaneously). |
| **Event Backlog on Resume** | `initIntegrityEvents()` only called once in `login.ts` | **Must also execute on exam resume / page reload** to drain crash/exit backlog. |

---

## 4. Implementation Action Plan

### Step 1: Protobuf & Type Definitions Update
1. Update `candidate_http.proto`:
   ```protobuf
   optional string ml_token = 12;
   ```
2. Run `npx pbjs` and `npx pbts` to regenerate `candidate_http.js` and `candidate_http.d.ts`.
3. Update `ICandidateLoginResponse` and `DeliveryMethod` in `src/app/store/model/types.ts`.

### Step 2: Tauri IPC Service Extension
1. In `src/app/services/ipc/tauri.ts`, implement:
   - `startOnboarding(payload: { examId: string; candidateId: string; batchId: string; mlToken: string; onboardingServer?: string })`
   - `stopOnboarding()`
   - `listenForOnboardingInstruction(callback)`
   - `listenForOnboardingResult(callback)`
   - `listenForOnboardingError(callback)`

### Step 3: Auto-Proctoring Service `mlToken` Integration
1. In `src/app/services/auto-proctoring/proctor.ts`:
   - Include `ml_token` in `candidateInfo` computed signal.
   - Pass `mlToken: cInfo.ml_token` to `start_stream`.
2. In `src/app/services/exam.ts`:
   - Update `isAutoProctoring` and `isLiveProctoring` logic so that if `delivery_method === 'HYBRID_PROCTORING'`, both services initialize and start streaming.

### Step 4: Login Error Interception & Identity Check Routing
1. In `src/app/login/login.ts`:
   - Inspect error response from `/auth/candidate_login`.
   - If HTTP 428 and `identity_check.status === 'NEED_ONBOARDING'`:
     - Open the Liveness Face Verification Modal with the payload.
   - If HTTP 428 and `identity_check.status === 'PENDING_REVIEW'`:
     - Open Review Polling Modal (auto-relogin every 6 seconds).
   - If HTTP 403 and `identity_check.status === 'BLOCKED'`:
     - Show candidate blocked modal.
   - If HTTP 503 and `identity_check.status === 'UNAVAILABLE'`:
     - Show service unavailable modal with retry.

### Step 5: Interactive Liveness Face Verification Component
1. Create a modern, responsive face verification component/modal:
   - Mirrored webcam preview feed (CSS: `transform: scaleX(-1)`).
   - Canvas capture loop: 640px JPEG @ 5 fps sent via WebSocket to `127.0.0.1:${port}`.
   - Step prompts and animated visual guides based on `onboarding_instruction`.
   - Circular countdown timer showing `timeAllowedS`.
   - Clear feedback on `release: true` ("Good, now look back at the camera").
   - Result handling: on `onboarding_result`, display brief success state, call `stop_onboarding()`, stop webcam tracks, and trigger `login()` again.
   - Error handling: on `onboarding_error`, show message and allow one-click retry.

### Step 6: Session Resume & Event Backlog Resilience
1. In `src/app/exam/layout/layout.ts` (or `app.ts`):
   - Check if candidate is authenticated on load.
   - Ensure `EventService.initIntegrityEvents()` runs so that pending events (`APPLICATION_CRASHED`, `APPLICATION_EXIT_REQUESTED`) are bound to scope and acknowledged on the first autosave.

---

## 5. Verification & Testing Checklist
- [ ] Protobuf compilation passes (`npx pbjs` & `npx pbts`).
- [ ] TypeScript build passes without any errors (`npx tsc --noEmit`).
- [ ] Angular production bundle builds cleanly (`npm run build`).
- [ ] Safe fallback when `window.__TAURI__` is undefined (works smoothly in normal web browser during development).
- [ ] Simulated 428 `NEED_ONBOARDING` successfully initiates Tauri onboarding IPC and opens WebSocket.
- [ ] Simulated 428 `PENDING_REVIEW` polls cleanly without race conditions.
- [ ] Simulated 403 `BLOCKED` and 503 `UNAVAILABLE` render user-friendly, clear messages.
- [ ] Autosave successfully reports pending integrity events and acknowledges them via `ack_integrity_events`.
