import { Injectable, signal, computed } from '@angular/core';
import { Page, Store, Strokes } from '../model/store.model';

@Injectable({ providedIn: 'root' })
export class DrawingAndWritingStore {

  private _store = signal<Store>(new Store());

  store = computed(() => this._store());

  constructor() {
    this.createNewPage();
  }

  createStore() {
    this._store.set(new Store())
    this.createNewPage()
  }

  getStoreData(): Store {
    return this._store();
  }

  updateStore(update: Partial<Store>) {
    this._store.update(store => ({
      ...store,
      ...update
    }));
  }

  updateStoreCurrentPage(currentPage: number) {
    const store = this._store();

    if (currentPage >= 0 && currentPage < store.pages.length) {
      this._store.update(s => ({ ...s, currentPage }));
    }
  }

  getCurrentPageData(): Page {
    const store = this._store();
    return store.pages[store.currentPage];
  }

  createNewPage(): Promise<void> {
    return new Promise(resolve => {
      this._store.update(store => {
        const newPageNumber = store.pages.length + 1;
        const newPage = new Page(newPageNumber);

        const updatedPages = [...store.pages, newPage];
        const newCurrentPage = updatedPages.length - 1;

        return {
          ...store,
          currentPage: newCurrentPage,
          pages: updatedPages
        };
      });

      resolve();
    });
  }

  deleteCurrentPage() {
    this._store.update(store => {
      let { currentPage, pages } = store;

      if (pages.length === 1) {
        return store; // cannot delete last page
      }

      const updatedPages = pages.filter((_, index) => index !== currentPage);

      let newCurrentPageIndex: number;

      if (updatedPages.length === 0) {
        newCurrentPageIndex = 0;
      } else if (currentPage > 0 && currentPage === pages.length - 1) {
        newCurrentPageIndex = updatedPages.length - 1;
      } else {
        newCurrentPageIndex = currentPage;
      }

      const reIndexedPages = updatedPages.map((page, index) => {
        page.page = index + 1;
        return page;
      });

      return {
        ...store,
        currentPage: newCurrentPageIndex,
        pages: reIndexedPages
      };
    });
  }


  selectPage(pageIndex: number) {
    this.updateStoreCurrentPage(pageIndex);
  }

  clearCurrentPage() {
    this._store.update(store => {
      const updatedPages = store.pages.map((page, i) => {
        if (i === store.currentPage) {
          return { ...page, strokes: [], undoStack: page.strokes, redoStack: [] };
        }

        return page;
      });

      return { ...store, pages: updatedPages };
    });
  }


  updateCurrentPageStrokes(strokes: Strokes[]) {
    this._store.update(store => {
      const updatedPages = store.pages.map((page, i) => {
        if (i === store.currentPage) {
          return { ...page, strokes: [...strokes], undoStack: [], redoStack: [] };
        }

        return page;
      });

      return {
        ...store,
        pages: updatedPages,
      };
    });
  }

  clearStoreData() {
    const newStore = new Store();

    this._store.set(newStore);
  }

  undo() {
    this._store.update(store => {
      const page = store.pages[store.currentPage];

      // Case 1: undo last stroke
      if (page.strokes.length) {
        const stroke = page.strokes.pop()!;
        page.redoStack.push(stroke);
        return { ...store };
      }

      // CASE 2: undo clear page (ONLY ONCE)
      if (page.undoStack.length) {
        page.strokes = page.undoStack; 
        page.undoStack = [];
        page.redoStack = []; 
        return { ...store };
      }
      return store;
    });
  }


  redo() {
    this._store.update(store => {
      const pages = [...store.pages];
      const page = pages[store.currentPage];

      if (!page.redoStack.length) {
        return store
      }

      const stroke = page.redoStack.pop()!;
      page.strokes.push(stroke);

      return { ...store, pages };
    });
  }


}
