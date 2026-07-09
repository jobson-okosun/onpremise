import { Injectable, signal, computed } from '@angular/core';
import { Page, Store, Strokes } from '../model/store.model';

@Injectable({ providedIn: 'root' })
export class DrawingAndWritingStore {

  private _stores = signal<Record<string, Store>>({ default: new Store() });
  private _activeStoreId = signal<string>('default');

  store = computed(() => this._stores()[this._activeStoreId()]);

  constructor() {
    this.createNewPage();
  }

  setActiveStoreId(id: string) {
    if (!this._stores()[id]) {
      this._stores.update(stores => ({ ...stores, [id]: new Store() }));
      this.createNewPageForId(id);
    }
    this._activeStoreId.set(id);
  }

  getActiveStoreId(): string {
    return this._activeStoreId();
  }

  setAllStores(stores: Record<string, Store>) {
    this._stores.set(stores);
    const keys = Object.keys(stores);
    if (keys.length > 0 && !stores[this._activeStoreId()]) {
      this._activeStoreId.set(keys[0]);
    }
  }

  getAllStores(): Record<string, Store> {
    return this._stores();
  }

  private updateActiveStore(updater: (store: Store) => Store) {
    this._stores.update(stores => {
      const activeId = this._activeStoreId();
      const currentStore = stores[activeId] || new Store();
      return {
        ...stores,
        [activeId]: updater(currentStore)
      };
    });
  }

  createStore() {
    this.updateActiveStore(() => new Store());
    this.createNewPage();
  }

  getStoreData(): Store {
    return this._stores()[this._activeStoreId()];
  }

  updateStore(update: Partial<Store>) {
    this.updateActiveStore(store => ({
      ...store,
      ...update
    }));
  }

  updateStoreCurrentPage(currentPage: number) {
    const store = this.getStoreData();

    if (currentPage >= 0 && currentPage < store.pages.length) {
      this.updateActiveStore(s => ({ ...s, currentPage }));
    }
  }

  getCurrentPageData(): Page {
    const store = this.getStoreData();
    if (!store || !store.pages || store.pages.length === 0) return null as any;
    return store.pages[store.currentPage];
  }

  private createNewPageForId(id: string) {
    this._stores.update(stores => {
      const store = stores[id] || new Store();
      const newPageNumber = store.pages.length + 1;
      const newPage = new Page(newPageNumber);

      const updatedPages = [...store.pages, newPage];
      const newCurrentPage = updatedPages.length - 1;

      return {
        ...stores,
        [id]: {
          ...store,
          currentPage: newCurrentPage,
          pages: updatedPages
        }
      };
    });
  }

  createNewPage(): Promise<void> {
    return new Promise(resolve => {
      this.updateActiveStore(store => {
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
    this.updateActiveStore(store => {
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
    this.updateActiveStore(store => {
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
    this.updateActiveStore(store => {
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
    this.updateActiveStore(() => new Store());
    this.createNewPage();
  }

  undo() {
    this.updateActiveStore(store => {
      const pages = [...store.pages];
      const page = pages[store.currentPage];

      if (!page) return store;

      // Case 1: undo last stroke
      if (page.strokes.length) {
        const stroke = page.strokes.pop()!;
        page.redoStack.push(stroke);
        return { ...store, pages };
      }

      // CASE 2: undo clear page (ONLY ONCE)
      if (page.undoStack.length) {
        page.strokes = page.undoStack; 
        page.undoStack = [];
        page.redoStack = []; 
        return { ...store, pages };
      }
      return store;
    });
  }

  redo() {
    this.updateActiveStore(store => {
      const pages = [...store.pages];
      const page = pages[store.currentPage];

      if (!page || !page.redoStack.length) {
        return store;
      }

      const stroke = page.redoStack.pop()!;
      page.strokes.push(stroke);

      return { ...store, pages };
    });
  }
}
