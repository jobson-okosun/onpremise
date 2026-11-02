import { Component, computed, inject, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Store } from '../store/store';
import { Router, RouterLink } from '@angular/router';
import { EventService } from '../services/event';
import { CandidateEventType } from '../store/model/events/events.enum';
import { ExamSpeechService } from '../services/reader/exam-speech.service';

@Component({
  selector: 'app-overview',
  imports: [RouterLink],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export default class Overview implements OnInit, OnDestroy {
  private _store = inject(Store)
  private _router = inject(Router)
  private _eventService = inject(EventService)
  private _tts = inject(ExamSpeechService)

  store = computed(() => this._store.store())
  examDuration = computed(() => this.store().examDuration)
  totalQuestions = computed(() => this.store().sections.reduce((s, item) => s + item.items.length, 0))

  ngOnInit() {
    this._eventService.logEvent({ event_type: CandidateEventType.EXAM_OVERVIEW_OPENED });
    setTimeout(() => {
      this._tts.announceOverview();
    }, 500);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
    if (isInput) return;

    if (event.key === 'Enter') {
      event.preventDefault();
      this._tts.stop();
      this._router.navigate(['instruction']);
    } else if (event.key.toLowerCase() === 'r') {
      if (this._tts.isTextToSpeechEnabled()) {
        event.preventDefault();
        this._tts.announceOverview();
      }
    }
  }

  ngOnDestroy(): void {
    this._tts.stop();
  }
}

