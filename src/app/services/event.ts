import { computed, inject, Injectable, signal } from "@angular/core";
import { ICandidateEvent, ICandidateEventPayload } from "../store/model/events/events.interface";
import { CandidateEventType } from "../store/model/events/events.enum";
import { Store } from "../store/store";

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private _store = inject(Store);

    private events_session_id = computed(() => this._store.store().loginData?.events_session_id || '');
    private resume_elapsed_ms = computed(() => this._store.store().loginData?.resume_elapsed_ms || 0);

    private _pendingEvents = signal<ICandidateEvent[]>([]);
    readonly pendingEvents = this._pendingEvents.asReadonly();

    private _localStartTimeMs = signal<number | null>(null);
    private _sequenceCounter = signal<number>(0);
    private _questionEntryTimes = new Map<string, number>();
    private _sectionEntryTimes = new Map<string, number>();

    private _isSequenceSynced = signal(false);

    initializeSession(): void {
        this._localStartTimeMs.set(performance.now());
        this._isSequenceSynced.set(false);
    }

    syncSequence(serverSequence: number): void {
        if (this._isSequenceSynced()) return;

        this._pendingEvents.update(events => {
            return events.map(e => ({
                ...e,
                sequence: e.sequence + serverSequence
            }));
        });
        
        this._sequenceCounter.update(seq => seq + serverSequence);
        this._isSequenceSynced.set(true);
    }

    private generateUUID(): string {
        if (crypto?.randomUUID) {
            return crypto.randomUUID();
        }

        const bytes = new Uint8Array(16);
        crypto.getRandomValues(bytes);

        bytes[6] = (bytes[6] & 0x0f) | 0x40;
        bytes[8] = (bytes[8] & 0x3f) | 0x80;

        const hex = [...bytes].map(b => b.toString(16).padStart(2, '0'));

        return [
            hex.slice(0, 4).join(''),
            hex.slice(4, 6).join(''),
            hex.slice(6, 8).join(''),
            hex.slice(8, 10).join(''),
            hex.slice(10, 16).join('')
        ].join('-');
    }

    updatePastEventsSessionId(): void {
        const sessionId = this.events_session_id();
        if (!sessionId) return;

        this._pendingEvents.update(events => {
            return events.map(event => {
                if (!event?.events_session_id) {
                    return { ...event, events_session_id: sessionId };
                }
                return event;
            });
        });
    }

    logEvent(payload: ICandidateEventPayload): void {
        const start = this._localStartTimeMs();

        const timeDiff = start !== null ? performance.now() - start : 0;
        const currentElapsedMs = this.resume_elapsed_ms() + timeDiff;

        if (payload.event_type === CandidateEventType.QUESTION_ENTERED && 'question_id' in payload) {
            this._questionEntryTimes.set(payload.question_id, Date.now());
        }

        if (payload.event_type === CandidateEventType.SECTION_ENTERED && 'section_id' in payload) {
            this._sectionEntryTimes.set(payload.section_id, Date.now());
        }

        let duration_ms = payload.duration_ms || 0;

        if (
            (
                payload.event_type === CandidateEventType.ANSWER_SELECTED ||
                payload.event_type === CandidateEventType.ANSWER_CHANGED ||
                payload.event_type === CandidateEventType.QUESTION_EXITED
            ) 
            && 'question_id' in payload
        ) {
            const entryTime = this._questionEntryTimes.get(payload.question_id);
            if (entryTime) {
                duration_ms = Date.now() - entryTime;
            }
        }

        if (payload.event_type === CandidateEventType.SECTION_EXITED && 'section_id' in payload) {
            const entryTime = this._sectionEntryTimes.get(payload.section_id);
            if (entryTime) {
                duration_ms = Date.now() - entryTime;
            }
        }

        const currentSeq = this._sequenceCounter();

        const event: ICandidateEvent = {
            section_id: null,
            question_id: null,
            answer: null,
            old_answer: null,
            navigation_method: null,
            duration_ms: duration_ms,
            battery_level: null,
            ...payload,
            event_id: this.generateUUID(),
            events_session_id: this.events_session_id(),
            sequence: currentSeq,
            elapsed_ms: Math.floor(currentElapsedMs)
        };

        this._sequenceCounter.update(seq => seq + 1);
        this._pendingEvents.update((events) => [...events, event]);

        // console.log("event", event)
    }

    getPendingEvents(): ICandidateEvent[] {
        return this._pendingEvents();
    }

    clearSentEvents(sentEvents: ICandidateEvent[]): void {
        const sentIds = new Set(sentEvents.map(e => e.event_id));
        this._pendingEvents.update((events) =>
            events.filter(e => !sentIds.has(e.event_id))
        );
    }

    clearEvents(): void {
        this._pendingEvents.set([]);
    }
}