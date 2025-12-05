import { Component, computed, ElementRef, inject, AfterViewInit, signal, effect, viewChild, model, viewChildren } from '@angular/core';
import { CdkDropList, CdkDragDrop, CdkDrag } from '@angular/cdk/drag-drop';
import { Store } from '../../../store/store';
import { HotToastService } from '@ngxpert/hot-toast';
import { QuestionTools } from '../../question-tools/question-tools';
import { AnswerTools } from '../../answer-tools/answer-tools';
import { IOptionDTO } from '../../../store/model/types';

@Component({
  selector: 'app-classify-by-matching',
  imports: [CdkDropList, CdkDrag, QuestionTools, AnswerTools],
  templateUrl: './classify-by-matching.html',
  styleUrl: './classify-by-matching.css',
})
export class ClassifyByMatching implements AfterViewInit {
  private _store = inject(Store)
  private _toast = inject(HotToastService)

  input = viewChild<ElementRef>('input')
  fontSize = model<number>()
  store = computed(() => this._store.store())
  leftBoxes = viewChildren<ElementRef>('leftBox')
  rightBoxes = viewChildren<ElementRef>('rightBox')
  wrapper = viewChild<ElementRef>('wrapper')

  leftItems = signal<string[]>([])
  rightItems = signal<(IOptionDTO | null)[]>([])
  rightBoxIds = computed(() => this.rightItems().map((_, i) => `right-box-${i}`))

  options = computed(() => {
    const allOpts = this.store().currentQuestion?.options ?? []
    const used = this.rightItems().filter(x => x !== null).map(x => x!.value)
    return allOpts.filter(opt => !used.includes(opt.value))
  })

  refresh = signal(0)

  refreshEffect = effect(() => {
    this.rightItems()
    this.refresh.update(v => v + 1)
  })

  restoreState = effect(() => {
    const q = this.store().currentQuestion
    if (!q) return

    const stems = q.stems ?? []
    const opts = q.options ?? []
    const responses = q.responses ?? []

    this.leftItems.set(stems)

    // restore previous responses
    const filled = stems.map((_, i) => {
      const val = responses[i]
      return val ? opts.find(o => o.value === val) ?? null : null
    })

    this.rightItems.set(filled)
    this.refresh.update(v => v + 1)
  })

  ngAfterViewInit() {
    this.refresh.update(v => v + 1)
    window.addEventListener('resize', () => { this.refresh.update(v => v + 1) })
  }

  private localY(rect: DOMRect, wrapperRect: DOMRect) {
    return rect.top - wrapperRect.top + rect.height / 2
  }

  private localXLeft(rect: DOMRect, wrapperRect: DOMRect) {
    return rect.left - wrapperRect.left + rect.width
  }

  private localXRight(rect: DOMRect, wrapperRect: DOMRect) {
    return rect.left - wrapperRect.left
  }

  lines = computed(() => {
    this.refresh()

    if (!this.leftBoxes || !this.rightBoxes) return []

    const left = this.leftBoxes()
    const right = this.rightBoxes()

    if (left.length === 0 || right.length === 0) return []

    const wrapperRect = this.wrapper()?.nativeElement.getBoundingClientRect()

    return left.map((ref, i) => {
      const lRect = ref.nativeElement.getBoundingClientRect()
      const rRect = right[i].nativeElement.getBoundingClientRect()

      return {
        x1: this.localXLeft(lRect, wrapperRect),
        y1: this.localY(lRect, wrapperRect),
        x2: this.localXRight(rRect, wrapperRect),
        y2: this.localY(rRect, wrapperRect),
      }
    })
  })

  getConnectedDropLists() {
    return ['option-list', ...this.rightBoxIds()]
  }

  dropRightBox(event: CdkDragDrop<any>) {
    const prevId = event.previousContainer.id
    const currId = event.container.id

    if (prevId === currId) return

    const boxes = [...this.rightItems()]

    // OPTION → RIGHT BOX  (only if empty)
    if (prevId === 'option-list' && currId.startsWith('right-box-')) {
      const currIndex = parseInt(currId.split('-')[2])

      if (boxes[currIndex] !== null) {
        this._toast.warning('This box already contains an answer')
        return
      }

      const option = event.item.data as IOptionDTO
      boxes[currIndex] = option

      this.rightItems.set(boxes)
      this.captureResponses()

      requestAnimationFrame(() => this.refresh.update(v => v + 1))
      return
    }

    // RIGHT BOX → OPTION LIST
    if (currId === 'option-list' && prevId.startsWith('right-box-')) {
      const prevIndex = parseInt(prevId.split('-')[2])
      const item = boxes[prevIndex]

      if (item) {
        boxes[prevIndex] = null
        this.rightItems.set(boxes)
        this.captureResponses()
        this.refresh.update(v => v + 1)
      }
      return
    }

    // RIGHT BOX ↔ RIGHT BOX (swap)
    if (prevId.startsWith('right-box-') && currId.startsWith('right-box-')) {
      const prevIndex = parseInt(prevId.split('-')[2])
      const currIndex = parseInt(currId.split('-')[2])

      const temp = boxes[prevIndex]
      boxes[prevIndex] = boxes[currIndex]
      boxes[currIndex] = temp

      this.rightItems.set(boxes)
      this.captureResponses()

      requestAnimationFrame(() => this.refresh.update(v => v + 1))
      return
    }
  }

  captureResponses() {
    const currentQuestion = this.store().currentQuestion;
    if (!currentQuestion) {
      return
    };

    const boxes = this.rightItems();

    currentQuestion.responses = boxes.map(box => box ? box.value : '');
    currentQuestion.lastUpdated = new Date();

    this._store.updateStore({ currentQuestion });
  }


}
