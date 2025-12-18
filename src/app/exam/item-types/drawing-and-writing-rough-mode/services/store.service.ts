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

  updateCurrentPageStrokes(strokes: Strokes[]) {
    this._store.update(store => {
      const updatedPages = store.pages.map((page, i) => {
        if (i === store.currentPage) {
          return { ...page, strokes: [...strokes] };
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
}
