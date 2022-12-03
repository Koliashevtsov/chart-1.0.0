import { Data, Options, Point, Color, Couples } from '../types';
import { 
    defaultChartOptions as defOptions, 
    defaultSizes,
    basePoint 
} from '../common/';

import { verticalCouplesPoint, horizontalCouplesPoint } from '../helpers';

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

type Grid = {
    verticalLinesCount: number;
    horizontalLinesCount: number;
    verticalStep: number;
    horizontalStep: number;
}

class Shape {
    ctx: CanvasRenderingContext2D;
    data: Data;
    options: Options;
    basePoint: Point;
    clientRect: ClientRectType;
    grid: Grid 

    constructor({ context, data, options }: ShapeConstructor){
        this.ctx = context;
        this.data = data;
        this.options = this._getOptions(options);
        this.basePoint = Object.freeze(basePoint);
        this.clientRect = this.ctx.canvas.getBoundingClientRect();
        this.grid = null
    } 

    private _getOptions(options?: Options): Options {
        const opts = Boolean(options) ? Object.assign(defOptions, options) : defOptions;
        return opts;
    }

    private _getGrid(verticalsDistanse: number, horizontalsDistanse: number){
        const horizontalLinesCount = this.data.datasets.length > 0 ? this.data.datasets[0].data.length : 0; // if dataset contain data get first
        const verticalLinesCount = this.data.labels.length;

        const horizontalStep = horizontalsDistanse / (horizontalLinesCount - 1);
        const verticalStep = verticalsDistanse / (verticalLinesCount - 1);

        this.grid =  {
            verticalLinesCount: verticalLinesCount,
            horizontalLinesCount: horizontalLinesCount,
            verticalStep: verticalStep,
            horizontalStep: horizontalStep
        }
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
        this.ctx.save();
        
        // calculate grid
        this._getGrid(rectWidth, rectHeight);
            console.log(this.grid);
            
        // draw grid
        // vertical lines
        const vertCouples = verticalCouplesPoint(
            this.basePoint, 
            {pointX: this.basePoint.pointX, pointY: rectHeight}, 
            this.grid.verticalStep,
            this.grid.verticalLinesCount
        )
        if(vertCouples.length > 0) {
            vertCouples.forEach((couple: Couples) => {
                this.ctx.beginPath();
                this.ctx.moveTo(couple.from.pointX, couple.from.pointY);
                this.ctx.lineTo(couple.to.pointX, couple.to.pointY);
                this.ctx.strokeStyle = 'green';
                this.ctx.stroke();
            })
        }
        // horizontal lines
        const horCouples = horizontalCouplesPoint(
            this.basePoint,
            {pointX: rectWidth, pointY: this.basePoint.pointY},
            this.grid.horizontalStep,
            this.grid.horizontalLinesCount
        );
        if(horCouples.length > 0) {
            horCouples.forEach((couple: Couples) => {
                this.ctx.beginPath();
                this.ctx.moveTo(couple.from.pointX, couple.from.pointY);
                this.ctx.lineTo(couple.to.pointX, couple.to.pointY);
                this.ctx.strokeStyle = 'green';
                this.ctx.stroke();
            })
        }
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
    }

    renderHorizontalAxes () {
        // calculate panel sizes
        // it all depends on canvas and default sizes
        const panelWidth = this.clientRect.width - defaultSizes.verticalAxisWidth;
        const panelHeight = defaultSizes.horizontalAxisHeight;
        const pointX = this.basePoint.pointX;
        const pointY = this.clientRect.height - defaultSizes.horizontalAxisHeight;
        // draw area
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
        // drawing horizontal marks for labels
        // get couples of points
        const pointCouples = verticalCouplesPoint(
            {pointX: pointX, pointY: pointY},
            {pointX: pointX, pointY: pointY + 5},
            this.grid.verticalStep,
            this.grid.verticalLinesCount);
        // draw lines by points
        if(pointCouples.length > 0) {
            pointCouples.forEach((couple: Couples) => {
                this.ctx.beginPath();
                this.ctx.moveTo(couple.from.pointX, couple.from.pointY);
                this.ctx.lineTo(couple.to.pointX, couple.to.pointY);
                this.ctx.strokeStyle = 'green';
                this.ctx.stroke();
            })
        }
        // drawing labels

    }

    private _drawLabels(){
        
    }

}

export default Shape