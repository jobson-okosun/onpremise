import { Injectable } from '@angular/core';
import * as mediasoup from 'mediasoup-client';

@Injectable({
  providedIn: 'root'
})
export class MediasoupService {
  private device: mediasoup.types.Device | null = null;

  async createDevice(routerRtpCapabilities: mediasoup.types.RtpCapabilities): Promise<void> {
    this.device = new mediasoup.Device();
    await this.device.load({ routerRtpCapabilities });
  }

  get recvRtpCapabilities(): mediasoup.types.RtpCapabilities {
    if (!this.device) throw new Error('Device not initialized');
    return this.device.recvRtpCapabilities;
  }

  createSendTransport(options: any): mediasoup.types.Transport {
    if (!this.device) throw new Error('SendTransport: Device not initialized');
    return this.device.createSendTransport(options);
  }

  createRecvTransport(options: any): mediasoup.types.Transport {
    if (!this.device) throw new Error('RecvTransport: Device not initialized');
    return this.device.createRecvTransport(options);
  }

  async produce(transport: mediasoup.types.Transport, track: MediaStreamTrack, appData: { source: string }): Promise<mediasoup.types.Producer> {
    if (track.kind === 'video') {
      if (appData.source === 'webcam') {
        // ── Webcam: Simulcast (3 layers) as per blueprint ──────────────────
        return await transport.produce({
          track,
          encodings: [
            { rid: 'r0', maxBitrate: 100000, scalabilityMode: 'S1T3' },
            { rid: 'r1', maxBitrate: 300000, scalabilityMode: 'S1T3' },
            { rid: 'r2', maxBitrate: 900000, scalabilityMode: 'S1T3' },
          ],
          codecOptions: { videoGoogleStartBitrate: 1000 },
          appData
        });
      } else {
        // ── Screen: Single high-bitrate encoding as per blueprint ────────────
        return await transport.produce({
          track,
          encodings: [{ maxBitrate: 1500000 }],
          codecOptions: { videoGoogleStartBitrate: 1000 },
          appData
        });
      }
    } else {
      // ── Mic: Simple production without extra codecOptions per blueprint ──
      return await transport.produce({
        track,
        appData
      });
    }
  }

  async consume(transport: mediasoup.types.Transport, options: any): Promise<mediasoup.types.Consumer> {
    return await transport.consume(options);
  }
}
