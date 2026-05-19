import { inject, Injectable, signal } from '@angular/core';
import { SignalingService } from './signaling.service';
import { MediasoupService } from './mediasoup.service';

export interface LiveProctoringConfig {
  batch_id: string;
  role: 'candidate';
  user_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class LiveProctoringService {
  private signalingService = inject(SignalingService);
  private mediasoupService = inject(MediasoupService);

  private sendTransport: any = null;
  private recvTransport: any = null;
  private peerId: string | null = null;
  private signalInterval: any = null;
  private screenProducer: any = null;

  // Track consumers to manage audio elements (Blueprint: consumerMap)
  private consumers = new Map<string, { element: HTMLAudioElement; kind: string }>();

  public isStreaming = signal(false);
  public stream = signal<MediaStream | null>(null);
  public isTargetSpeaking = signal(false);
  public proctorAudioState = signal(false);
  hasSharedFullScreen = signal<boolean | null>(null);

  constructor() {
    this.signalingService.onEvent = (msg) => this.handleServerMessage(msg);
  }

  async initialize(config: LiveProctoringConfig): Promise<boolean> {
    if (this.stream()) return true;

    try {
      await this.startUserMedia();

      await this.signalingService.connect();

      this.signalingService.send('joinRoom', config);

      return true;
    } catch (error) {
      console.error('LiveProctoring: Initialization failed', error);
      return false;
    }
  }

  async startUserMedia() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 } }
      });

      this.stream.set(stream);
    } catch (error) {
      console.error('LiveProctoring: getUserMedia failed', error);
      throw error;
    }
  }

  private async handleServerMessage(msg: any) {
    const { type, data } = msg;

    try {
      switch (type) {
        // candidate has joined
        case 'joined':
          await this.onJoined(data);
          break;

        // media pipe (transport) created
        case 'transportCreated':
          await this.onTransportCreated(data);
          break;

        // media pipe connected
        case 'transportConnected':
          break;

        // local media (cam/mic/screen) published
        case 'produced':
          break;

        // receiving proctor's audio
        case 'newConsumer':
          await this.onNewConsumer(data);
          break;

        // proctor audio stopped
        case 'consumerClosed':
          this.onConsumerClosed(data);
          break;

        // proctor mic muted
        case 'consumerPaused':
          this.onConsumerPaused(data);
          break;

        // proctor mic unmuted
        case 'consumerResumed':
          this.onConsumerResumed(data);
          break;

        // proctor started their media
        case 'newProducer':
          this.onNewProducer(data);
          break;

        // proctor is speaking
        case 'proctorSpeakTarget':
          this.handleProctorSpeak(data);
          break;

        // server error occurred
        case 'error':
          console.error('LiveProctoring: Server error', data.message);
          break;

        // unrecognized message type
        default:
          console.warn(`LiveProctoring: Unknown message type: ${type}`);
          break;
      }
    } catch (e) {
      console.error(`LiveProctoring: Error handling ${type}`, e);
    }
  }

  private async onJoined(data: any) {
    this.peerId = data.peer_id;
    await this.mediasoupService.createDevice(data.router_rtp_capabilities);

    this.signalingService.send('setRtpCapabilities', {
      rtp_capabilities: this.mediasoupService.recvRtpCapabilities
    });

    this.signalingService.send('createWebRtcTransport', { consuming: false });
    this.signalingService.send('createWebRtcTransport', { consuming: true });

    this.startSignalReporting();
  }

  private async onTransportCreated(data: any) {
    const { transport_id, ice_parameters, ice_candidates, dtls_parameters, consuming } = data;

    if (consuming) {
      this.recvTransport = this.mediasoupService.createRecvTransport({
        id: transport_id,
        iceParameters: ice_parameters,
        iceCandidates: ice_candidates,
        dtlsParameters: dtls_parameters,
      });

      this.recvTransport.on('connect', ({ dtlsParameters }: any, callback: any) => {
        this.signalingService.send('connectTransport', { transport_id, dtls_parameters: dtlsParameters });
        callback();
      });
    } else {
      this.sendTransport = this.mediasoupService.createSendTransport({
        id: transport_id,
        iceParameters: ice_parameters,
        iceCandidates: ice_candidates,
        dtlsParameters: dtls_parameters,
      });

      this.sendTransport.on('connect', ({ dtlsParameters }: any, callback: any) => {
        this.signalingService.send('connectTransport', { transport_id, dtls_parameters: dtlsParameters });
        callback();
      });

      this.sendTransport.on('produce', async ({ kind, rtpParameters, appData }: any, callback: any, errback: any) => {
        try {
          this.signalingService.send('produce', {
            transport_id,
            kind,
            rtp_parameters: rtpParameters,
            source: appData.source
          });

          const producedData = await this.signalingService.waitFor<any>('produced');
          callback({ id: producedData.producer_id });
        } catch (error) {
          errback(error);
        }
      });

      await this.publishMedia();
      this.isStreaming.set(true);
    }
  }

  private async onNewConsumer(data: any) {
    if (!this.recvTransport) return;

    const consumer = await this.mediasoupService.consume(this.recvTransport, {
      id: data.consumer_id,
      producerId: data.producer_id,
      kind: data.kind,
      rtpParameters: data.rtp_parameters,
    });

    const audio = new Audio();
    audio.autoplay = true;
    audio.srcObject = new MediaStream([consumer.track]);

    this.consumers.set(data.consumer_id, { element: audio, kind: data.kind });

    if (data.kind === 'audio') {
      this.proctorAudioState.set(true);
    }

    this.signalingService.send('consumerResume', { consumer_id: data.consumer_id });
  }

  private onConsumerClosed(data: any) {
    const info = this.consumers.get(data.consumer_id);
    if (info) {
      info.element.srcObject = null;
      info.element.remove();
      this.consumers.delete(data.consumer_id);
    }
    this.proctorAudioState.set(false);
    this.isTargetSpeaking.set(false);
  }

  private onConsumerPaused(data: any) {
    const info = this.consumers.get(data.consumer_id);
    if (info?.kind === 'audio') {
      this.proctorAudioState.set(false);
    }
  }

  private onConsumerResumed(data: any) {
    const info = this.consumers.get(data.consumer_id);
    if (info?.kind === 'audio') {
      this.proctorAudioState.set(true);
    }
  }

  private onNewProducer(data: any) {
    // console.log(`LiveProctoring: New producer from proctor: ${data.source}`);
  }

  private handleProctorSpeak(data: any) {
    if (data.target_id === null) {
      this.isTargetSpeaking.set(true);
    } else if (data.target_id === this.peerId) {
      this.isTargetSpeaking.set(true);
    } else {
      this.isTargetSpeaking.set(false);
    }
  }

  private async publishMedia() {
    try {
      if (!this.stream()) return;

      await this.mediasoupService.produce(this.sendTransport, this.stream()!.getVideoTracks()[0], { source: 'webcam' });
      await this.mediasoupService.produce(this.sendTransport, this.stream()!.getAudioTracks()[0], { source: 'mic' });
      this.signalingService.send('reportMicState', { muted: false });

      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: { displaySurface: 'monitor', width: { ideal: 1920 }, height: { ideal: 1080 } }
        });

        const track = screenStream.getVideoTracks()[0];
        
        if (track.getSettings().displaySurface !== 'monitor') {
          track.stop();
          this.hasSharedFullScreen.set(false);
          throw new Error('Entire Screen sharing is required.');
        }

        track.onended = () => {
          if (this.screenProducer) {
            this.signalingService.send('closeProducer', { producer_id: this.screenProducer.id });
            this.screenProducer.close();
            this.screenProducer = null;
          }
        };

        this.screenProducer = await this.mediasoupService.produce(this.sendTransport, track, { source: 'screen' });
        this.hasSharedFullScreen.set(true);
      } catch (err) {
        console.warn('LiveProctoring: Screen capture failed', err);
      }
    } catch (error) {
      console.error('LiveProctoring: Media capture failed', error);
    }
  }

  private startSignalReporting() {
    this.signalInterval = setInterval(() => {
      this.signalingService.send('reportSignalStrength', { strength: 100 });
    }, 5000);
  }

  cleanUpLiveProctoring() {
    if (this.signalInterval) clearInterval(this.signalInterval);

    this.consumers.forEach(c => {
      c.element.srcObject = null;
      c.element.remove();
    });

    this.consumers.clear();

    if (this.screenProducer) {
      this.screenProducer.close();
      this.screenProducer = null;
    }
    this.sendTransport?.close();
    this.recvTransport?.close();
    this.signalingService.disconnect();
    this.isStreaming.set(false);
    this.stream.set(null);
  }
}
