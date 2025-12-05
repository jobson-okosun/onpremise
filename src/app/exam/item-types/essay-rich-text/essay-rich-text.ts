import { Component, computed, HostListener, inject, model, signal, viewChild } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { Store } from '../../../store/store';
import { Editor } from '../../editor/editor';
import { AnswerTools } from '../../answer-tools/answer-tools';
import { QuestionTools } from '../../question-tools/question-tools';

@Component({
  selector: 'app-essay-rich-text',
  imports: [Editor, QuestionTools, AnswerTools],
  templateUrl: './essay-rich-text.html',
  styleUrl: './essay-rich-text.css',
})
export class EssayRichText {
  private _store = inject(Store)
  private _toast = inject(HotToastService)
  private _editor = viewChild(Editor)

  fontSize = model<number>()
  store = computed(() => this._store.store())
  wordCount = computed(() => {
    const str = this.store().currentQuestion?.responses[0] ?? ''
    return str.split(/\s+/).filter(word => word.length).length
  })

  editorConfig = signal<any>(null)
  showEditor = signal(false)

  @HostListener('window:resize')
  resizeEditor() {
    this.showEditor.set(false)

    setTimeout(() => {
      this.editorConfig.set(this.getConfig())
      this.showEditor.set(true)
    }, 500)
  }

  ngOnInit() {
    this.editorConfig.set(this.getConfig())
    this.showEditor.set(true)
  }

  getConfig() {
    const answerSpace = document.querySelector('.answer-space') as HTMLElement

    return {
      name: this.store().currentQuestion!.id,
      height: (answerSpace.offsetHeight - 30).toString()
    }
  }

  captureResponses(value: string | undefined) {
    if (!value) {
      value = ''
    }

    const currentQuestion = this.store().currentQuestion;
    if (!currentQuestion) {
      return
    };

    currentQuestion.responses[0] = value;
    currentQuestion.lastUpdated = new Date()

    this._store.updateStore({ currentQuestion })
  }
}
