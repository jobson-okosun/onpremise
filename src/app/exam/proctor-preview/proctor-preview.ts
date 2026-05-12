import { Component, computed, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { ProctorService } from '../../services/auto-proctoring/proctor';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { LiveProctoringService } from '../../services/live-proctoring/live-proctoring.service';
import { ExamService } from '../../services/exam';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'proctor';
  timestamp: Date;
}

@Component({
  selector: 'app-proctor-preview',
  imports: [CdkDrag, FormsModule, DatePipe],
  templateUrl: './proctor-preview.html',
  styleUrl: './proctor-preview.css',
})
export class ProctorPreview {
  private _proctor = inject(ProctorService);
  private _liveProctoring = inject(LiveProctoringService);
  private _exam = inject(ExamService);
  
  videoElement = viewChild<ElementRef<HTMLVideoElement>>('videoEl');
  chatContainer = viewChild<ElementRef<HTMLDivElement>>('chatMessagesContainer');
  
  isMinimized = signal(false);
  isChatOpen = signal(false);
  chatMessage = signal('');
  messages = signal<ChatMessage[]>([]);
  unreadCount = signal(0);
  isTargetSpeaking = computed(() => this._liveProctoring.isTargetSpeaking())
  
  stream = computed(() => {
    if (this._exam.isLiveProctoring()) {
      return this._liveProctoring.stream();
    }

    return this._proctor.stream();
  });

  isActive = computed(() => {
    if (this._exam.isLiveProctoring()) {
      return !!this._liveProctoring.stream();
    }

    return !!this._proctor.stream()
  });

  constructor() {
    effect(() => {
      const video = this.videoElement()?.nativeElement;
      const stream = this.stream();
      
      if (video && stream) {
        video.muted = true;
        video.srcObject = stream;
      }
    });
  }

  toggleMinimize() {
    this.isMinimized.update(v => !v);
  }

  toggleChat() {
    this.isChatOpen.update(v => !v);
    if (this.isChatOpen()) {
      this.unreadCount.set(0);
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  sendMessage() {
    const text = this.chatMessage().trim();
    if (!text) return;

    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    this.messages.update(msgs => [...msgs, newMessage]);
    this.chatMessage.set('');
    this.scrollToBottom();
  }

  receiveMessage(text: string) {
    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      text,
      sender: 'proctor',
      timestamp: new Date()
    };

    this.messages.update(msgs => [...msgs, newMessage]);
    
    if (!this.isChatOpen()) {
      this.unreadCount.update(c => c + 1);
    } else {
      this.scrollToBottom();
    }
  }

  private scrollToBottom() {
    const container = this.chatContainer()?.nativeElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
