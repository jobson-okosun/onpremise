import { Component, computed, inject, signal } from '@angular/core';
import { getAlphabetChar, getRomanNumeral, getParentLabel, getChildLabel } from '../../utils/helper';
import { Store } from '../../store/store';

@Component({
  selector: 'app-sub-question-navigation',
  standalone: true,
  templateUrl: './sub-question-navigation.html'
})
export class SubQuestionNavigation {
  private _store = inject(Store);

  currentQuestion = computed(() => this._store.store().currentQuestion);
  questionIndex = computed(() => this._store.store().currentQuestionIndex);
  activeStoreId = computed(() => this._store.store().activeSubQuestionId || 'default');
  
  subQuestions = computed<any[]>(() => (this.currentQuestion() as any)?.subQuestions || []);

  expandedParentId = signal<string | null>(null);

  toggleParent(id: string) {
    // Select the parent itself as the active canvas
    this.selectPart(id);

    // Toggle expansion
    if (this.expandedParentId() === id) {
      this.expandedParentId.set(null);
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
