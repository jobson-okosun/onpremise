import { computed, inject, Injectable, signal } from "@angular/core";
import Konva from 'konva';
import { DrawingAndWritingStore } from "./store.service";
import { Store } from "../../../../store/store";
import { Subscription } from "rxjs";
import { KonvaToolsEvent } from "./event.service";
import { scrollContainers } from "../../../../utils/helper";
import { DRAWING_AND_WRITING_BRUSH_COLORS } from "../../../../utils/constants";

@Injectable({ providedIn: 'root' })
export class CanvasService {
    private canvasWorker?: Worker;

    private _drawingStore = inject(DrawingAndWritingStore)
    private _konvaEventTools = inject(KonvaToolsEvent)
    private _store = inject(Store)

    layoutSub$: Subscription
    questionChangeSub$: Subscription
    pageSelectEvent$: Subscription
    clearCurrentPageEvent$: Subscription
    drawingStoreSub$: Subscription
    selectDrawingTool$: Subscription
    selectMeasurementTool$: Subscription
    removeMeasurementTool$: Subscription
    eraserSizeChange$: Subscription
    backgroundChange$: Subscription
    deletePageSub$: Subscription

    store = computed(() => this._store.store())
    isTouchDevice = signal('ontouchstart' in window)
    backgroundType = signal<'LINE' | 'GRID' | 'GRAPH' | 'NONE'>('LINE')
    currentTool = signal<'brush' | 'eraser' | 'rectangle' | 'square' | 'circle'>('brush')
    currentShape = signal<Konva.Shape | null>(null)
    private shapeStartPos: { x: number, y: number } | null = null
    eraserSize = signal<number>(10)
    drawing = signal<boolean>(false)
    currentLine = signal<Konva.Line | null>(null)
    ruler = signal<Konva.Group | null>(null)
    protractor = signal<Konva.Group | null>(null)
    rulerTransformer = signal<Konva.Transformer | null>(null)
    protractorTransformer = signal<Konva.Transformer | null>(null)
    eraserCursor = signal<any>(null)
    loaded = signal(false)
    brushSize = signal(2)
    brushColor = signal(DRAWING_AND_WRITING_BRUSH_COLORS[0])
    eraserColor = signal('#f5f5f7')

    constructor() {
        this.loaded.set(true)
    }

    workOnMessageHandler() {
        this.canvasWorker!.onmessage = (e) => {
            if (!e.data) {
                return
            }

            if (e.data.type === 'UNKNOWN_SHAPE_COMPLETE') {
                return
            }

            if (!['LINE_COMPLETE', 'SHAPE_COMPLETE'].includes(e.data.type)) {
                return;
            }

            const newStroke = e.data.type == 'LINE_COMPLETE' ? e.data.stroke : e.data.shape
            const currentPageData = this._drawingStore.getCurrentPageData();
            const updatedStrokes = [...currentPageData?.strokes, newStroke];

            this._drawingStore.updateCurrentPageStrokes(updatedStrokes);

            // save into question response
            const updatedStore = this._drawingStore.getStoreData();
            const dataJson = JSON.stringify(updatedStore);

            const currentQuestion = this.store().currentQuestion;
            currentQuestion!.responses = [dataJson];
            currentQuestion!.lastUpdated = new Date();

            this._store.updateStore({ currentQuestion });
        };
    }

    terminateWorker() {
        this.canvasWorker?.terminate();
        this.canvasWorker = undefined;
    }


    initializeCanvas() {
        const stageContainer = document.getElementById('stage')
        if (!stageContainer) {
            return
        }

        const registerCanvasWorker = () => {
            this.terminateWorker()

            if (typeof Worker !== 'undefined') {
                this.canvasWorker = new Worker(new URL('../workers/canvas.worker', import.meta.url));
                this.workOnMessageHandler()
            }
        }

        registerCanvasWorker()

        const width = stageContainer.parentElement!.parentElement!.offsetWidth > this.store().drawingAndWritingConfig.layoutFullModeWidth
            ? stageContainer.parentElement!.parentElement!.offsetWidth : this.store().drawingAndWritingConfig.layoutFullModeWidth;

        const height = 1000;
        let stage = new Konva.Stage({ container: 'stage', width, height, draggable: false });
        let gridLayer = new Konva.Layer();
        let drawingLayer = new Konva.Layer();
        let uiLayer = new Konva.Layer();
        let toolLayer = new Konva.Layer();

        stage.add(gridLayer, drawingLayer, uiLayer, toolLayer);

        // Performance optimization: batch drawing
        let rafId = null;
        let needsRedraw = false;

        // Simplified smooth drawing for performance
        let lastPoint = null;
        let lastTime = Date.now();
        let pointBuffer: any[] = [];

        const createEraserTool = (size: number | null = null) => {
            const eraserCursor = new Konva.Circle({
                x: 0,
                y: 0,
                radius: size ?? 15,
                fill: 'rgba(255, 0, 0, 0.3)',
                stroke: 'red',
                strokeWidth: 1,
                visible: false,
                listening: false,
            });

            this.eraserCursor.set(eraserCursor)
            uiLayer.destroyChildren()
            uiLayer.add(eraserCursor);
            uiLayer.batchDraw();
        }

        const destroyCanvas = () => {
            if (stage) {
                stage.destroy();
                stage = null as any
            }
        }

        function drawGrid(gridSize = 50) {
            gridLayer.destroyChildren();

            const w = stage?.width();
            const h = stage?.height();

            const grid = new Konva.Shape({
                listening: false,
                perfectDrawEnabled: false,
                sceneFunc: function (ctx, shape) {
                    ctx.strokeStyle = '#e6e7e9';
                    ctx.lineWidth = 1;

                    // vertical lines
                    for (let x = 0; x <= w; x += gridSize) {
                        ctx.beginPath();
                        ctx.moveTo(x, 0);
                        ctx.lineTo(x, h);
                        ctx.stroke();
                    }

                    // horizontal lines
                    for (let y = 0; y <= h; y += gridSize) {
                        ctx.beginPath();
                        ctx.moveTo(0, y);
                        ctx.lineTo(w, y);
                        ctx.stroke();
                    }
                }
            });

            gridLayer?.add(grid);
            gridLayer?.cache()
            gridLayer?.batchDraw();
        }

        function drawLineBackground(lineSpacing = 50) {
            gridLayer.destroyChildren();

            const w = stage?.width();
            const h = stage?.height();

            const lines = new Konva.Shape({
                listening: false,
                perfectDrawEnabled: false,
                sceneFunc: function (ctx, shape) {
                    ctx.strokeStyle = '#e6e7e9';
                    ctx.lineWidth = 1;

                    for (let y = 0; y <= h; y += lineSpacing) {
                        ctx.beginPath();           // 🔥 reset path
                        ctx.moveTo(0, y);          // start of line
                        ctx.lineTo(w, y);          // end of line
                        ctx.stroke();
                    }
                }
            });

            gridLayer?.add(lines);
            gridLayer?.cache()
            gridLayer?.batchDraw();
        }

        function drawGraphBackground(majorSize = 50, minorSize = 10) {
            gridLayer.destroyChildren();

            const w = stage?.width();
            const h = stage?.height();

            const graph = new Konva.Shape({
                listening: false,
                perfectDrawEnabled: false,
                sceneFunc: function (ctx) {
                    // ---- minor lines ----
                    ctx.strokeStyle = '#e5e7eb'; // light gray
                    ctx.lineWidth = 1;

                    for (let x = 0; x <= w; x += minorSize) {
                        ctx.beginPath();
                        ctx.moveTo(x, 0);
                        ctx.lineTo(x, h);
                        ctx.stroke();
                    }

                    for (let y = 0; y <= h; y += minorSize) {
                        ctx.beginPath();
                        ctx.moveTo(0, y);
                        ctx.lineTo(w, y);
                        ctx.stroke();
                    }

                    // ---- major lines ----
                    ctx.strokeStyle = '#bac2cf'; // darker gray
                    ctx.lineWidth = 1.5;

                    for (let x = 0; x <= w; x += majorSize) {
                        ctx.beginPath();
                        ctx.moveTo(x, 0);
                        ctx.lineTo(x, h);
                        ctx.stroke();
                    }

                    for (let y = 0; y <= h; y += majorSize) {
                        ctx.beginPath();
                        ctx.moveTo(0, y);
                        ctx.lineTo(w, y);
                        ctx.stroke();
                    }
                }
            });

            gridLayer?.add(graph);
            gridLayer?.cache();
            gridLayer?.batchDraw();
        }


        const setBackgroundType = () => {
            clearBackground()

            switch (this.backgroundType()) {
                case 'LINE':
                    drawLineBackground();
                    break;

                case 'GRID':
                    drawGrid();
                    break;

                case 'GRAPH':
                    drawGraphBackground();
                    break;

                case 'NONE':
                default:
                    break;
            }

        }

        const resizeStage = () => {
            const answerSpace = document.querySelector('.answer-space') as HTMLElement

            const parent = document.getElementById('stage-parent')!;
            parent.style.height = (answerSpace.offsetHeight - 10) + 'px';

            const currentWidth = this.store().drawingAndWritingConfig.layoutFullModeWidth
            const canvasParentWidth = parent.parentElement!.offsetWidth;
            let newWidth = 0
            let resizeType = ''

            if (canvasParentWidth > currentWidth) {
                resizeType = 'EXPAND'


            } else if (canvasParentWidth < currentWidth) {
                resizeType = 'SHRINK'
            }

            if (resizeType == 'EXPAND') {
                parent.style.width = width + 'px';
                parent.style.width = stageContainer.parentElement!.parentElement!.offsetWidth + 'px';
                newWidth = stageContainer.offsetWidth as any;
            }

            if (resizeType == 'SHRINK') {
                newWidth = currentWidth
            }

            if (newWidth == 0) {
                newWidth = this.store().drawingAndWritingConfig.layoutFullModeWidth
            }

            const newHeight = 1000;
            stage?.width(newWidth);
            stage?.height(newHeight);

            setBackgroundType();
            loadCurrentPageStrokes()

        }

        function clearBackground() {
            gridLayer.destroyChildren();
            gridLayer.batchDraw();
        }

        function deltaDecode(deltas: number[]): number[] {
            if (!deltas || deltas.length < 2) return [];

            const points = [deltas[0], deltas[1]];

            for (let i = 2; i < deltas.length; i += 2) {
                const x = points[points.length - 2] + deltas[i];
                const y = points[points.length - 1] + deltas[i + 1];
                points.push(x, y);
            }

            return points;
        }

        const redrawStrokes = () => {
            drawingLayer.destroyChildren();

            const currentPageData = this._drawingStore.getCurrentPageData();
            if (!currentPageData || !currentPageData.strokes) return;

            const strokeGroup = new Konva.Group({
                listening: false,
                perfectDrawEnabled: false,
            });

            const decodedStrokes = currentPageData.strokes.map(stroke => ({
                ...stroke,
                points: deltaDecode(stroke.points)
            }));

            decodedStrokes.forEach((stroke: any) => {
                let shape: Konva.Shape | null = null;

                if (stroke.type && stroke.type === 'shape') {
                    const shapeItem = stroke;
                    const shapeType = shapeItem.shapeType;
                    const commonProps = {
                        stroke: shapeItem.color || '#111827',
                        fill: 'transparent',
                        strokeWidth: shapeItem.size,
                        listening: false,
                        perfectDrawEnabled: false,
                    };

                    if (shapeType === 'rectangle' || shapeType === 'square') {
                        shape = new Konva.Rect({
                            x: shapeItem.x,
                            y: shapeItem.y,
                            width: shapeItem.width || 0,
                            height: shapeItem.height || 0,
                            ...commonProps
                        })

                    }
                    else if (shapeType === 'circle') {
                        shape = new Konva.Circle({
                            x: shapeItem.x,
                            y: shapeItem.y,
                            radius: shapeItem.radius || 0,
                            ...commonProps
                        })
                    }

                } else {
                    shape = new Konva.Line({
                        points: stroke.points,
                        stroke: stroke.mode === 'eraser' ? '#000' : (stroke.color || '#111827'),
                        strokeWidth: stroke.size,
                        globalCompositeOperation: stroke.mode === 'eraser'
                            ? 'destination-out'
                            : 'source-over',
                        lineCap: 'round',
                        lineJoin: 'round',
                        listening: false,
                        perfectDrawEnabled: false,
                    });
                }

                if (!shape) return;

                strokeGroup.add(shape);
            });


            drawingLayer.add(strokeGroup);
            drawingLayer.batchDraw();
        };

        const loadCurrentPageStrokes = () => {
            redrawStrokes();
        }

        const clearCurrentPageStrokes = () => {
            this._drawingStore.clearCurrentPage();
            drawingLayer.destroyChildren();
            drawingLayer.batchDraw();
        }

        const createRuler = (x: number, y: number) => {
            const DPI = getDPI();
            const PIXELS_PER_CM = DPI / 2.54;
            const RULER_CM = 20;
            const RULER_HEIGHT = 50;
            const RULER_LENGTH_PX = RULER_CM * PIXELS_PER_CM;

            const group = new Konva.Group({ x, y, draggable: true });

            const body = new Konva.Rect({
                width: RULER_LENGTH_PX,
                height: RULER_HEIGHT,
                fillLinearGradientStartPoint: { x: 0, y: 0 },
                fillLinearGradientEndPoint: { x: 0, y: RULER_HEIGHT },
                fillLinearGradientColorStops: [0, "#fdfdfd", 1, "#e6e6e6"],
                stroke: "#888",
                cornerRadius: 3,
                shadowColor: "black",
                shadowBlur: 2,
                shadowOpacity: 0.2,
            });
            group.add(body);

            const mmTotal = RULER_CM * 10;
            for (let mm = 0; mm <= mmTotal; mm++) {
                const xPos = (mm / 10) * PIXELS_PER_CM;
                let tickHeight, color = "#333", width = 1;

                if (mm % 10 === 0) {
                    tickHeight = 20;
                    width = 1.2;
                } else if (mm % 5 === 0) {
                    tickHeight = 14;
                } else {
                    tickHeight = 8;
                    color = "#666";
                }

                const tick = new Konva.Line({
                    points: [xPos, RULER_HEIGHT, xPos, RULER_HEIGHT - tickHeight],
                    stroke: color,
                    strokeWidth: width,
                });
                group.add(tick);

                if (mm % 10 === 0) {
                    const label = new Konva.Text({
                        x: xPos - 4,
                        y: RULER_HEIGHT - 28,
                        text: mm === 0 ? "" : (mm / 10).toString(),
                        fontSize: 12,
                        fill: "#111",
                        fontFamily: "monospace",
                    });
                    group.add(label);
                }
            }

            const rulerTransformer = new Konva.Transformer({
                nodes: [group],
                rotateEnabled: true,
                rotationHandleOffset: 60,
                rotationHandleSize: 30,
                rotationHandleStroke: "#1976d2",
                rotationHandleFill: "#1976d2",
                enabledAnchors: ["middle-left", "middle-right"],
                borderStroke: "#1976d2",
                borderStrokeWidth: 2,
                anchorCornerRadius: 6,
            });

            this.rulerTransformer.set(rulerTransformer)
            toolLayer.add(rulerTransformer);
            toolLayer.add(group);

            stage.on("click tap", (e) => {
                if (e.target === stage) {
                    rulerTransformer.nodes([])
                }
                else if (e.target.getParent() === group) {
                    rulerTransformer.nodes([group])
                };
                toolLayer.batchDraw();
            });

            group.on("dragmove transform", () => {
                rulerTransformer.moveToTop();
                toolLayer.batchDraw();
            });

            toolLayer.batchDraw();
            return group;
        }

        function getDPI(): number {
            const div = document.createElement("div");
            div.style.width = "1in";
            div.style.height = "1in";
            div.style.position = "absolute";
            div.style.top = "-100%";
            document.body.appendChild(div);
            const dpi = div.offsetWidth;
            document.body.removeChild(div);
            return dpi;
        }

        const createProtractor = (x: number, y: number) => {
            const DPI = getDPI();
            const PIXELS_PER_CM = DPI / 2.54;
            const radius = 8 * PIXELS_PER_CM; // 8cm radius for larger size
            const group = new Konva.Group({ x, y, draggable: true });
            // Base semicircle with gradient
            const arc = new Konva.Arc({
                x: 0,
                y: 0,
                innerRadius: 0,
                outerRadius: radius,
                angle: 180,
                fillLinearGradientStartPoint: { x: -radius, y: 0 },
                fillLinearGradientEndPoint: { x: radius, y: 0 },
                fillLinearGradientColorStops: [
                    0,
                    "#fdfdfd",
                    0.5,
                    "#f0f0f0",
                    1,
                    "#e6e6e6",
                ],
                stroke: "#888",
                strokeWidth: 2,
                shadowColor: "black",
                shadowBlur: 3,
                shadowOpacity: 0.2,
            });
            group.add(arc);
            // Add degree marks every 1 degree
            for (let angle = 0; angle <= 180; angle += 1) {
                const radians = (angle * Math.PI) / 180;
                let startRadius,
                    tickWidth = 0.5,
                    color = "#999";
                if (angle % 30 === 0) {
                    // Major marks every 30 degrees
                    startRadius = radius - 40;
                    tickWidth = 2;
                    color = "#333";
                } else if (angle % 10 === 0) {
                    // Medium marks every 10 degrees
                    startRadius = radius - 30;
                    tickWidth = 1.5;
                    color = "#444";
                } else if (angle % 5 === 0) {
                    // Small marks every 5 degrees
                    startRadius = radius - 20;
                    tickWidth = 1;
                    color = "#666";
                } else {
                    // Tiny marks for every degree
                    startRadius = radius - 12;
                    tickWidth = 0.5;
                    color = "#999";
                }
                const endRadius = radius - 3;
                const x1 = startRadius * Math.cos(radians);
                const y1 = -startRadius * Math.sin(radians);
                const x2 = endRadius * Math.cos(radians);
                const y2 = -endRadius * Math.sin(radians);
                const tick = new Konva.Line({
                    points: [x1, y1, x2, y2],
                    stroke: color,
                    strokeWidth: tickWidth,
                });
                group.add(tick);
                // Add numbers for major angles (every 30 degrees)
                if (angle % 30 === 0) {
                    const textRadius = radius - 55;
                    const textX = textRadius * Math.cos(radians);
                    const textY = -textRadius * Math.sin(radians);
                    const text = new Konva.Text({
                        x: textX - 8,
                        y: textY - 8,
                        text: angle.toString(),
                        fontSize: 16,
                        fontFamily: "monospace",
                        fill: "#111",
                        fontStyle: "bold",
                    });
                    group.add(text);
                }
                // Add smaller numbers for 10-degree marks (excluding 30-degree marks)
                else if (angle % 10 === 0 && angle % 30 !== 0) {
                    const textRadius = radius - 45;
                    const textX = textRadius * Math.cos(radians);
                    const textY = -textRadius * Math.sin(radians);
                    const text = new Konva.Text({
                        x: textX - 6,
                        y: textY - 6,
                        text: angle.toString(),
                        fontSize: 12,
                        fontFamily: "monospace",
                        fill: "#333",
                    });
                    group.add(text);
                }
            }
            // Add center point
            const centerDot = new Konva.Circle({
                x: 0,
                y: 0,
                radius: 6,
                fill: "#333",
                stroke: "#fff",
                strokeWidth: 2,
            });
            group.add(centerDot);
            // Add baseline
            const baseline = new Konva.Line({
                points: [-radius, 0, radius, 0],
                stroke: "#333",
                strokeWidth: 3,
            });
            group.add(baseline);
            // Add small notch at 0 and 180 degrees
            const leftNotch = new Konva.Rect({
                x: -radius - 3,
                y: -4,
                width: 6,
                height: 8,
                fill: "#333",
            });
            const rightNotch = new Konva.Rect({
                x: radius - 3,
                y: -4,
                width: 6,
                height: 8,
                fill: "#333",
            });
            group.add(leftNotch, rightNotch);
            group.cache();

            const protractorTransformer = new Konva.Transformer({
                nodes: [group],
                rotateEnabled: true,
                rotationHandleOffset: 60,
                rotationHandleSize: 30,
                rotationHandleStroke: "#1976d2",
                rotationHandleFill: "#1976d2",
                enabledAnchors: ["middle-left", "middle-right"],
                borderStroke: "#1976d2",
                borderStrokeWidth: 2,
                anchorCornerRadius: 6,
            });
            this.protractorTransformer.set(protractorTransformer)
            toolLayer.add(protractorTransformer);
            toolLayer.add(group);

            stage.on("click tap", (e) => {
                if (e.target === stage) protractorTransformer.nodes([]);
                else if (e.target.getParent() === group) protractorTransformer.nodes([group]);
                toolLayer.batchDraw();
            });

            group.on("dragmove transform", () => {
                protractorTransformer.moveToTop();
                toolLayer.batchDraw();
            });

            return group;
        }

        function scheduleDraw() {
            if (!needsRedraw) {
                needsRedraw = true;
                rafId = requestAnimationFrame(() => {
                    drawingLayer.batchDraw();
                    needsRedraw = false;
                });
            }
        }

        // Smooth line drawing with pressure simulation
        const getStrokeWidth = (speed: number) => {
            // Simulate pressure based on drawing speed (faster = thinner)
            const minWidth = this.brushSize() * 0.5;
            const maxWidth = this.brushSize() * 1.5;
            const normalizedSpeed = Math.min(speed / 10, 1);
            return maxWidth - (normalizedSpeed * (maxWidth - minWidth));
        }

        function getCatmullRomPoints(points: any[], tension = 0.5) {
            if (points.length < 4) return points;

            const result = [];
            const numSegments = 8; // Optimized for performance

            for (let i = 0; i < points.length - 2; i += 2) {
                const p0 = i === 0 ? points.slice(i, i + 2) : points.slice(i - 2, i);
                const p1 = points.slice(i, i + 2);
                const p2 = points.slice(i + 2, i + 4);
                const p3 = i + 4 >= points.length ? points.slice(i + 2, i + 4) : points.slice(i + 4, i + 6);

                if (i === 0) {
                    result.push(p1[0], p1[1]);
                }

                for (let t = 0; t <= 1; t += 1 / numSegments) {
                    const t2 = t * t;
                    const t3 = t2 * t;

                    const x = 0.5 * (
                        (2 * p1[0]) +
                        (-p0[0] + p2[0]) * t +
                        (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
                        (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3
                    );

                    const y = 0.5 * (
                        (2 * p1[1]) +
                        (-p0[1] + p2[1]) * t +
                        (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
                        (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3
                    );

                    result.push(x, y);
                }
            }

            return result;
        }

        // Douglas-Peucker point simplification to reduce lag
        function simplifyPoints(points: any[], tolerance = 2) {
            if (points.length <= 4) return points;

            function getPerpendicularDistance(px: number, py: number, x1: number, y1: number, x2: number, y2: number) {
                const dx = x2 - x1;
                const dy = y2 - y1;
                const mag = Math.sqrt(dx * dx + dy * dy);
                if (mag > 0) {
                    const u = ((px - x1) * dx + (py - y1) * dy) / (mag * mag);
                    const ix = x1 + u * dx;
                    const iy = y1 + u * dy;
                    return Math.sqrt((px - ix) * (px - ix) + (py - iy) * (py - iy));
                }
                return Math.sqrt((px - x1) * (px - x1) + (py - y1) * (py - y1));
            }

            const pointList = [];
            for (let i = 0; i < points.length; i += 2) {
                pointList.push({ x: points[i], y: points[i + 1] });
            }

            function douglasPeucker(points: any[], tolerance: number): any {
                if (points.length <= 2) return points;

                let maxDistance = 0;
                let maxIndex = 0;
                const end = points.length - 1;

                for (let i = 1; i < end; i++) {
                    const distance = getPerpendicularDistance(
                        points[i].x, points[i].y,
                        points[0].x, points[0].y,
                        points[end].x, points[end].y
                    );

                    if (distance > maxDistance) {
                        maxDistance = distance;
                        maxIndex = i;
                    }
                }

                if (maxDistance > tolerance) {
                    const left = douglasPeucker(points.slice(0, maxIndex + 1), tolerance);
                    const right = douglasPeucker(points.slice(maxIndex), tolerance);
                    return left.slice(0, -1).concat(right);
                }

                return [points[0], points[end]];
            }

            const simplified: any[] = douglasPeucker(pointList, tolerance);
            const result: any[] = [];
            simplified.forEach(p => {
                result.push(p.x, p.y);
            });

            return result;
        }

        // Interpolate points for fast movements
        function interpolatePoints(p1: any, p2: any, numPoints = 3) {
            const points = [];
            for (let i = 1; i <= numPoints; i++) {
                const t = i / (numPoints + 1);
                points.push(
                    p1.x + (p2.x - p1.x) * t,
                    p1.y + (p2.y - p1.y) * t
                );
            }
            return points;
        }

        stage.on('pointerdown', (e) => {

            if (e.evt.pointerType !== 'pen' || e.evt.buttons !== 1) {
                return
            };

            const pos = stage.getPointerPosition();
            if (!pos) {
                return
            }

            const tool = this.currentTool();
            if (tool === 'brush' || tool === 'eraser') {
                lastPoint = pos;
                lastTime = Date.now();
                pointBuffer = [pos.x, pos.y];

                const line = new Konva.Line({
                    stroke: this.currentTool() === 'eraser' ? this.eraserColor() : this.brushColor(),
                    strokeWidth: parseInt(this.currentTool() == 'eraser' ? this.eraserSize().toString() : '2.0', 10),
                    globalCompositeOperation: this.currentTool() === 'eraser' ? 'destination-out' : 'source-over',
                    lineCap: 'round',
                    lineJoin: 'round',
                    points: [pos!.x, pos!.y],
                    listening: false,
                    tension: 0.5
                });

                this.currentLine.set(line)
                this.drawing.set(true);
                drawingLayer.add(this.currentLine() as any);
                drawingLayer.draw();

                return;
            }

            this.shapeStartPos = { x: pos.x, y: pos.y };

            let shape: Konva.Shape | null = null;
            const common = {
                x: pos.x,
                y: pos.y,
                stroke: this.brushColor(),
                strokeWidth: this.brushSize(),
                listening: false,
                dash: []
            };

            if (tool === 'rectangle' || tool === 'square') {
                shape = new Konva.Rect({
                    width: 1,
                    height: 1,
                    fill: 'transparent',
                    ...common
                } as any);
            } else if (tool === 'circle') {
                shape = new Konva.Circle({
                    radius: 1,
                    fill: 'transparent',
                    ...common
                } as any);
            }

            if (!shape) return;

            this.currentShape.set(shape)
            drawingLayer.add(shape);
            drawingLayer.draw();
        });

        stage.on('pointermove', (e) => {

            if (e.evt.pointerType !== 'pen') {
                return
            }

            const pos = stage.getPointerPosition();
            if (!pos) {
                return
            }

            if (this.drawing() && this.currentLine()) {

                if (this.isTouchDevice() && this.currentTool() === 'eraser') {
                    this.eraserCursor().position(pos);
                    this.eraserCursor().visible(true);
                    uiLayer.batchDraw();
                } else if (this.isTouchDevice()) {
                    this.eraserCursor().visible(false);
                }

                const now = Date.now();
                const timeDiff = Math.max(now - lastTime, 1);
                const distance = Math.sqrt(
                    Math.pow(pos.x - lastPoint!.x, 2) +
                    Math.pow(pos.y - lastPoint!.y, 2)
                );
                const speed = distance / timeDiff;

                if (distance > 10) {
                    const interpolated = interpolatePoints(lastPoint!, pos, Math.floor(distance / 10));
                    pointBuffer = pointBuffer.concat(interpolated);
                }

                pointBuffer.push(pos.x, pos.y);

                this.currentLine()!.points(pointBuffer);

                if (this.currentTool() === 'brush' && distance > 0) {
                    const dynamicWidth = getStrokeWidth(speed);
                    this.currentLine()!.strokeWidth(dynamicWidth);
                }

                lastPoint = pos;
                lastTime = now;

                drawingLayer.draw();
                return;
            }

            // If drawing a shape
            const shape = this.currentShape();
            if (!shape || !this.shapeStartPos) return;

            const dx = pos.x - this.shapeStartPos.x;
            const dy = pos.y - this.shapeStartPos.y;

            if (shape instanceof Konva.Rect) {
                let x = this.shapeStartPos.x;
                let y = this.shapeStartPos.y;
                let width = dx;
                let height = dy;

                if (width < 0) { x = pos.x; width = Math.abs(width); }
                if (height < 0) { y = pos.y; height = Math.abs(height); }

                if (this.currentTool() === 'square') {
                    const size = Math.max(width, height);
                    // keep square anchored from start corner direction
                    width = size;
                    height = size;
                    if (pos.x < this.shapeStartPos.x) x = this.shapeStartPos.x - size;
                    if (pos.y < this.shapeStartPos.y) y = this.shapeStartPos.y - size;
                }

                (shape as Konva.Rect).x(x);
                (shape as Konva.Rect).y(y);
                (shape as Konva.Rect).width(width);
                (shape as Konva.Rect).height(height);
            } else if (shape instanceof Konva.Circle) {
                const radius = Math.sqrt(dx * dx + dy * dy) / 2;
                // center between start and current for nicer behaviour
                const centerX = (this.shapeStartPos.x + pos.x) / 2;
                const centerY = (this.shapeStartPos.y + pos.y) / 2;
                (shape as Konva.Circle).x(centerX);
                (shape as Konva.Circle).y(centerY);
                (shape as Konva.Circle).radius(radius);
            }

            drawingLayer.draw();
        });

        stage.on('pointerup', (e) => {

            if (this.drawing() && this.currentLine()) {
                const line = this.currentLine()!;
                const rawPoints = line.points();

                if (rawPoints.length <= 6) {
                    return;
                }

                if (rawPoints.length >= 500) {
                    return;
                }

                const simplified = simplifyPoints(rawPoints, 1.5);

                const finalPoints = simplified.length < 200 ? getCatmullRomPoints(simplified) : simplified;

                line.points(finalPoints);

                scheduleDraw();

                this.canvasWorker?.postMessage({
                    type: 'LINE_POINTER_UP',
                    points: line.points(),
                    mode: line.attrs.globalCompositeOperation === 'destination-out' ? 'eraser' : 'brush',
                    color: line.stroke(),
                    size: line.strokeWidth(),
                });

                this.currentLine.set(null as any);
                this.drawing.set(false);
                pointBuffer = [];

                return;
            }

            const shape = this.currentShape();
            if (!shape) {
                return;
            }

            const tool = this.currentTool();

            const shapeStroke: any = {
                type: 'shape',
                shapeType: tool,
                stroke: shape.stroke(),
                color: shape.stroke(),
                size: shape.strokeWidth(),
                fill: shape.fill() ?? 'transparent',
            };

            if (shape instanceof Konva.Rect) {
                Object.assign(shapeStroke, {
                    x: shape.x(),
                    y: shape.y(),
                    width: shape.width(),
                    height: shape.height(),
                });
            }

            if (shape instanceof Konva.Circle) {
                Object.assign(shapeStroke, {
                    x: shape.x(),
                    y: shape.y(),
                    radius: shape.radius(),
                });
            }

            this.canvasWorker?.postMessage({
                type: 'SHAPE_POINTER_UP',
                shape: shapeStroke,
            });

            this.currentShape.set(null);
            this.shapeStartPos = null;
            drawingLayer.draw();
        });

        stage.on('mouseenter', () => {
            if (this.currentTool() === 'brush') {
                document.body.style.cursor = 'url("pen-tool-02-stroke-rounded.svg") 12 24, auto';
            } else if (this.currentTool() === 'eraser') {
                document.body.style.cursor = 'url("eraser-stroke-rounded.svg") 10 10, auto';
            } else {
                document.body.style.cursor = 'default';
            }
        });

        stage.on('mouseleave', () => {
            document.body.style.cursor = 'default';
        });

        window.addEventListener('resize', resizeStage);

        this.layoutSub$?.unsubscribe()
        this.layoutSub$ = this._konvaEventTools._toggleDrawingAndWritingLayout$.subscribe({
            next: () => {
                setTimeout(() => {
                    resizeStage();
                }, 1000)
            }
        })

        this.pageSelectEvent$?.unsubscribe()
        this.pageSelectEvent$ = this._konvaEventTools._pageSelectEvent.subscribe({
            next: () => {
                loadCurrentPageStrokes()
                scrollContainers()
                this.backgroundType.set(this.store().currentQuestion!.background_type as any)
                this._konvaEventTools._backgroundChange$.next(this.backgroundType())
            }
        })

        this.questionChangeSub$?.unsubscribe()
        this.questionChangeSub$ = this._konvaEventTools._questionChanged$.subscribe({
            next: () => {
                this._drawingStore.clearStoreData()
                this.terminateWorker()
                destroyCanvas()
                scrollContainers()
                this._drawingStore.createStore()
            }
        })

        this.clearCurrentPageEvent$?.unsubscribe()
        this.clearCurrentPageEvent$ = this._konvaEventTools.clearCurrentPageEvent$.subscribe({
            next: () => {
                clearCurrentPageStrokes()
            }
        })

        this.deletePageSub$?.unsubscribe()
        this.deletePageSub$ = this._konvaEventTools._deletePageEvent.subscribe({
            next: () => {
                loadCurrentPageStrokes()
                scrollContainers()
            }
        })

        this.selectDrawingTool$?.unsubscribe()
        this.selectDrawingTool$ = this._konvaEventTools._selectDrawingTool.subscribe({
            next: (tool) => {
                this.currentTool.set(tool as any);

                if (!this.isTouchDevice()) {
                    return
                }

                if (this.currentTool() === 'eraser') {
                    this.eraserCursor()?.position({ x: stage?.width() - 100, y: 10 });
                    this.eraserCursor().visible(true);
                    uiLayer.batchDraw();

                    return
                }

                this.eraserCursor().visible(false);
                uiLayer.batchDraw();
            }
        })

        this.eraserSizeChange$?.unsubscribe()
        this.eraserSizeChange$ = this._konvaEventTools._eraserSizeChange$.subscribe({
            next: (size) => {
                createEraserTool(size);
                this.eraserSize.set(size * 2);
                this._konvaEventTools._selectDrawingTool.next('eraser')
            }
        })

        this.backgroundChange$?.unsubscribe()
        this.backgroundChange$ = this._konvaEventTools._backgroundChange$.subscribe({
            next: (type) => {
                if (!this.loaded()) {
                    return
                }

                if (!type) {
                    return
                }

                this.backgroundType.set(type as any)
                setBackgroundType()
            }
        })

        this.selectMeasurementTool$?.unsubscribe()
        this.selectMeasurementTool$ = this._konvaEventTools._selectMeasurementTool$.subscribe({
            next: (tool) => {

                if (tool === 'ruler' && !this.ruler()) {
                    this.ruler.set(createRuler(100, 100));
                    toolLayer.add(this.ruler() as any);
                }

                if (tool === 'protractor' && !this.protractor()) {
                    this.protractor.set(createProtractor(400, 350));
                    toolLayer.add(this.protractor() as any);
                }

                toolLayer.batchDraw();
            },
        });

        this.removeMeasurementTool$?.unsubscribe()
        this.removeMeasurementTool$ = this._konvaEventTools._removeMeasurementTool$.subscribe({
            next: (tool) => {

                if (tool == 'all') {
                    this.ruler()?.destroy()
                    this.ruler.set(null)
                    this.protractor()?.destroy()
                    this.protractor.set(null)
                    toolLayer.destroyChildren()
                }

                if (tool === 'ruler') {
                    this.ruler()?.destroy()
                    this.ruler.set(null)
                    toolLayer.getChildren((item) => item == this.ruler())?.[0]?.destroy()
                    toolLayer.getChildren((item) => item == this.rulerTransformer())?.[0]?.destroy()
                }

                if (tool === 'protractor') {
                    this.protractor()?.destroy()
                    this.protractor.set(null)
                    toolLayer.getChildren((item) => item == this.protractor())?.[0]?.destroy()
                    toolLayer.getChildren((item) => item == this.protractorTransformer())?.[0]?.destroy()
                }

                toolLayer.batchDraw();
            },
        });

        createEraserTool()
        setBackgroundType()
        loadCurrentPageStrokes()
    }
}