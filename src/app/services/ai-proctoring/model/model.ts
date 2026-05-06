export interface IFrameProcessor {
    frameSAB: SharedArrayBuffer;
    metaSAB: SharedArrayBuffer;
    width: number;
    height: number;
    frameCount: number;
    candidate: Icandidate
} 

export interface Icandidate {
    candidate_id: string;
    batch_id: string;
    exam_id: string;
}  