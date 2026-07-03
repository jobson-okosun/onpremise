import { Component, computed, inject } from '@angular/core';
import { MediaService } from '../../../services/media';
import { OnboardingService } from '../../../services/system-check/onboarding';
import { EventService } from '../../../services/event';
import { CandidateEventType } from '../../../store/model/events/events.enum';

@Component({
  selector: 'app-audio',
  imports: [],
  templateUrl: './audio.html',
  styleUrl: './audio.css',
})
export default class Audio {
  private _mediaService = inject(MediaService);
  private _onboardingService = inject(OnboardingService);
  private _eventService = inject(EventService);

  audioState = computed(() => this._mediaService.audioState());
  hasAudioPermission = computed(() => this._mediaService.hasAudioPermission());
  audioDevices = computed(() => this._mediaService.audioDevices());
  selectedAudioDeviceId = computed(() => this._mediaService.selectedAudioDeviceId());
  recordedBlobUrl = computed(() => this._mediaService.recordedBlobUrl());
  recordingError = computed(() => this._mediaService.recordingError());

  async requestAudioPermission() {
    this._mediaService.requestAudioPermission();
  }

  selectAudioDevice(deviceId: string) {
    this._mediaService.selectedAudioDeviceId.set(deviceId);
  }

  recordAudio() {
    this._eventService.logEvent({ event_type: CandidateEventType.MIC_TEST_STARTED });
    this._mediaService.recordAudio();
  }

  playAudioRecording() {
    this._mediaService.playAudioRecording();
  }

  confirmAudioWorks() {
    this._eventService.logEvent({ event_type: CandidateEventType.MIC_TEST_COMPLETED });
    this._mediaService.confirmAudioWorks();
    this._onboardingService.markStepCompleted('device-check-audio');
  }
}
