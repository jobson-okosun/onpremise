import { AfterViewInit, Component, computed, effect, ElementRef, inject, model, signal, viewChild } from '@angular/core';
import { Store } from '../../../store/store';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { AnswerTools } from '../../answer-tools/answer-tools';
import { QuestionTools } from '../../question-tools/question-tools';
import { IOptionDTO } from '../../../store/model/types';
import { SafeHtmlPipe } from '../../../utils/safe-html.pipe';



@Component({
  selector: 'app-classify-by-ordering',
  imports: [CdkDropList, CdkDrag, QuestionTools, AnswerTools, SafeHtmlPipe],
  templateUrl: './classify-by-ordering.html',
  styleUrl: './classify-by-ordering.css',
})
export class ClassifyByOrdering implements AfterViewInit {
  private _store = inject(Store)
  input = viewChild<ElementRef>('input')
  fontSize = model<number>()
  store = computed(() => this._store.store())

  rightItems = signal<IOptionDTO[]>([])
  refresh = signal(0);

  refreshEffect = effect(() => {
    this.rightItems()
    this.refresh.update(v => v + 1)
  })

  restoreState = effect(() => {
    const q = this.store().currentQuestion;
    if (!q) return;

    const opts = q.options ?? [];
    const responses = q.responses ?? [];

    // User already ordered items before → restore EXACT ORDER
    if (responses.length > 0 && responses.some(r => r !== '')) {
      const restored = responses.map(val => opts.find(o => o.value === val));
      this.rightItems.set(restored as any);
    }

    // First time answering → load options (and shuffle if needed)
    else {
      // this.rightItems.set([...opts]);
      
      let shuffled = [...opts];
      if (q.shuffle_options !== false) {
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
      }
      this.rightItems.set(shuffled);
    }

    this.refresh.update(v => v + 1);
  });


  ngAfterViewInit() {
    this.refresh.update(v => v + 1);
    window.addEventListener('resize', () => this.refresh.update(v => v + 1));
  }

  drop(event: CdkDragDrop<any[]>) {
    const items = [...this.rightItems()];
    const [moved] = items.splice(event.previousIndex, 1);
    items.splice(event.currentIndex, 0, moved);
    this.rightItems.set(items);

    this.captureResponses()

    requestAnimationFrame(() => { this.refresh.update(v => v + 1) });
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