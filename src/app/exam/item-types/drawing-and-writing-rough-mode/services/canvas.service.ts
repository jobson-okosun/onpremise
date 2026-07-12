import { computed, inject, Injectable, signal } from "@angular/core";
import Konva from 'konva';
import { DrawingAndWritingStore } from "./store.service";
import { Store } from "../../../../store/store";
import simplify from 'simplify-js';
import { Subscription } from "rxjs";
import { KonvaToolsEvent } from "./event.service";
import { scrollContainers } from "../../../../utils/helper";
import { DRAWING_AND_WRITING_BRUSH_COLORS } from "../../../../utils/constants";

@Injectable({ providedIn: 'root' })
export class CanvasService {
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

    async initializeCanvas(): Promise<void> {
        const stageContainer = document.getElementById('stage')
        if (!stageContainer) {
            return
        }

        const width = stageContainer.parentElement!.parentElement!.offsetWidth > this.store().drawingAndWritingConfig.layoutFullModeWidth
            ? stageContainer.parentElement!.parentElement!.offsetWidth : this.store().drawingAndWritingConfig.layoutFullModeWidth;

        const height = 1000;
        let stage = new Konva.Stage({ container: 'stage', width, height, draggable: false });
        let gridLayer = new Konva.Layer();
        let plottedLayer = new Konva.Layer();
        let drawingLayer = new Konva.Layer();
        let uiLayer = new Konva.Layer();
        let toolLayer = new Konva.Layer();
        stage.add(gridLayer, plottedLayer, drawingLayer, uiLayer, toolLayer);

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
            for (let x = 0; x <= w; x += gridSize) {
                gridLayer.add(new Konva.Line({ points: [x, 0, x, h], stroke: '#e6e7e9', strokeWidth: 1, listening: false }));
            }
            for (let y = 0; y <= h; y += gridSize) {
                gridLayer.add(new Konva.Line({ points: [0, y, w, y], stroke: '#e6e7e9', strokeWidth: 1, listening: false }));
            }

            gridLayer?.cache();
            gridLayer?.batchDraw();
        }

        function drawLineBackground(lineSpacing = 50) {
            gridLayer.destroyChildren();
            const w = stage?.width();
            const h = stage?.height();

            for (let y = 0; y <= h; y += lineSpacing) {
                gridLayer.add(new Konva.Line({
                    points: [0, y, w, y],
                    stroke: '#e6e7e9',
                    strokeWidth: 1,
                    listening: false
                }));
            }

            gridLayer?.cache();
            gridLayer?.batchDraw();
        }

        function drawPlottedGrid(gridSize = 50) {
            plottedLayer.destroyChildren();

            const w = stage?.width();
            const h = stage?.height();
            for (let x = 0; x <= w; x += gridSize) {
                for (let y = 0; y <= h; y += gridSize) {
                    plottedLayer.add(new Konva.Circle({ x, y, radius: 2, fill: '#9ca3af', listening: false }));
                }
            }

            plottedLayer?.cache();
            plottedLayer?.batchDraw();
        }

        const setBackgroundType = () => {
            clearBackground()

            if (this.backgroundType() == 'LINE') {
                drawLineBackground();
                return
            }

            if (this.backgroundType() == 'GRID') {
                drawGrid();
                drawPlottedGrid();
                return
            }

        }

        const resizeStage = () => {
            const answerSpace = document.querySelector('.answer-space') as HTMLElement
            if (!answerSpace) {
                return
            }

            const parent = document.getElementById('stage-parent')!;
            if (!parent) {
                return
            }
            parent.style.height = (answerSpace.offsetHeight - 2) + 'px';

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

            const newHeight = 1000;
            stage?.width(newWidth);
            stage?.height(newHeight);

            setBackgroundType();
            loadCurrentPageStrokes()

        }

        function clearBackground() {
            plottedLayer.visible(false);
            gridLayer.destroyChildren();
            gridLayer.batchDraw();
        }

        function deltaEncode(points: number[]): number[] {
            if (!points || points.length < 2) return [];

            const deltas = [points[0], points[1]];

            for (let i = 2; i < points.length; i += 2) {
                const dx = points[i] - points[i - 2];
                const dy = points[i + 1] - points[i - 1];
                deltas.push(Number(dx.toFixed(1)), Number(dy.toFixed(1)));
            }

            return deltas;
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

            // Decode all strokes before drawing
            const decodedStrokes = currentPageData.strokes.map(stroke => ({
                ...stroke,
                points: deltaDecode(stroke.points)
            }));

            decodedStrokes.forEach(stroke => {
                const line = new Konva.Line({
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
                strokeGroup.add(line);
            });


            drawingLayer.add(strokeGroup);
            drawingLayer.batchDraw();

            requestAnimationFrame(() => {
                if (!currentPageData?.strokes?.length) {
                    return
                }

                strokeGroup?.cache({ pixelRatio: 1 });
                drawingLayer?.batchDraw();
            });
        };

        const loadCurrentPageStrokes = () => {
            redrawStrokes();
        }

        const clearCurrentPageStrokes = () => {
            this._drawingStore.updateCurrentPageStrokes([]);
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

        stage.on('pointerdown', (e) => {
            if (e.evt.pointerType !== 'pen') {
                return
            }

            if (!(this.currentTool() === 'brush' || this.currentTool() === 'eraser')) {
                return
            }

            this.drawing.set(true);
            const pos = stage.getPointerPosition();

            const currentLine = new Konva.Line({
                stroke: this.currentTool() === 'eraser' ? this.eraserColor() : this.brushColor(),
                strokeWidth: parseInt(this.currentTool() == 'eraser' ? this.eraserSize().toString() : '2.0', 10),
                globalCompositeOperation: this.currentTool() === 'eraser' ? 'destination-out' : 'source-over',
                lineCap: 'round',
                lineJoin: 'round',
                points: [pos!.x, pos!.y],
                listening: false,
                perfectDrawEnabled: false
            });

            this.currentLine.set(currentLine)
            drawingLayer.add(this.currentLine() as any);
        });

        stage.on('pointermove', (e) => {
            if (e.evt.pointerType !== 'pen' || e.evt.buttons !== 1) {
                return
            }

            if (!this.drawing() || !this.currentLine()) {
                return
            };

            const pos = stage.getPointerPosition();

            if (this.isTouchDevice() && this.currentTool() === 'eraser') {
                this.eraserCursor().position(pos);
                this.eraserCursor().visible(true);
                uiLayer.batchDraw();
            } else if (this.isTouchDevice()) {
                this.eraserCursor().visible(false);
            }

            if (!(this.currentTool() === 'brush' || this.currentTool() === 'eraser')) {
                return
            }

            const newPoints = this.currentLine()?.points().concat([pos!.x, pos!.y]);
            this.currentLine()?.points(newPoints);
        });

        stage.on('pointerup', (e) => {
            if (this.drawing() && this.currentLine()) {
                this.currentLine()!.cache();
                drawingLayer.batchDraw();

                const roundedPoints = this.currentLine()!.points().map((val, idx) => {
                    return Number(val.toFixed(1));
                });

                const pointObjects = [];
                for (let i = 0; i < roundedPoints.length; i += 2) {
                    pointObjects.push({ x: roundedPoints[i], y: roundedPoints[i + 1] });
                }

                const simplifiedPoints = simplify(pointObjects, 0.275, true);
                const finalPoints = simplifiedPoints.flatMap((p: any) => [p.x, p.y]);

                // Delta encode before saving
                const encodedPoints = deltaEncode(finalPoints);

                const newStroke = {
                    points: encodedPoints,
                    mode: this.currentLine()?.attrs.globalCompositeOperation === 'destination-out' ? 'eraser' : 'brush',
                    color: this.currentLine()?.stroke(),
                    size: this.currentLine()?.strokeWidth(),
                };

                // Get the current strokes from the store, add the new one, and then update the store.
                const currentPageData = this._drawingStore.getCurrentPageData();
                const updatedStrokes: any[] = [...currentPageData?.strokes, newStroke];

                this._drawingStore.updateCurrentPageStrokes(updatedStrokes);
                const updatedStore = this._drawingStore.getStoreData()

                // save directly to item response
                const dataJson = JSON.stringify(updatedStore)
                const currentQuestion = this.store().currentQuestion;
                currentQuestion!.roughWorkResponse = [dataJson];
                // currentQuestion!.lastUpdated = new Date()
                this._store.updateStore({ currentQuestion })

                // Reset local state for the next stroke
                this.currentLine.set(null as any);
            }

            this.drawing.set(false)

            if (this.isTouchDevice()) {
                this.eraserCursor().visible(false);
                uiLayer.batchDraw();
            }
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

        stage.on('pointerleave pointercancel', () => {
            if (this.drawing()) {
                this.currentLine.set(null as any);
                this.drawing.set(false);
            }
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