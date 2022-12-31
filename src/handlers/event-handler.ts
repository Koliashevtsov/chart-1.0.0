import Controller from '../controller';

import { TConfig, Point, Offset } from '../types';

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
            const areaOffsetX = this.offset.distanceX + diffX;

            
            // TODO create changeOffset method in config class and call instead _updateOffset
            // this._updateOffset({
            //     distanceX: areaOffsetX,
            // });
            console.log('offset', areaOffsetX);
            
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

    bindEvents(){
        this._addEventListeners()
    }
}

export default EventHandler;