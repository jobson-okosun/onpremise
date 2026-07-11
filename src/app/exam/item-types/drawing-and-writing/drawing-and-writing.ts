import { Component, computed, effect, inject, model, signal, untracked, viewChild } from '@angular/core';
import { QuestionTools } from '../../question-tools/question-tools';
import { MenuModule } from 'primeng/menu';
import { Store } from '../../../store/store';
import { CanvasService } from './services/canvas.service';
import { DrawingAndWritingStore } from './services/store.service';
import { KonvaToolsEvent } from './services/event.service';
import { Dialog } from 'primeng/dialog';
import { scrollContainers } from '../../../utils/helper';
import { DRAWING_AND_WRITING_BRUSH_COLORS } from '../../../utils/constants';
import { SafeHtmlPipe } from '../../../utils/safe-html.pipe';
import { SubQuestionNavigation } from '../../sub-question-navigation/sub-question-navigation';
import { getAlphabetChar, getRomanNumeral } from '../../../utils/helper';
import { timer } from 'rxjs';

@Component({
  selector: 'app-drawing-and-writing',
  templateUrl: './drawing-and-writing.html',
  styleUrl: './drawing-and-writing.css',
  imports: [QuestionTools, MenuModule, Dialog, SafeHtmlPipe, SubQuestionNavigation],
})
export class DrawingAndWriting {
  private _store = inject(Store)
  private _canvasService = inject(CanvasService)
  private _drawingStore = inject(DrawingAndWritingStore)
  private _konvaEventTools = inject(KonvaToolsEvent)

  private _questionTools = viewChild(QuestionTools)

  showClearPageModal = false;
  showDeletePageModal = false;

  fontSize = model<number>()
  store = computed(() => this._store.store())
  currentQuestionIndex = computed(() => this.store().currentQuestionIndex)
  currentQuestion = computed(() => this.store().currentQuestion)
  currentQuestionId = signal<string | null>(null)
  currentTool = computed(() => this._canvasService.currentTool())
  selectedMeasuringToolsSet = signal(new Set())
  brushColors = signal(DRAWING_AND_WRITING_BRUSH_COLORS)
  activeColor = computed(() => this._canvasService.brushColor())

  questionChanged = effect(() => {
    if (this.currentQuestion()?.id !== this.currentQuestionId()) {
      this.currentQuestionId.set(this.currentQuestion()!.id)

      this._konvaEventTools._questionChanged$.next(true)
      setTimeout(() => { this.prepareCanvasAndStoreDataOnLoad() }, 500)
    }
  })

  pages = computed(() => Array.from({ length: this._drawingStore.store().pages.length }, (_, i) => i))
  currentPage = computed(() => this._drawingStore.store().currentPage)
  currentPageData = computed(() => this._drawingStore.getStoreData().pages[this.currentPage()])

  activeStoreId = computed(() => this._drawingStore.getActiveStoreId())
  parentSubQuestions = computed<any[]>(() => (this.currentQuestion())?.sub_questions || [])
  activeSubQuestionId = computed(() => this._store.store().activeSubQuestionId);

  activeSubQuestionContent = computed(() => {
    const activeId = this.activeStoreId();
    if (activeId === 'default') return '';
    const subQuestions = this.parentSubQuestions();
    for (const sq of subQuestions) {
      if (sq.id === activeId) { return sq.stimulus || ''; }
      if (sq.children?.length > 0) {
        const child = sq.children.find((c: any) => c.id === activeId);
        if (child) { return child.stimulus || ''; }
      }
    }
    return '';
  });

  activeSubQuestionLabel = computed(() => {
    const activeId = this.activeStoreId();
    if (activeId === 'default') return '';
    const subQuestions = this.parentSubQuestions();

    for (let pIdx = 0; pIdx < subQuestions.length; pIdx++) {
      const sq = subQuestions[pIdx];
      if (sq.id === activeId) {
        return ` (${getAlphabetChar(pIdx)})`;
      }
      if (sq.children?.length > 0) {
        for (let cIdx = 0; cIdx < sq.children.length; cIdx++) {
          const child = sq.children[cIdx];
          if (child.id === activeId) {
            return `${getAlphabetChar(pIdx)} (${getRomanNumeral(cIdx)})`;
          }
        }
      }
    }

    return '';
  });

  subQuestionSelectionWatcher = effect(() => {
    const id = this.activeSubQuestionId();

    untracked(() => {
      if (id && id !== this._drawingStore.getActiveStoreId()) {
        this._drawingStore.setActiveStoreId(id);
        this._konvaEventTools._subQuestionSelectEvent.next();
      }
    });
  });

  prepareCanvasAndStoreDataOnLoad() {
    const currentQuestion = this.store().currentQuestion

    const backgroundType = this.store().currentQuestion?.background_type as any
    this._canvasService.backgroundType.set(backgroundType)

    this._konvaEventTools._backgroundChange$.next(backgroundType)

    if (currentQuestion!.responses.length) {
      const jsonResponse = JSON.parse(currentQuestion!.responses[0])

      if (jsonResponse.pages) {
        const storeData = { ...jsonResponse, currentPage: 0 }
        this._drawingStore.setAllStores({ 'default': storeData })
      } else {
        Object.keys(jsonResponse).forEach(key => {
          jsonResponse[key].currentPage = 0;
        });
        this._drawingStore.setAllStores(jsonResponse)
      }
    } else {
      this._drawingStore.clearStoreData();

      const sqs = currentQuestion?.sub_questions || [];
      if (sqs.length > 0) {
        // Pre-initialize empty stores for each subquestion part
        sqs.forEach(sq => {
          this._drawingStore.setActiveStoreId(sq.id);
          if (sq.children && sq.children.length > 0) {
            sq.children.forEach(child => {
              this._drawingStore.setActiveStoreId(child.id);
            });
          }
        });
      }
    }

    const sqs = currentQuestion?.sub_questions || [];
    if (sqs.length > 0) {
      this._store.updateStore({ activeSubQuestionId: sqs[0].id });
      this._drawingStore.setActiveStoreId(sqs[0].id);
    } else {
      this._store.updateStore({ activeSubQuestionId: 'default' });
      this._drawingStore.setActiveStoreId('default');
    }

    this._canvasService.initializeCanvas()
    .then(() => {
      this._questionTools()?.toggleLayout()
      this._questionTools()?.toggleLayout()
    });
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

        const updatedQuestion = this.updatedQuestionResponse()
        this._store.updateStore({ currentQuestion: updatedQuestion })
      })
  }

  clearPage() {
    this.showClearPageModal = !this.showClearPageModal

    this._konvaEventTools.clearPage().then(() => {
      setTimeout(() => {

        const updatedQuestion = this.updatedQuestionResponse()
        this._store.updateStore({ currentQuestion: updatedQuestion })
      }, 1000)
    })
  }

  deleteCurrentPage() {
    this.showDeletePageModal = !this.showDeletePageModal

    this._drawingStore.deleteCurrentPage()
    this._konvaEventTools.deletePage().then(() => {

      const updatedQuestion = this.updatedQuestionResponse()
      this._store.updateStore({ currentQuestion: updatedQuestion })
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

  undo() {
    this._drawingStore.undo();
    this._konvaEventTools._pageSelectEvent.next();
    this.updateStoreOnResponseChanges()
  }

  redo() {
    this._drawingStore.redo();
    this._konvaEventTools._pageSelectEvent.next();
    this.updateStoreOnResponseChanges()
  }

  updateStoreOnResponseChanges() {
    const currentQuestion = this.store().currentQuestion;
    if (!currentQuestion) {
      return
    };

    const updatedQuestion = this.updatedQuestionResponse()
    this._store.updateStore({ currentQuestion: updatedQuestion })
  }

  updatedQuestionResponse() {
    const currentQuestion = this.store().currentQuestion;
    if (!currentQuestion) {
      return
    };

    const allStores = this._drawingStore.getAllStores();

    let pointFound = false;
    for (const key of Object.keys(allStores)) {
      const storeData = allStores[key];
      storeData.pages.forEach(page => {
        if (page.strokes.length) {
          pointFound = true;
        }
      });
    }

    if (!pointFound) {
      currentQuestion!.responses = [];
    } else {
      currentQuestion!.responses = [JSON.stringify(allStores)];
    }

    currentQuestion!.lastUpdated = new Date()
    return currentQuestion
  }

  selectbrushColor(color: string) {
    this._canvasService.brushColor.set(color)
  }
}
