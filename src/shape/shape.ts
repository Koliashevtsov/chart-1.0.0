import { Data, Options, Point, Color } from '../types';
import { 
    defaultChartOptions as defOptions, 
    defaultSizes,
    basePoint 
} from '../common/';

type ShapeConstructor = {
    context: CanvasRenderingContext2D;
    data: Data;
    options: Options;
}

type Position = {
    baseViewportPoint: Point;
    baseChartAreaPoint: Point;
}

type ClientRectType = {
    x: number;
    y: number;
    width: number;
    height: number;
}

class Shape {
    ctx: CanvasRenderingContext2D;
    data: Data;
    options: Options;
    basePoint: Point;
    clientRect: ClientRectType;

    constructor({ context, data, options }: ShapeConstructor){
        this.ctx = context;
        this.data = data;
        this.options = this._getOptions(options);
        this.basePoint = Object.freeze(basePoint);
        this.clientRect = this.ctx.canvas.getBoundingClientRect();
    } 

    private _getOptions(options?: Options): Options {
        const opts = Boolean(options) ? Object.assign(defOptions, options) : defOptions;
        return opts;
    }

    private _getGrid(distX: number, distY: number){
        const xItems = 'each datasets must be equal'
        const yItems = ''
    }

    renderViewport () {
        this.ctx.fillStyle = Color.Grey;
        this.ctx.strokeRect(
            this.basePoint.pointX, 
            this.basePoint.pointY, 
            this.clientRect.width, 
            this.clientRect.height
        );
    }
 
    renderChartArea () {
        const chartArea = new Path2D();
        // width exclude default vertical axes area width
        // height exclude default horizontal axes area height
        const rectWidth = this.clientRect.width - defaultSizes.verticalAxisWidth;
        const rectHeight = this.clientRect.height - defaultSizes.horizontalAxisHeight;
        // draw rectangle
        chartArea.rect(
            this.basePoint.pointX, 
            this.basePoint.pointY, 
            rectWidth, 
            rectHeight
        );
        this.ctx.fillStyle = this.options.backgroundColor;
        this.ctx.fill(chartArea);
        // calculate grid
        this._getGrid(rectWidth, rectHeight);
    }

    renderVerticalAxes () {
        // calculate panel sizes
        // it all depends on canvas and default sizes
        const panelWidth = defaultSizes.verticalAxisWidth;
        const panelHeight = this.clientRect.height;
        const pointX = this.clientRect.width - panelWidth;
        const pointY = 0

        const vertAxesArea = new Path2D();
        vertAxesArea.rect(
            pointX,
            pointY,
            panelWidth,
            panelHeight
        );
        this.ctx.fillStyle = this.options.backgroundColor;
        this.ctx.fill(vertAxesArea);
        this.ctx.save();

        // add vertical line as axes
        this.ctx.beginPath();
        this.ctx.moveTo(pointX, pointY);
        this.ctx.lineTo(pointX, panelHeight - defaultSizes.horizontalAxisHeight);
        this.ctx.strokeStyle = this.options.color;
        this.ctx.stroke();
        this.ctx.save();
    }

    renderHorizontalAxes () {
        // calculate panel sizes
        // it all depends on canvas and default sizes
        const panelWidth = this.clientRect.width - defaultSizes.verticalAxisWidth;
        const panelHeight = defaultSizes.horizontalAxisHeight;
        const pointX = this.basePoint.pointX;
        const pointY = this.clientRect.height - defaultSizes.horizontalAxisHeight;

        const horizAxesArea = new Path2D();
        horizAxesArea.rect(
            pointX,
            pointY,
            panelWidth,
            panelHeight
        )
        this.ctx.fillStyle = this.options.backgroundColor;
        this.ctx.fill(horizAxesArea);
        this.ctx.save();

        // add horizontal line as axes
        this.ctx.beginPath();
        this.ctx.moveTo(pointX, pointY);
        this.ctx.lineTo(panelWidth, pointY);
        this.ctx.strokeStyle = this.options.color;
        this.ctx.stroke();
        this.ctx.save();
    }

}

export default Shape