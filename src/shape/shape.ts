import { Data, Options, Point, Color, Couples, GridOpt } from '../types';
import { 
    defaultChartOptions as defOptions, 
    defaultSizes,
    basePoint 
} from '../common/';

import { ChartArea, LabelsArea, ValuesArea } from '../areas';

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
    gridOpt: GridOpt;
    chartArea: ChartArea;
    labelsArea: LabelsArea;
    valuesArea: ValuesArea; 

    constructor({ context, data, options }: ShapeConstructor){
        this.ctx = context;
        this.data = data;
        this.options = this._getOptions(options);
        this.basePoint = Object.freeze(basePoint);
        this.clientRect = this.ctx.canvas.getBoundingClientRect();
        this.gridOpt = null;
        this.chartArea = new ChartArea(this.ctx, this.options);
        this.labelsArea = new LabelsArea(this.ctx, this.options);
        this.valuesArea = new ValuesArea(this.ctx, this.options);
    } 

    private _getOptions(options?: Options): Options {
        const opts = Boolean(options) ? Object.assign(defOptions, options) : defOptions;
        return opts;
    }

    private _getGrid(height: number, width: number){   
        const horizontalLinesCount = this.data.datasets.length > 0 ? this.data.datasets[0].data.length : 0; // if dataset contain data get first
        const verticalLinesCount = this.data.labels.length;

        const horizontalStep = height / (horizontalLinesCount - 1);
        const verticalStep = width / (verticalLinesCount - 1);

        this.gridOpt =  {
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
        // width exclude default vertical axes area width
        // height exclude default horizontal axes area height
        const areaWidth = this.clientRect.width - defaultSizes.verticalAxisWidth;
        const areaHeight = this.clientRect.height - defaultSizes.horizontalAxisHeight;
        // compute grid sizes
        this._getGrid(areaHeight, areaWidth);
        // draw area
        this.chartArea.draw({
            basePoint: this.basePoint,
            width: areaWidth,
            height: areaHeight,
            gridOpt: this.gridOpt
        })
    }

    renderLabelsArea(){
        const areaWidth = this.clientRect.width - defaultSizes.verticalAxisWidth;
        const areaHeight = defaultSizes.horizontalAxisHeight;
        const pointX = this.basePoint.pointX;
        const pointY = this.clientRect.height - defaultSizes.horizontalAxisHeight;
        this.labelsArea.draw({
            basePoint: {pointX, pointY},
            width: areaWidth,
            height: areaHeight,
            gridOpt: this.gridOpt,
            labels: this.data.labels
        })
    }

    renderValuesArea(){
        const areaWidth = defaultSizes.verticalAxisWidth;
        const areaHeight = this.clientRect.height;
        const pointX = this.clientRect.width - areaWidth;
        const pointY = this.basePoint.pointY;
        this.valuesArea.draw({
            basePoint: {pointX, pointY},
            width: areaWidth,
            height: areaHeight,
            gridOpt: this.gridOpt,
            datasets: this.data.datasets
        })
    }

    // renderVerticalAxes () {
    //     // calculate panel sizes
    //     // it all depends on canvas and default sizes
    //     const panelWidth = defaultSizes.verticalAxisWidth;
    //     const panelHeight = this.clientRect.height;
    //     const pointX = this.clientRect.width - panelWidth;
    //     const pointY = 0

    //     const vertAxesArea = new Path2D();
    //     vertAxesArea.rect(
    //         pointX,
    //         pointY,
    //         panelWidth,
    //         panelHeight
    //     );
    //     this.ctx.fillStyle = this.options.backgroundColor;
    //     this.ctx.fill(vertAxesArea);
    //     this.ctx.save();
    // }

    // renderHorizontalAxes () {
    //     // calculate panel sizes
    //     // it all depends on canvas and default sizes
    //     const panelWidth = this.clientRect.width - defaultSizes.verticalAxisWidth;
    //     const panelHeight = defaultSizes.horizontalAxisHeight;
    //     const pointX = this.basePoint.pointX;
    //     const pointY = this.clientRect.height - defaultSizes.horizontalAxisHeight;
    //     // draw area
    //     const horizAxesArea = new Path2D();
    //     horizAxesArea.rect(
    //         pointX,
    //         pointY,
    //         panelWidth,
    //         panelHeight
    //     )
    //     this.ctx.fillStyle = this.options.backgroundColor;
    //     this.ctx.fill(horizAxesArea);
    //     this.ctx.save();
    //     // drawing horizontal marks for labels
    //     // get couples of points
    //     const pointCouples = verticalCouplesPoint(
    //         {pointX: pointX, pointY: pointY},
    //         {pointX: pointX, pointY: pointY + 5},
    //         this.gridOpt.verticalStep,
    //         this.gridOpt.verticalLinesCount);
    //     // draw lines by points
    //     if(pointCouples.length > 0) {
    //         pointCouples.forEach((couple: Couples) => {
    //             this.ctx.beginPath();
    //             this.ctx.moveTo(couple.from.pointX, couple.from.pointY);
    //             this.ctx.lineTo(couple.to.pointX, couple.to.pointY);
    //             this.ctx.strokeStyle = 'green';
    //             this.ctx.stroke();
    //         })
    //     }
    //     // drawing labels

    // }

}

export default Shape