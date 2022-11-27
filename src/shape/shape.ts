import { Data, Options, Point, Color } from '../types';
import { defaultChartOptions as defOptions } from '../common/';

type ShapeConstructor = {
    context: CanvasRenderingContext2D;
    data: Data;
    options: Options;
}

class Shape {
    ctx: CanvasRenderingContext2D;
    data: Data;
    options: Options;

    constructor({ context, data, options }: ShapeConstructor){
        this.ctx = context;
        this.data = data;
        this.options = this._getOptions(options);
        console.log(this.options);
        
    } 

    private _getOptions(options?: Options): Options {
        const opts = Boolean(options) ? Object.assign(defOptions, options) : defOptions;
        return opts;
    }

    renderViewport(x: number, y: number) {
        const { width, height } = this.ctx.canvas.getBoundingClientRect();

        this.ctx.fillStyle = Color.Grey;
        this.ctx.strokeRect(x, y, width, height);
    }

    renderChartArea (x: number, y: number) {
        console.log(`renderingChartArea, X - ${x}, Y - ${y}`);
        
        const { width, height } = this.ctx.canvas.getBoundingClientRect();
        
        const chartArea = new Path2D();
        chartArea.rect(
            x, 
            y, 
            width, 
            height
        );
        this.ctx.fillStyle = this.options.backgroundColor;
        this.ctx.fill(chartArea);
    }

}

export default Shape