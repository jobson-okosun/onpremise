/// <reference lib="webworker" />

import simplify from 'simplify-js';

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


addEventListener('message', ({ data }) => {

  if (data.type == 'LINE_POINTER_UP') {
    const { points, mode, color, size } = data;
    const rounded = points;

    const pointObjects = [];
    for (let i = 0; i < rounded.length; i += 2) {
      pointObjects.push({ x: rounded[i], y: rounded[i + 1] });
    }

    const simplified = simplify(pointObjects, 0.275, true);
    const finalPoints = simplified.flatMap(p => [p.x, p.y]);
    const encodedPoints = deltaEncode(finalPoints);
    const stroke = { 
      points: encodedPoints, 
      mode, 
      color, 
      size
    };

    postMessage({ type: 'LINE_COMPLETE', stroke });

    return;
  }

  if (data.type === 'SHAPE_POINTER_UP') {
    const shape = data.shape;

    postMessage({ type: 'SHAPE_COMPLETE', shape });
    return;
  }

});

