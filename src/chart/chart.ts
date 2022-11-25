import Shape from '../shape/shape';

import { Point, Color } from '../types';

type ChartConstructor = {
    context: CanvasRenderingContext2D
}

type State = {
    baseViewportPoint: Point;
    baseChartAreaPoint: Point;
    cursorPoint: Point;
    drawing: boolean;
}

type AssignerProp = {
    
}


class Chart {
    ctx: CanvasRenderingContext2D;
    shape: Shape | null;
    state: State;

    constructor({ context }: ChartConstructor){
        this.ctx = context;
        this.shape = null
        this.state = {
            baseViewportPoint: {pointX: 0, pointY: 0},
            baseChartAreaPoint: {pointX: 0, pointY: 0},
            cursorPoint: {pointX: 0, pointY: 0},
            drawing: false
        }
    }

    private _render(){
        // clear canvas
        this._clear();
        // render all parts of canvas
        console.log('render');
        this.shape.renderChartArea();
        this.shape.renderViewport();
    }

    // private _update(){
    //     // first step - delete whole canvas
    //     this._clear();
    //     // second step - re-render whole canvas
    //     this._render();
    // }

    private _clear(){
        // clear all canvas
        const { width, height } = this.ctx.canvas.getBoundingClientRect();
        this.ctx.clearRect(0, 0, width, height);
    }

    private _updateState(changedProperty: AssignerProp){
        Object.assign(this.state, changedProperty)
    }
    

    init(){
        this.shape = new Shape({context: this.ctx});
        this.loop();
    }

    loop(){
        // this._render()
        this._updateState({drawing: true})
        console.log(this.state.drawing);
        
    }
}

export default Chart;