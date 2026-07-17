import { Component, computed, inject, OnInit } from '@angular/core';
import { Store } from '../store/store';
import { RouterLink } from '@angular/router';
import { EventService } from '../services/event';
import { CandidateEventType } from '../store/model/events/events.enum';
import { TextToSpeechService } from '../services/reader/text-to-speech';

@Component({
  selector: 'app-overview',
  imports: [RouterLink],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})

export default class Overview implements OnInit {
  private _store = inject(Store)
  private _eventService = inject(EventService)
  private _tts = inject(TextToSpeechService)

  store = computed(() => this._store.store())
  examDuration = computed(() => this.store().examDuration)
  totalQuestions = computed(() => this.store().sections.reduce((s, item) => s + item.items.length, 0))

  ngOnInit() {
    this._eventService.logEvent({ event_type: CandidateEventType.EXAM_OVERVIEW_OPENED });
    setTimeout(() => {
      this._tts.announceOverview();
    }, 500);
  }
}
