import { InitSettings, Point, Offset, Data, Options, DefOptions, InputOptions, TObserver } from '../types';

import Core from '../core';
import Config from '../config';
import { ChartArea, LabelsArea, ValuesArea } from '../areas';

type ChartConstructor = {
    context: CanvasRenderingContext2D
}

class Chart {
    ctx: CanvasRenderingContext2D;
    cursorPoint: Point;
    drawing: boolean;
    offset: Offset;

    constructor({ context }: ChartConstructor){
        this.ctx = context;
        this.cursorPoint = {pointX: 0, pointY: 0};
        this.drawing = false
        this.offset = {
            distanceX: 0,
            distanceY: 0
        }

        this._addEventListeners()
    }


    private _clear(){
        // clear all canvas
        const { width, height } = this.ctx.canvas.getBoundingClientRect();
        this.ctx.clearRect(0, 0, width, height);
    }

    private _updateOffset(changedObj: {}){
        Object.assign(this.offset, changedObj);
        // redraw canvas
        // this._render();
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

            

            this._updateOffset({
                distanceX: areaOffsetX,
            });
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
    

    init(settings: InitSettings){
        const { data, options } = settings;

        // this.shape = new Shape({context: this.ctx, data, options});
        // this._render();


        // testing
        // this.shape.renderChartArea()
        // this.shape.renderLabelsArea()
        // this.shape.renderValuesArea()
        // this.shape.renderViewport()

        // testing

        const config = new Config({ctx: this.ctx, data, inputOptions: options});
        const chartArea = new ChartArea(config);
        const labelsArea = new LabelsArea(config);
        const valuesArea = new ValuesArea(config);

        const core = new Core();
        core.register(chartArea);
        core.register(labelsArea);
        core.register(valuesArea);
        core.run();
        
    }
}

export default Chart;