import { Point } from '../types'; 

import { baseCanvasPoint } from '../common';

import { renderViewport, renderChartArea } from '../shapes/shapes';

let drawing = false;

const cursorPointer: Point = {
    pointX: 0,
    pointY: 0
}

const baseChartAreaPoint: Point = {
    pointX: 0,
    pointY: 0
}

const mouseDown = (event: MouseEvent) => {
    // setting cursorPoint to event mouse point
    cursorPointer.pointX = event.offsetX;
    cursorPointer.pointY = event.offsetY;

    drawing = true;
}

const mouseUp = (event: MouseEvent) => {
    drawing = false;
}

const mouseMove = (event: MouseEvent, ctx: CanvasRenderingContext2D) => {
    if(drawing){
        // clear prev canvas
        const { x, y, width, height } = ctx.canvas.getBoundingClientRect();
        ctx.clearRect(0, 0, width, height);
        // calculate diff cursor way between renders
        const diffX = event.offsetX - cursorPointer.pointX;
        const diffY = event.offsetY - cursorPointer.pointY;
        // update baseChartAreaPoint
        baseChartAreaPoint.pointX += diffX;
        baseChartAreaPoint.pointY += diffY; 
        // redraw canvas
        renderChartArea(baseChartAreaPoint, ctx)
        renderViewport(baseCanvasPoint, ctx)
        // update cursorPoint
        cursorPointer.pointX = event.offsetX;
        cursorPointer.pointY = event.offsetY;
    }
}

export {
    mouseDown,
    mouseUp,
    mouseMove
}