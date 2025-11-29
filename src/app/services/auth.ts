import { inject, Injectable } from "@angular/core";
import { Store } from "../store/store";
import { IAssessmentPreLoginData } from "../store/model/types";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _store = inject(Store)
    private _router = inject(Router)

    getComputerId(): string {
        return localStorage.getItem('computerId') ?? '';
    }

    saveComputerId(data: IAssessmentPreLoginData) {
        const hasComputerId = !!localStorage.getItem("computerId");
        if (hasComputerId) {
            return
        }

        localStorage.setItem("computerId", data?.unique_id);
    }

    setPreLoginData(data: IAssessmentPreLoginData) {
        const getComputerId = this.getComputerId();

        const newLoginData = { ...data }
        newLoginData.unique_id = getComputerId ? getComputerId : data.unique_id;

        this._store.updateStore({ preloginData: newLoginData })
        this.saveComputerId(data);
    }

    noActiveExam() {
        this._router.navigate(['usage-guide'])
        return false
    }

    notAuthorized() {
        this._router.navigate(['usage-guide'])
        localStorage.clear()
        return false
    }
}