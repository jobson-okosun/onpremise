export type AudioTestState = 'idle' | 'permission' | 'recording' | 'recorded' | 'playing' | 'passed' | 'error';
export type VideoTestState = 'idle' | 'permission' | 'preview' | 'passed' | 'error';
export type Stage = 'audio' | 'video';
export type CaptureState = 'initializing' | 'ready' | 'countdown' | 'capturing' | 'captured' | 'error';
export type ProctorState = 'idle' | 'initializing' | 'active' | 'error' | 'denied';