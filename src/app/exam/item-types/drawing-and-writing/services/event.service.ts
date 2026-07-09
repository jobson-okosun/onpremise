import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

export type DrawingMode = 'brush' | 'eraser';

@Injectable({ providedIn: 'root' })

export class KonvaToolsEvent {
  _gotoPage = new BehaviorSubject<boolean>(false);
  gotoPage$: Observable<boolean> = this._gotoPage.asObservable();

  _clearCurrentPageEvent = new Subject<void>();
  clearCurrentPageEvent$: Observable<void> = this._clearCurrentPageEvent.asObservable();

   _pageSelectEvent = new Subject<void>();
  pageSelectEvent$: Observable<any> = this._pageSelectEvent.asObservable();

  _subQuestionSelectEvent = new Subject<void>();
  subQuestionSelectEvent$: Observable<void> = this._subQuestionSelectEvent.asObservable();

  _questionChanged$ = new Subject<boolean>();
  _toggleDrawingAndWritingLayout$ = new Subject<void>();
  _selectDrawingTool = new Subject<string>();
  _selectMeasurementTool$ = new BehaviorSubject<string | null>(null);
  _removeMeasurementTool$ = new BehaviorSubject<string | null>(null);
  _backgroundChange$ = new BehaviorSubject<string | null>(null);
  _eraserSizeChange$ = new Subject<number>();
  _deletePageEvent = new Subject<void>();

  clearPage(): Promise<void> {
     return new Promise((resolve) => {
        this._clearCurrentPageEvent.next()
        resolve();
     })
  }

  deletePage(): Promise<void> {
     return new Promise((resolve) => {
        this._deletePageEvent.next()
        resolve();
     })
  }
}