import Controller from '../controller';

import { TConfig, Point, Offset, APoints } from '../types';

type Props = {
    ctx: CanvasRenderingContext2D;
    controller: Controller;
    config: TConfig;
}

class EventHandler {
    ctx: CanvasRenderingContext2D;
    controller: Controller;
    config: TConfig;
    cursorPoint: Point;
    drawing: boolean;
    offset: Offset;

    constructor({ ctx, controller, config }: Props){
        this.ctx = ctx;
        this.controller = controller;
        this.config = config;
        this.cursorPoint = {pointX: 0, pointY: 0};
        this.offset = {distanceX: 0, distanceY: 0};
        this.drawing = false;
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
            // update offset distance it is MAIN what _mouseMove doing
            const diffX = event.offsetX - this.cursorPoint.pointX;
            let areaOffsetX = this.offset.distanceX + diffX;
            // adjust offset if beyond range
            if(areaOffsetX > 0){
                areaOffsetX = 0
            }
            const newOffset: Offset = {
                distanceX: areaOffsetX,
                distanceY: this.offset.distanceY
            }
            
            this.offset = newOffset;
            console.log(this.offset);
            
            this._updateConfig(this.offset);
            
            // update cursor point
            this.cursorPoint.pointX = event.offsetX;
            this.cursorPoint.pointY = event.offsetY;
        }
    }

    private _updateConfig(offset: Offset){
        const areasPoints = this.config.areasPoints;
        // overload areas points with offset
        const updatedPoints: APoints = {
            chart: {
                pointX: areasPoints.chart.pointX + offset.distanceX,
                pointY: areasPoints.chart.pointY + offset.distanceY
            },
            labels: {
                pointX: areasPoints.labels.pointX + offset.distanceX,
                pointY: areasPoints.labels.pointY + offset.distanceY
            },
            values: {
                pointX: areasPoints.values.pointX,
                pointY: areasPoints.values.pointY
            },
            white: {
                pointX: areasPoints.white.pointX,
                pointY: areasPoints.white.pointY
            }
        }

        const config = { ...this.config, areasPoints: updatedPoints}
        this.controller.clear();
        this.controller.update(config);
    }

    private _addEventListeners(){
        this.ctx.canvas.addEventListener('mousedown', this._mouseDown.bind(this));
        this.ctx.canvas.addEventListener('mouseup', this._mouseUp.bind(this));
        this.ctx.canvas.addEventListener('mousemove', this._mouseMove.bind(this))
    }

    bindEvents(){
        this._addEventListeners()
    }
}

export default EventHandler;