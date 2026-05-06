import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalingService {
  private socket: WebSocket | null = null;
  private messageHandlers = new Map<string, (data: any) => void>();

  public onEvent = (msg: any) => { };
  public connectionStatus = signal<'connected' | 'disconnected' | 'connecting'>('disconnected');

  connect(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connectionStatus.set('connecting');
      this.socket = new WebSocket(url);

      this.socket.onopen = () => {
        this.connectionStatus.set('connected');
        resolve();
      };

      this.socket.onclose = () => {
        this.connectionStatus.set('disconnected');
        this.socket = null;
      };

      this.socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        const { type, data } = msg;

        // If there's a one-time handler for this type, call it
        if (this.messageHandlers.has(type)) {
          const handler = this.messageHandlers.get(type)!;
          this.messageHandlers.delete(type);
          handler(data);
        } else {
          this.onEvent(msg);
        }
      };

      this.socket.onerror = (error) => {
        this.connectionStatus.set('disconnected');
        reject(error);
      };
    });
  }

  send(type: string, data: any = {}) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.error('Signaling: Socket not open');
      return;
    }
    this.socket.send(JSON.stringify({ type, data }));
  }

  /**
   * Waits for the next message of a specific type.
   */
  waitFor<T>(type: string): Promise<T> {
    return new Promise((resolve) => {
      this.messageHandlers.set(type, (data) => resolve(data as T));
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}
