import { inject } from "@angular/core"
import { CanDeactivateFn } from "@angular/router"
import { ExamService } from "../services/exam"
import Layout from "../exam/layout/layout"

export const canGoBackFromExam: CanDeactivateFn<Layout> = (component, currentRoute, currentState, nextState): boolean => {
    const _examService = inject(ExamService)   
    
    return _examService.examEnded()
}