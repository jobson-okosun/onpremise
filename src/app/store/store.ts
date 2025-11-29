import { Injectable, signal } from "@angular/core";
import { StoreDTO } from './model/store'
import { environment } from "../../environments/environment.development";

@Injectable({ providedIn: 'root' })
export class Store { 
    private _store = signal<StoreDTO>(new StoreDTO())
    readonly store = this._store.asReadonly()

    updateStore(state: { [key: string]: any }) {
        this._store.update(store => ({
            ...store,
            ...state
        }));

        if(!environment.production) {
            console.log(this.getStore())
        }
    }

    getStore() {
        return this._store()
    }
}