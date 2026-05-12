import { Component, computed, effect, ElementRef, inject, OnDestroy, viewChild } from '@angular/core';
import { MediaService } from '../../../services/media';
import { OnboardingService } from '../../../services/system-check/onboarding';

@Component({
  selector: 'app-video',
  imports: [],
  templateUrl: './video.html',
  styleUrl: './video.css',
})
export default class Video implements OnDestroy {
  private _mediaService = inject(MediaService);
  private _onboardingService = inject(OnboardingService);

  videoPreview = viewChild<ElementRef<HTMLVideoElement>>('videoPreview');

  videoState = computed(() => this._mediaService.videoState());
  hasVideoPermission = computed(() => this._mediaService.hasVideoPermission());
  videoDevices = computed(() => this._mediaService.videoDevices());
  selectedVideoDeviceId = computed(() => this._mediaService.selectedVideoDeviceId());
  videoError = computed(() => this._mediaService.videoError());
  videoStream = computed(() => this._mediaService._videoStream());

  ngOnInit() {
    if (this.videoState() !== 'idle') {
      this.requestVideoPermission()
    }
  }

  async requestVideoPermission() {
    await this._mediaService.requestVideoPermission();

    // Set video element after permission is granted
    const videoEl = this.videoPreview()?.nativeElement;
    if (videoEl) {
      this._mediaService.setVideoElement(videoEl);
    }
  }

  selectVideoDevice(deviceId: string) {
    this._mediaService.switchVideoDevice(deviceId);
  }

  confirmVideoWorks() {
    this._mediaService.confirmVideoWorks();
    this._onboardingService.markStepCompleted('device-check-video');
  }

  onVideoElementReady(el: HTMLVideoElement) {
    this._mediaService.setVideoElement(el);
  }

  ngOnDestroy() {
    this._mediaService.stopVideoStream();
  }
}
