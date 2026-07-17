import { Component, computed, inject, signal, effect } from '@angular/core';
import { getParentLabel, getChildLabel } from '../../utils/helper';
import { Store } from '../../store/store';
import { DrawingAndWritingStore } from '../item-types/drawing-and-writing/services/store.service';

@Component({
  selector: 'app-sub-question-navigation',
  standalone: true,
  templateUrl: './sub-question-navigation.html'
})
export class SubQuestionNavigation {
  private _store = inject(Store);
  private _drawingStore = inject(DrawingAndWritingStore);

  currentQuestion = computed(() => this._store.store().currentQuestion);
  questionIndex = computed(() => this._store.store().currentQuestionIndex);
  activeStoreId = computed(() => this._store.store().activeSubQuestionId || 'default');
  
  subQuestions = computed<any[]>(() => (this.currentQuestion())?.sub_questions || []);
  allDrawingStores = computed(() => this._drawingStore.getAllStores());

  expandedParentId = signal<string | null>(null);
  private _previousQuestionId = '';

  constructor() {
    effect(() => {
      const activeId = this.activeStoreId();
      const sqs = this.subQuestions();
      const currentQuestion = this.currentQuestion();
      
      if (!currentQuestion || !sqs || sqs.length === 0) return;

      setTimeout(() => {
        if (this._previousQuestionId !== currentQuestion.id) {
          this._previousQuestionId = currentQuestion.id;
          
          const firstSq = sqs[0];
          if (firstSq.children && firstSq.children.length > 0) {
            this.expandedParentId.set(firstSq.id);
          } else {
            this.expandedParentId.set(null);
          }
          return; 
        }

        if (activeId === 'default') return;

        const parentOfActiveChild = sqs.find(sq => 
          sq.children && sq.children.some((c: any) => c.id === activeId)
        );

        if (parentOfActiveChild) {
          this.expandedParentId.set(parentOfActiveChild.id);
        } else {
          const expandedId = this.expandedParentId();
          if (expandedId && expandedId !== activeId) {
             this.expandedParentId.set(null);
          }
        }
      });
    });
  }


  isAttempted(id: string): boolean {
    const stores = this.allDrawingStores();
    const storeData = stores[id];
    if (!storeData) return false;

    let pointFound = false;
    storeData.pages.forEach((page: any) => {
      if (page.strokes && page.strokes.length) {
        pointFound = true;
      }
    });
    return pointFound;
  }

  toggleParent(id: string) {
    // Select the parent itself as the active canvas
    this.selectPart(id);

    // Toggle expansion
    if (this.expandedParentId() === id) {
      // this.expandedParentId.set(null);
      return
    } else {
      this.expandedParentId.set(id);
    }
  }

  selectPart(id: string) {
    this._store.updateStore({ activeSubQuestionId: id });
  }

  isChildActive(parent: any): boolean {
    if (this.activeStoreId() === parent.id) return true;
    if (!parent.children || parent.children.length === 0) return false;
    return parent.children?.some((c: any) => c.id === this.activeStoreId());
  }

  getParentLabel(parentIndex: number): string {
    return getParentLabel(this.questionIndex(), parentIndex);
  }

  getChildLabel(parentIndex: number, childIndex: number): string {
    return getChildLabel(childIndex);
  }
}
