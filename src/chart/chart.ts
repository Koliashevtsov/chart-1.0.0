import Shape from '../shape/shape';

import { InitSettings, Point, Offset } from '../types';

import Core from '../core';

type ChartConstructor = {
    context: CanvasRenderingContext2D
}

class Chart {
    ctx: CanvasRenderingContext2D;
    shape: Shape | null;
    cursorPoint: Point;
    drawing: boolean;
    offset: Offset;

    constructor({ context }: ChartConstructor){
        this.ctx = context;
        this.shape = null;
        this.cursorPoint = {pointX: 0, pointY: 0};
        this.drawing = false
        this.offset = {
            distanceX: 0,
            distanceY: 0
        }

        this._addEventListeners()
    }

    private _render(){
        // clear canvas
        this._clear();
        // render all parts of canvas
        console.log('render');
        this.shape.renderChartArea(this.offset);
        this.shape.renderLabelsArea(this.offset);
        this.shape.renderValuesArea();
        this.shape.renderViewport();
    }

    private _clear(){
        // clear all canvas
        const { width, height } = this.ctx.canvas.getBoundingClientRect();
        this.ctx.clearRect(0, 0, width, height);
    }

    private _updateOffset(changedObj: {}){
        Object.assign(this.offset, changedObj);
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
        type Shape = {
            id: string;
            update: () => void,
            render: () => void,
            draw: () => void
        }

        const area1: Shape = {
            id: '0',
            draw: function(){console.log('draw1');
            },
            update: function(){console.log('update1'), area1.draw();
            },
            render: function(){console.log('render1'), area1.draw()}
        }
        const area2: Shape = {
            id: '1',
            draw: function(){console.log('draw2');
            },
            update: function(){console.log('update2'), area2.draw();
            },
            render: function(){console.log('render2'), area2.draw()}
        }

        const core = new Core();
        core.register(area1);
        core.register(area2);
        core.run();
        
    }
}

export default Chart;