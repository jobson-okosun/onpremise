import { Routes } from '@angular/router';
import { hasActiveExam, isLoggedin } from './guards/onboarding';
import { canGoBackFromExam, examNotEnded } from './guards/exam';
import { OnboardingLayout } from './proctor-onboarding/onboarding-layout/onboarding-layout';


export const routes: Routes = [
    { path: '', redirectTo: 'usage-guide', pathMatch: 'full' },
    { 
        path: 'proctored',
        children: [
            { path: '', redirectTo: 'auth', pathMatch: 'full' },
            { path: 'auth', loadComponent: () => import('./proctor-onboarding/authentication/authentication')},
            { path: 'auth/login', loadComponent: () => import('./proctor-onboarding/login/login')},
            { 
                path: 'onboarding', 
                component: OnboardingLayout, 
                children: [
                    { path: '', redirectTo: 'overview', pathMatch: 'full' },
                    { path: 'overview', loadComponent: () => import('./proctor-onboarding/exam-details/exam-details')},
                    { path: 'system-check', loadComponent: () => import('./proctor-onboarding/system-check/system-check')},
                    { path: 'guidelines', loadComponent: () => import('./proctor-onboarding/exam-guidelines/exam-guidelines')},
                    { path: 'rules', loadComponent: () => import('./proctor-onboarding/exam-rules/exam-rules')},
                    { path: 'device-check/audio', loadComponent: () => import('./proctor-onboarding/compatibility-check/audio/audio')},
                    { path: 'device-check/video', loadComponent: () => import('./proctor-onboarding/compatibility-check/video/video')},
                    { path: 'facial-biometric', loadComponent: () => import('./proctor-onboarding/facial-authentication/facial-authentication')},
                    { path: 'start-exam', loadComponent: () => import('./proctor-onboarding/start-exam/start-exam')}
                ]
            }
        ]
    },
    { path: 'usage-guide', loadComponent: () => import('./usage-guide/usage-guide')},
    { path: 'welcome', canActivate: [hasActiveExam], loadComponent: () => import('./welcome/welcome')},
    { path: 'login', canActivate: [hasActiveExam], loadComponent: () => import('./login/login')},
    { path: 'overview', canActivate: [isLoggedin], loadComponent: () => import('./overview/overview')},
    { path: 'instruction', canActivate: [isLoggedin], loadComponent: () => import('./instructions/instructions')},
    // { path: 'exam', canActivate: [isLoggedin, examNotEnded], canDeactivate: [canGoBackFromExam], loadComponent: () => import('./exam/layout/layout')},
    { path: 'exam', loadComponent: () => import('./exam/layout/layout')},
    { path: 'exam-ended', loadComponent: () => import('./exam-ended/exam-ended')}
];
  