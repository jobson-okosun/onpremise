import { Component, computed, ElementRef, inject, AfterViewInit, signal, effect, viewChild, model, input } from '@angular/core';
import { Store } from '../../../store/store';
import { CdkDropList, CdkDragDrop, CdkDrag } from '@angular/cdk/drag-drop';
import { HotToastService } from '@ngxpert/hot-toast';
import { QuestionTools } from '../../question-tools/question-tools';
import { AnswerTools } from '../../answer-tools/answer-tools';
import { IOptionDTO, UsageEvents } from '../../../store/model/types';
import { EventService } from '../../../services/event';

@Component({
  selector: 'app-label-image-with-drag-and-drop',
  imports: [QuestionTools, AnswerTools, CdkDropList, CdkDrag],
  templateUrl: './label-image-with-drag-and-drop.html',
  styleUrl: './label-image-with-drag-and-drop.css',
})
export class LabelImageWithDragAndDrop implements AfterViewInit {
  private _store = inject(Store)
  private _toast = inject(HotToastService)
  private _eventService = inject(EventService)

  input = viewChild<ElementRef>('input')
  fontSize = model<number>()
  store = computed(() => this._store.store())
  zoom = signal(1)

  labels = signal<(IOptionDTO | null)[]>([])
  labelIds = computed(() => this.labels().map((_, i) => `point-${i}`))

  options = computed(() => {
    const all = this.store().currentQuestion?.options ?? []
    const used = this.labels().filter(x => x !== null).map(x => x!.value)
    return all.filter(o => !used.includes(o.value))
  })

  constructor() {
    effect(() => {
      const q = this.store().currentQuestion;
      if (!q) return;

      const opts = q.options ?? [];
      const responses = q.responses ?? [];

      // restore saved responses
      if (responses.length > 0 && responses.some(r => r !== '')) {
        const restored = responses.map(val =>
          opts.find(o => o.value === val) ?? null
        );
        this.labels.set(restored);
        return;
      }

      // default = all empty
      const positions = q.response_positions ?? [];
      this.labels.set(new Array(positions.length).fill(null));
    });
  }


  ngAfterViewInit() { }

  getConnectedDropLists() {
    return ['option-list', ...this.labelIds()]
  }

  dropToPoint(event: CdkDragDrop<any>) {
    const prevId = event.previousContainer.id
    const currId = event.container.id
    if (!prevId || !currId) return
    if (prevId === currId) return

    const boxes = [...this.labels()]

    // option-list -> point (fill only if empty)
    if (prevId === 'option-list' && currId.startsWith('point-')) {
      const idx = parseInt(currId.split('-')[1])
      if (boxes[idx] !== null) {
        this._toast.warning('This point already contains a label')
        return
      }

      const option = event.item.data as IOptionDTO
      boxes[idx] = option
      this.labels.set(boxes)

      this.captureResponses()
      return
    }

    // point -> option-list (remove)
    if (currId === 'option-list' && prevId.startsWith('point-')) {
      const prevIdx = parseInt(prevId.split('-')[1])
      const item = boxes[prevIdx]

      if (item) {
        boxes[prevIdx] = null
        this.labels.set(boxes)
        this.captureResponses()
      }

      return
    }

    // point <-> point swap
    if (prevId.startsWith('point-') && currId.startsWith('point-')) {
      const prevIdx = parseInt(prevId.split('-')[1])
      const currIdx = parseInt(currId.split('-')[1])

      const tmp = boxes[prevIdx]
      boxes[prevIdx] = boxes[currIdx]
      boxes[currIdx] = tmp
      this.labels.set(boxes)

      this.captureResponses()
      return
    }
  }

  captureResponses() {
    const currentQuestion = this.store().currentQuestion
    if (!currentQuestion) {
      return
    }

    const boxes = this.labels()

    this._eventService.logEvent({
      event_type: currentQuestion!.responses.length > 1 ? UsageEvents.ANSWER_SELECTED_CHANGED : UsageEvents.ANSWER_SELECTED,
      current_question_id: this.store().currentQuestion?.id,
      current_section_id: this.store().currentSection?.id,
      timestamp: new Date()
    })

    currentQuestion.responses = boxes.map(b => b ? b.value : '')
    currentQuestion.lastUpdated = new Date()

    this._store.updateStore({ currentQuestion })
  }
}
