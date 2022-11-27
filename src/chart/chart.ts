import Shape from '../shape/shape';

import { InitSettings, Point, Color } from '../types';

type ChartConstructor = {
    context: CanvasRenderingContext2D
}

type Position = {
    baseViewportPoint: Point;
    baseChartAreaPoint: Point;
}

type AssignerProp = {
    
}


class Chart {
    ctx: CanvasRenderingContext2D;
    shape: Shape | null;
    cursorPoint: Point;
    drawing: boolean;
    shapesPosition: Position;

    constructor({ context }: ChartConstructor){
        this.ctx = context;
        this.shape = null;
        this.cursorPoint = {pointX: 0, pointY: 0};
        this.drawing = false
        this.shapesPosition = {
            baseViewportPoint: {pointX: 0, pointY: 0},
            baseChartAreaPoint: {pointX: 0, pointY: 0}
        }

        this._addEventListeners()
    }

    private _render(){
        // clear canvas
        this._clear();
        // render all parts of canvas
        console.log('render');

        // this.shape.renderChartArea(
        //     this.shapesPosition.baseChartAreaPoint.pointX, 
        //     this.shapesPosition.baseChartAreaPoint.pointY
        // );
        // this.shape.renderVerticalAxes();
        // this.shape.renderHorizontalAxes(
        //     this.shapesPosition.baseChartAreaPoint.pointX,
        //     this.shapesPosition.baseChartAreaPoint.pointY 
        // );
        // this.shape.renderViewport(
        //     this.shapesPosition.baseViewportPoint.pointX, 
        //     this.shapesPosition.baseViewportPoint.pointY
        // );
    }

    private _clear(){
        // clear all canvas
        const { width, height } = this.ctx.canvas.getBoundingClientRect();
        this.ctx.clearRect(0, 0, width, height);
    }

    private _updateShapesPosition(changedProperty: AssignerProp){
        Object.assign(this.shapesPosition, changedProperty);
        // redraw canvas
        this._render();
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
        // in _mouseMove method i want to move chartArea 
        if(this.drawing){
            // calculate diff cursor way between events, diff wont be equal and depends on speed move
            // diff can be positive or negative
            const diffX = event.offsetX - this.cursorPoint.pointX;
            const diffY = event.offsetY - this.cursorPoint.pointY;
            // calculate new points
            const newPointX = this.shapesPosition.baseChartAreaPoint.pointX + diffX;
            const newPointY = this.shapesPosition.baseChartAreaPoint.pointY + diffY;
            // update baseChartAreaPoint it is MAIN what _mouseMove doing
            this._updateShapesPosition({
                baseChartAreaPoint: {pointX: newPointX, pointY: newPointY}
            });
            console.log(this.shapesPosition);
            
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
    

    init(settings: InitSettings){
        const { data, options } = settings;

        this.shape = new Shape({context: this.ctx, data, options});
        // this._render();


        // testing
        this.shape.renderChartArea()
        this.shape.renderVerticalAxes()
        this.shape.renderHorizontalAxes()
        this.shape.renderViewport()
    }
}

export default Chart;