import { inject } from "@angular/core"
import { CanActivateFn, CanDeactivateFn } from "@angular/router"
import { ExamService } from "../services/exam"
import Layout from "../exam/layout/layout"
import { AuthService } from "../services/auth"

export const canGoBackFromExam: CanDeactivateFn<Layout> = (): boolean => {
    const _examService = inject(ExamService)   
    
    return _examService.examEnded()
}

export const examNotEnded: CanActivateFn = (): boolean => {
    const _examService = inject(ExamService)   
    const _authService = inject(AuthService)   
    
    return _examService.examEnded() ? _authService.notAuthorized() : true
}