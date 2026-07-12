import { Component, computed, inject } from '@angular/core';
import { Store } from '../../store/store';
import { ExamService } from '../../services/exam';
import { EventService } from '../../services/event';
import { CandidateEventType, NavigationMethod } from '../../store/model/events/events.enum';
import { AttemptRule, StoreSectionBlock } from '../../store/model/types';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-theory-paginator',
  imports: [],
  templateUrl: './theory-paginator.html',
})
export class TheoryPaginator {
  private _store = inject(Store);
  private _exam = inject(ExamService);
  private _eventService = inject(EventService);
  private _toast = inject(HotToastService);

  store = computed(() => this._store.store());
  attemptRules = computed(() => AttemptRule);
  currentQuestionIndex = computed(() => this.store().currentQuestionIndex);
  currentSectionSummary = computed(() => this._exam.currentSectionSummary());

  isAttempted(index: number): boolean {
    const summary = this.currentSectionSummary()?.summary;
    return summary?.attempted.includes(index) ?? false;
  }

  isUnattempted(index: number): boolean {
    const summary = this.currentSectionSummary()?.summary;
    return summary?.unattempted.includes(index) ?? false;
  }

  isRevisit(index: number): boolean {
    const summary = this.currentSectionSummary()?.summary;
    return summary?.revisits.includes(index) ?? false;
  }

  isCurrent(index: number): boolean {
    return this.currentQuestionIndex() === index;
  }

  selectPage(index: number, block?: StoreSectionBlock) {
    if (block && block.attempt_rule === this.attemptRules().ATTEMPT_ANY) {
      const summary = this.currentSectionSummary()?.summary;
      if (summary) {
        let attemptedCount = 0;
        for (const q of block.questions) {
          if (summary.attempted.includes(q.storeMapIdex)) {
            attemptedCount++;
          }
        }

        if (attemptedCount >= block.items_to_attempt && !summary.attempted.includes(index)) {
          this._toast.warning(`Note: You are only required to answer ${block.items_to_attempt} question(s) from this group.`, {
            duration: 5000,
            position: 'top-center',
            dismissible: true
          });
        }
      }
    }

    const oldQuestion = this.store().currentQuestion;
    if (oldQuestion) {
      this._eventService.logEvent({ event_type: CandidateEventType.QUESTION_EXITED, question_id: oldQuestion.id, section_id: this.store().currentSection!.id, navigation_method: NavigationMethod.Palette });
    }

    const currentQuestion = this.store().currentSection?.items[index];
    this._store.updateStore({ currentQuestionIndex: index, currentQuestion });

    if (currentQuestion) {
      this._eventService.logEvent({ event_type: CandidateEventType.QUESTION_ENTERED, question_id: currentQuestion.id, section_id: this.store().currentSection!.id, navigation_method: NavigationMethod.Palette });
    }
  }
}
