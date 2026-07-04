import { Component, computed, effect, inject, OnInit, untracked } from '@angular/core';
import { Store } from '../store/store';
import { Router, RouterLink } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { EventService } from '../services/event';
import { CandidateEventType } from '../store/model/events/events.enum';
import { SafeHtmlPipe } from '../utils/safe-html.pipe';


@Component({
  selector: 'app-instructions',
  imports: [RouterLink, SafeHtmlPipe],
  templateUrl: './instructions.html',
  styleUrl: './instructions.css',
})
export default class Instructions implements OnInit {
  private _store = inject(Store)
  private _router = inject(Router)
  private _toast = inject(HotToastService)
  private _eventService = inject(EventService)

  store = computed(() => this._store.store())
  totalQuestions = computed(() => this.store().sections.reduce((s, item) => s + item.items.length, 0))
  start = computed(() => this.store().loginData?.assessment_data.instruction_read_time_sec ?? 10);
  tick = toSignal(interval(1000), { initialValue: 0 });
  countDown = computed(() => {
    const secondsPassed = this.tick();
    const remaining = this.start() - secondsPassed;

    return remaining > 0 ? remaining : 0;
  });

  ngOnInit() {  
    this._eventService.logEvent({ event_type: CandidateEventType.INSTRUCTIONS_VIEWED });
  }

  done = effect(() => {
    const currentCount = this.countDown();
    
    untracked(() => {
      if (currentCount == this.store().loginData?.assessment_data!.warn_end_of_reading_time_sec) {
        this._eventService.logEvent({ event_type: CandidateEventType.READING_TIME_WARNING });
        this._toast.info('You are approaching the end of the time allocated to read the instructions')
      }

      if (currentCount === 0 && this.start() > 0) {
        this._eventService.logEvent({ event_type: CandidateEventType.READING_TIME_EXPIRED });
        this._router.navigate(['exam'])
      }
    });
  });

  hasOneSectionWithInstruction = computed(() => this.store().loginData?.sections_questions.some( item => item.section_settings.section_instruction))
}
