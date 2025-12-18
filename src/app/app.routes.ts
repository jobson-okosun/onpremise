import { Routes } from '@angular/router';
import { hasActiveExam, isLoggedin } from './guards/onboarding';
import { canGoBackFromExam } from './guards/exam';

export const routes: Routes = [
    { path: '', redirectTo: 'usage-guide', pathMatch: 'full' },
    { path: 'usage-guide', loadComponent: () => import('./usage-guide/usage-guide')},
    { path: 'welcome', canActivate: [hasActiveExam], loadComponent: () => import('./welcome/welcome')},
    { path: 'login', canActivate: [hasActiveExam], loadComponent: () => import('./login/login')},
    { path: 'overview', canActivate: [isLoggedin], loadComponent: () => import('./overview/overview')},
    { path: 'instruction', canActivate: [isLoggedin], loadComponent: () => import('./instructions/instructions')},
    // canActivate []
    { path: 'exam', canDeactivate: [canGoBackFromExam], loadComponent: () => import('./exam/layout/layout')},
    { path: 'exam-ended', loadComponent: () => import('./exam-ended/exam-ended')}
];
 