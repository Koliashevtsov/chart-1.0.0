import { Data, Options, Point, Color, GridOpt, Offset } from '../types';
import { 
    defaultChartOptions as defOptions, 
    defaultSizes,
    basePoint,
    defaultGridOpt 
} from '../common/';

import { ChartArea, LabelsArea, ValuesArea } from '../areas';
import { absValues } from '../helpers';

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
        this.chartArea = new ChartArea(this.ctx, this.data, this.options);
        this.labelsArea = new LabelsArea(this.ctx, this.data, this.options);
        this.valuesArea = new ValuesArea(this.ctx, this.data, this.options);
    } 

    private _getOptions(options?: Options): Options {
        const opts = Boolean(options) ? Object.assign(defOptions, options) : defOptions;
        return opts;
    }

    private _getGridOpt(height: number, width: number){   
        const absoluteValues = absValues(this.data, defaultGridOpt.yScale);
        const absOffsetY = absoluteValues[absoluteValues.length - 1];
        const absValueInOnePixel = height / (absoluteValues[0] - absOffsetY); 
        const horizontalLinesCount = absoluteValues.length;
        const horizontalStep = height / (horizontalLinesCount - 1);
        const verticalLinesCount = this.data.labels.length;
        const verticalStep = width / (verticalLinesCount - 1);
        
        this.gridOpt =  {
            absoluteValues,
            absValueInOnePixel,
            absOffsetY,
            verticalLinesCount,
            horizontalLinesCount,
            verticalStep,
            horizontalStep
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
 
    renderChartArea (offset: Offset) {
        // width exclude default vertical axes area width
        // height exclude default horizontal axes area height
        const areaWidth = this.clientRect.width - defaultSizes.verticalAxisWidth;
        const areaHeight = this.clientRect.height - defaultSizes.horizontalAxisHeight;
        const pointX = this.basePoint.pointX + offset.distanceX;
        const pointY = this.basePoint.pointY + offset.distanceY;
        console.log('chartArea pointX', pointX);
        console.log('chartArea pointY', pointY);
        
        
        // compute grid sizes
        this._getGridOpt(areaHeight, areaWidth);
        // draw area
        this.chartArea.draw({
            basePoint: {pointX, pointY},
            width: areaWidth,
            height: areaHeight,
            gridOpt: this.gridOpt
        })
    }

    renderLabelsArea(offset: Offset){
        const areaWidth = this.clientRect.width - defaultSizes.verticalAxisWidth;
        const areaHeight = defaultSizes.horizontalAxisHeight;
        const pointX = this.basePoint.pointX + offset.distanceX;
        const pointY = this.clientRect.height - defaultSizes.horizontalAxisHeight + offset.distanceY;
        this.labelsArea.draw({
            basePoint: {pointX, pointY},
            width: areaWidth,
            height: areaHeight,
            gridOpt: this.gridOpt,
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
        })
    }
}

export default Shape