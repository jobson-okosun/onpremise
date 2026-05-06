/// <reference lib="webworker" />

import { IFrameProcessor } from "../model/model";

let workerFrames: Uint8Array;
let workerMeta: Int32Array;
let workerWidth = 0;
let workerHeight = 0;
let workerFrameSize = 0;
let workerFrameCount = 4; // Default fallback

let candidate = {};

onmessage = (e: MessageEvent<IFrameProcessor>) => {
    workerFrames = new Uint8Array(e.data.frameSAB);
    workerMeta = new Int32Array(e.data.metaSAB);
    workerWidth = e.data.width;
    workerHeight = e.data.height;
    workerFrameSize = workerWidth * workerHeight * 4;

    workerFrames = new Uint8Array(e.data.frameSAB);
    workerMeta = new Int32Array(e.data.metaSAB);
    workerWidth = e.data.width;
    workerHeight = e.data.height;
    workerFrameSize = workerWidth * workerHeight * 4;
    workerFrameCount = e.data.frameCount || 10;

    candidate = e.data.candidate

    processLoop();
};

async function processLoop() {
    while (true) {
        try {
            Atomics.wait(workerMeta, 0, Atomics.load(workerMeta, 0));

            const readIndex = Atomics.load(workerMeta, 1);
            const offset = readIndex * workerFrameSize;

            // COPY ONLY ONE FRAME (bounded cost)
            const frame = workerFrames.slice(offset, offset + workerFrameSize);

            Atomics.store(workerMeta, 1, (readIndex + 1) % workerFrameCount);

            // console.log('[Worker] Sending frame to main thread.......................');

            // Post message to main thread instead of calling invoke directly
            postMessage({
                type: "PROCESS_FRAME",
                payload: {
                    width: workerWidth,
                    height: workerHeight,
                    data: Array.from(frame),
                    dto: {
                        ...candidate,
                        audio_stream: [],
                    }
                }
            }, [frame.buffer] as any);
        } catch (e) {
            console.error("Worker processLoop error:", e);
        }

        await new Promise((r) => setTimeout(r, 333));
    }
}
