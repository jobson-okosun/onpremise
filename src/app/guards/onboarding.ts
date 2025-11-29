import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { Store } from "../store/store";
import { AuthService } from "../services/auth";

export const hasActiveExam:CanActivateFn = () => {
    const _store = inject(Store)
    const _authService = inject(AuthService)

    return _store.getStore().preloginData ? true : _authService.noActiveExam()
}

export const isLoggedin:CanActivateFn = () => {
    const _store = inject(Store)
    const _authService = inject(AuthService)

    return _store.getStore().loginData ? true : _authService.notAuthorized()
}
