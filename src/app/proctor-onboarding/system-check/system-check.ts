import { Component, computed, inject, OnInit } from '@angular/core';
import { OnboardingService } from '../../services/system-check/onboarding';
import { CheckStatus, SystemCheckService } from '../../services/system-check/system-check';
import { EventService } from '../../services/event';
import { CandidateEventType } from '../../store/model/events/events.enum';

@Component({
    selector: 'app-system-check',
    imports: [],
    templateUrl: './system-check.html',
    styleUrl: './system-check.css',
})
export default class SystemCheck implements OnInit {
    private _systemCheckService = inject(SystemCheckService);
    private _onboardingService = inject(OnboardingService);
    private _eventService = inject(EventService);

    checks = computed(() => this._systemCheckService.checks());
    isRunning = computed(() => this._systemCheckService.isRunning());
    isComplete = computed(() => this._systemCheckService.isComplete());
    allChecksPassed = computed(() => this._systemCheckService.allChecksPassed());
    criticalChecksPassed = computed(() => this._systemCheckService.criticalChecksPassed());

    passedCount = computed(() => this.checks().filter(c => c.status === 'passed').length);
    warningCount = computed(() => this.checks().filter(c => c.status === 'warning').length);
    failedCount = computed(() => this.checks().filter(c => c.status === 'failed').length);

    ngOnInit() {
        this.runChecks();
    }

    async runChecks() {
        this._eventService.logEvent({ event_type: CandidateEventType.SYSTEM_CHECK_STARTED });
        const success = await this._systemCheckService.runAllChecks();
        
        if (success) {
            this._eventService.logEvent({ event_type: CandidateEventType.SYSTEM_CHECK_COMPLETED });
            this._onboardingService.markStepCompleted('system-check');
        } else {
            this._eventService.logEvent({ event_type: CandidateEventType.SYSTEM_CHECK_FAILED });
        }
    }

    rerunChecks() {
        this._systemCheckService.reset();
        this.runChecks();
    }

    getStatusIcon(status: CheckStatus): string {
        switch (status) {
            case 'pending':
                return 'circle';
            case 'checking':
                return 'loader';
            case 'passed':
                return 'check';
            case 'warning':
                return 'alert';
            case 'failed':
                return 'x';
            default:
                return 'circle';
        }
    }

    getStatusColor(status: CheckStatus): string {
        switch (status) {
            case 'pending':
                return 'text-gray-400';
            case 'checking':
                return 'text-blue-500';
            case 'passed':
                return 'text-green-500';
            case 'warning':
                return 'text-amber-500';
            case 'failed':
                return 'text-red-500';
            default:
                return 'text-gray-400';
        }
    }
}
