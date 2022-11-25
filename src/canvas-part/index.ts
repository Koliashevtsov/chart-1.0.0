import { Point, Color } from '../types';

type CanvasPartConstructor = {
    context: CanvasRenderingContext2D
}

class CanvasPart {
    ctx: CanvasRenderingContext2D;
    baseViewportPoint: Point;
    baseChartAreaPoint: Point;
    cursorPoint: Point;
    drawing: boolean;

    constructor({context}: CanvasPartConstructor){
        this.ctx = context;
        this.baseViewportPoint = {pointX: 0, pointY: 0};
        this.baseChartAreaPoint = {pointX: 0, pointY: 0};
        this.cursorPoint = {pointX: 0, pointY: 0};
        this.drawing = false

        this._addEventListeners();
    }

    private _mouseDown(event: MouseEvent){
        // reset cursor point and start to draw
        this.cursorPoint.pointX = event.offsetX;
        this.cursorPoint.pointY = event.offsetY;
        this.drawing = true;
    }

    private _mouseUp(){
        this.drawing = false;
    }

    private _mouseMove(event: MouseEvent){
        if(this.drawing){
            // calculate diff cursor way between events, diff wont be equal and depends on speed move
            // diff can be positive or negative
            const diffX = event.offsetX - this.cursorPoint.pointX;
            const diffY = event.offsetY - this.cursorPoint.pointY;

            // update baseChartAreaPoint
            this.baseChartAreaPoint.pointX += diffX;
            this.baseChartAreaPoint.pointY += diffY;

            // update cursor point
            this.cursorPoint.pointX = event.offsetX;
            this.cursorPoint.pointY = event.offsetY;
        }
    }

    private _addEventListeners(){
        this.ctx.canvas.addEventListener('mousedown', this._mouseDown.bind(this));
        this.ctx.canvas.addEventListener('mouseup', this._mouseUp.bind(this));
        this.ctx.canvas.addEventListener('mousemove', this._mouseMove.bind(this))
    }

    renderViewport() {
        const { width, height } = this.ctx.canvas.getBoundingClientRect();
        const x = this.baseViewportPoint.pointX;
        const y = this.baseViewportPoint.pointY;

        this.ctx.fillStyle = Color.Grey;
        this.ctx.strokeRect(x, y, width, height);
    }

    renderChartArea () {
        console.log(`renderingChartArea, X - ${this.baseChartAreaPoint.pointX}, Y - ${this.baseChartAreaPoint.pointY}`);
        
        const { width, height } = this.ctx.canvas.getBoundingClientRect();
        
        const chartArea = new Path2D();
        chartArea.rect(
            this.baseChartAreaPoint.pointX, 
            this.baseChartAreaPoint.pointY, 
            width, 
            height
        );
        this.ctx.fillStyle = Color.Orange;
        this.ctx.fill(chartArea);
    }

}

export default CanvasPart