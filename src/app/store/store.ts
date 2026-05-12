import { Injectable, signal } from "@angular/core";
import { StoreDTO } from './model/store';

@Injectable({ providedIn: 'root' })
export class Store { 
    private _store = signal<StoreDTO>(new StoreDTO())
    readonly store = this._store.asReadonly()

    updateStore(state: { [key: string]: any }) {
        this._store.update(store => ({
            ...store,
            ...state
        }));
    }

    getStore() {
        return this._store()
    }
}