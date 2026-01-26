/// <reference lib="webworker" />

let workerFrames: Uint8Array;
let workerMeta: Int32Array;
let workerWidth = 0;
let workerHeight = 0;
let workerFrameSize = 0;
let workerDto: { candidate_id: string; exam_id: string };

onmessage = (e: MessageEvent<{
    frameSAB: SharedArrayBuffer;
    metaSAB: SharedArrayBuffer;
    width: number;
    height: number;
    dto: { candidate_id: string; exam_id: string };
}>) => {
    workerFrames = new Uint8Array(e.data.frameSAB);
    workerMeta = new Int32Array(e.data.metaSAB);
    workerWidth = e.data.width;
    workerHeight = e.data.height;
    workerFrameSize = workerWidth * workerHeight * 4;
    workerDto = e.data.dto;

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

            Atomics.store(workerMeta, 1, (readIndex + 1) % 4);
            
            console.log('[Worker] Sending frame to main thread.......................');

            // Post message to main thread instead of calling invoke directly
            // The main thread will handle the Tauri invoke call
            postMessage({
                type: "PROCESS_FRAME",
                payload: {
                    width: workerWidth,
                    height: workerHeight,
                    data: Array.from(frame),
                    dto: workerDto
                }
            });
        } catch (e) {
            console.error("Worker processLoop error:", e);
        }

        await new Promise((r) => setTimeout(r, 10));
    }
}
