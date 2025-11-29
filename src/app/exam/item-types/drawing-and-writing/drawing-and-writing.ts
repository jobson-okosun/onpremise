import { Component, computed, effect, inject, input, model, signal } from '@angular/core';
import { QuestionTools } from '../../question-tools/question-tools';
import { MenuModule } from 'primeng/menu';
import { ExamService } from '../../../services/exam';
import { Store } from '../../../store/store';
import { CanvasService } from './services/canvas.service';
import { DrawingAndWritingStore } from './services/store.service';
import { KonvaToolsEvent } from './services/event.service';
import { Dialog } from 'primeng/dialog';
import { scrollContainers } from '../../../utils/helper';
import { DynamicViewDirective } from "@ngneat/overview";

@Component({
  selector: 'app-drawing-and-writing',
  templateUrl: './drawing-and-writing.html',
  styleUrl: './drawing-and-writing.css',
  imports: [QuestionTools, MenuModule, Dialog, DynamicViewDirective],
})
export class DrawingAndWriting {
  private _store = inject(Store)
  private _exam = inject(ExamService)
  private _canvasService = inject(CanvasService)
  private _drawingStore = inject(DrawingAndWritingStore)
  private _konvaEventTools = inject(KonvaToolsEvent)

  showClearPageModal = false;
  showDeletePageModal = false;

  fontSize = model<number>()
  store = computed(() => this._store.store())
  currentQuestionIndex = computed(() => this.store().currentQuestionIndex)
  currentQuestion = computed(() => this.store().currentQuestion)
  currentQuestionId = signal<string | null>(null)
  currentTool = computed(() => this._canvasService.currentTool())
  selectedMeasuringToolsSet = signal(new Set())

  questionChanged = effect(() => {
    if (this.currentQuestion()?.id !== this.currentQuestionId()) {
      this.currentQuestionId.set(this.currentQuestion()!.id)

      this._konvaEventTools._questionChanged$.next(true)
      setTimeout(() => { this.prepareCanvasAndStoreDataOnLoad() }, 500)
    }
  })

  pages = computed(() => Array.from({ length: this._drawingStore.store().pages.length }, (_, i) => i))
  currentPage = computed(() => this._drawingStore.store().currentPage)

  prepareCanvasAndStoreDataOnLoad() {
    const currentQuestion = this.store().currentQuestion

    const backgroundType = this.store().currentQuestion?.background_type as any
    this._canvasService.backgroundType.set(backgroundType)

    this._konvaEventTools._backgroundChange$.next(backgroundType)

    if (currentQuestion!.responses.length) {
      const jsonResponse = JSON.parse(currentQuestion!.responses[0])

      const storeData = { ...jsonResponse, shouldReset: false, currentPage: 0 }
      this._drawingStore.updateStore(storeData)
    }

    this._canvasService.initializeCanvas()
  }

  toggleLayout() {
    const currentConfig = this.store().drawingAndWritingConfig
    const updatedConfig = { ...currentConfig, layoutFullMode: !currentConfig.layoutFullMode }
    this._store.updateStore({ drawingAndWritingConfig: updatedConfig })
    this._konvaEventTools._toggleDrawingAndWritingLayout$.next()
  }

  selectPage(pageIndex: number) {
    this._drawingStore.selectPage(pageIndex)
    this._konvaEventTools._pageSelectEvent.next()
  }

  addNewPage() {
    this._drawingStore.createNewPage()
      .then(() => {
        this.selectPage(this.currentPage())

        const currentQuestion = this.store().currentQuestion;
        const storeData = this._drawingStore.getStoreData()

        currentQuestion!.responses = [JSON.stringify(storeData)];
        currentQuestion!.lastUpdated = new Date()
        
        this._store.updateStore({ currentQuestion })
      })
  }

  clearPage() {
    this.showClearPageModal = !this.showClearPageModal

    this._konvaEventTools.clearPage().then(() => {
      setTimeout(() => {
        const currentQuestion = this.store().currentQuestion;
        const storeData = this._drawingStore.getStoreData()

        let pointFound = false
        storeData.pages.forEach(page => {
          if (page.strokes.length) {
            pointFound = true
          }
        })

        if (storeData.pages.length == 1) {
          if (!pointFound) {
            currentQuestion!.responses = []
          }
        } else {
          currentQuestion!.responses = [JSON.stringify(storeData)];
        }

        currentQuestion!.lastUpdated = new Date()
        this._store.updateStore({ currentQuestion })

      }, 1000)
    })
  }

  deleteCurrentPage() {
    this.showDeletePageModal = !this.showDeletePageModal

    this._drawingStore.deleteCurrentPage()
    this._konvaEventTools.deletePage().then(() => {
      const currentQuestion = this.store().currentQuestion;
      const storeData = this._drawingStore.getStoreData()

      let pointFound = false
      storeData.pages.forEach(page => {
        if (page.strokes.length) {
          pointFound = true
        }
      })

      if (storeData.pages.length == 1) {
        if (!pointFound) {
          currentQuestion!.responses = []
        }
      } else {
        currentQuestion!.responses = [JSON.stringify(storeData)];
      }

      currentQuestion!.lastUpdated = new Date()
      this._store.updateStore({ currentQuestion })
    })
  }

  selectTools(tool: string) {
    this._konvaEventTools._selectDrawingTool.next(tool)
  }

  onEraserSizeChange(el: HTMLInputElement) {
    const size = +el.value
    this._konvaEventTools._eraserSizeChange$.next(size)
  }

  selectBackgroundType(type: string | null) {
    this._konvaEventTools._backgroundChange$.next(type);
  }

  selectMeasurementTool(tool: string | null) {
    this._konvaEventTools._selectMeasurementTool$.next(tool);
    this.selectedMeasuringToolsSet().add(tool)
  }

  getSelectedTools(): any[] {
    return Array.from(this.selectedMeasuringToolsSet().values())
  }

  removeTool(tool: string | null) {
    if (tool == 'all') {
      this.selectedMeasuringToolsSet().clear()
    } else {
      this.selectedMeasuringToolsSet().delete(tool)
    }

    this._konvaEventTools._removeMeasurementTool$.next(tool);
  }

  toggleRoughWorkMode() {
    const currentConfig = this.store().drawingAndWritingConfig
    const updatedConfig = { ...currentConfig, roughWorkMode: !currentConfig.roughWorkMode }
    this._store.updateStore({ drawingAndWritingConfig: updatedConfig })
    scrollContainers()
  }
}
