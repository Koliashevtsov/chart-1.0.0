import { Data, Options, Point, Color } from '../types';
import { defaultChartOptions as defOptions, defaultSizes } from '../common/';

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
    } 

    private _getOptions(options?: Options): Options {
        const opts = Boolean(options) ? Object.assign(defOptions, options) : defOptions;
        return opts;
    }

    renderViewport (x: number, y: number) {
        const { width, height } = this.ctx.canvas.getBoundingClientRect();

        this.ctx.fillStyle = Color.Grey;
        this.ctx.strokeRect(x, y, width, height);
    }
 
    renderChartArea (x: number, y: number) {
        console.log(`renderingChartArea, X - ${x}, Y - ${y}`);
        
        const { width, height } = this.ctx.canvas.getBoundingClientRect();
        
        const chartArea = new Path2D();
        // width exclude default vertical axes area width
        // height exclude default horizontal axes area height
        chartArea.rect(
            x, 
            y, 
            width - defaultSizes.verticalAxisWidth, 
            height - defaultSizes.horizontalAxisHeight
        );
        this.ctx.fillStyle = this.options.backgroundColor;
        this.ctx.fill(chartArea);
    }

    renderVerticalAxes () {
        const { width, height } = this.ctx.canvas.getBoundingClientRect();
        // calculate panel sizes
        // it all depends on canvas and default sizes
        const panelWidth = defaultSizes.verticalAxisWidth;
        const panelHeight = height;
        const basePointX = width - panelWidth;
        const basePointY = 0

        const vertAxesArea = new Path2D();
        vertAxesArea.rect(
            basePointX,
            basePointY,
            panelWidth,
            panelHeight
        );
        this.ctx.fillStyle = this.options.backgroundColor;
        this.ctx.fill(vertAxesArea);
        this.ctx.save();

        // add vertical line as axes
        this.ctx.beginPath();
        this.ctx.moveTo(basePointX, basePointY);
        this.ctx.lineTo(basePointX, panelHeight);
        this.ctx.strokeStyle = this.options.color;
        this.ctx.stroke();
        this.ctx.save();
    }

    renderHorizontalAxes (x: number, y: number) {
        const { width, height } = this.ctx.canvas.getBoundingClientRect();
        // calculate panel sizes
        // it all depends on canvas and default sizes
        // also base points x and y depends of moving
        const panelWidth = width - defaultSizes.verticalAxisWidth;
        const panelHeight = defaultSizes.horizontalAxisHeight;
        const basePointX = x;
        const basePointY = y;

        const horizAxesArea = new Path2D();
        horizAxesArea.rect(
            basePointX,
            basePointY,
            panelWidth,
            panelHeight
        )
        this.ctx.fillStyle = this.options.backgroundColor;
        this.ctx.fill(horizAxesArea);
        this.ctx.save();

        // add horizontal line as axes
        this.ctx.beginPath();
        this.ctx.moveTo(basePointX, basePointY);
        this.ctx.lineTo(panelWidth, basePointY);
        this.ctx.strokeStyle = this.options.color;
        this.ctx.stroke();
        this.ctx.save();
    }

}

export default Shape