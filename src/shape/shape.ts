import { Data, Options, InputOptions, Point, Color, GridOpt, Offset, ClientRectType, ASizes } from '../types';
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
    options: InputOptions;
}


class Shape {
    ctx: CanvasRenderingContext2D;
    data: Data;
    options: Options;
    basePoint: Point;
    clientRect: ClientRectType;
    gridOpt: GridOpt;
    areasSizes: ASizes;
    chartArea: ChartArea;
    labelsArea: LabelsArea;
    valuesArea: ValuesArea; 

    constructor({ context, data, options }: ShapeConstructor){
        this.ctx = context;
        this.data = data;
        this.options = this._getOptions(options);
        this.basePoint = Object.freeze(basePoint);
        this.clientRect = this.ctx.canvas.getBoundingClientRect();
        this.areasSizes = this._getAreasSizes();
        this.gridOpt = null;
        this.chartArea = new ChartArea(this.ctx, this.data, this.options);
        this.labelsArea = new LabelsArea(this.ctx, this.data, this.options);
        this.valuesArea = new ValuesArea(this.ctx, this.data, this.options);
    } 

    private _getOptions(options?: InputOptions): Options {
        const opts = Boolean(options) ? Object.assign(defOptions, options) : defOptions;
        return opts;
    }

    private _getAreasSizes() {
        let chartWidth;
        let chartHeight;
        let labelsWidth;
        let labelsHeight = defaultSizes.horizontalAxisHeight;
        let valuesWidth = defaultSizes.verticalAxisWidth;
        let valuesHeight = this.clientRect.height;

        if(!this.options.horizontalScrolling){
            // chart area
            chartWidth = this.clientRect.width - defaultSizes.verticalAxisWidth;
            chartHeight = this.clientRect.height - defaultSizes.horizontalAxisHeight;
            // labels area
            labelsWidth = chartWidth;
        } else {
            // chart area
            chartHeight = this.clientRect.height - defaultSizes.horizontalAxisHeight;
            chartWidth = this.options.horizontalScrolling.labelsStep * (this.data.labels.length - 1);
            // labels area
            labelsWidth = chartWidth;
        }

        return {
            chart: {
                width: chartWidth,
                height: chartHeight
            },
            labels: {
                width: labelsWidth,
                height: labelsHeight
            },
            values: {
                width: valuesWidth,
                height: valuesHeight
            }
        }
    }

    private _getGridOpt(height: number, width: number){   
        const absoluteValues = absValues(this.data, defaultGridOpt.yScale);
        const absOffsetY = absoluteValues[absoluteValues.length - 1];
        const absValueInOnePixel = height / (absoluteValues[0] - absOffsetY); 
        const horizontalLinesCount = absoluteValues.length;
        const horizontalStep = height / (horizontalLinesCount - 1);
        const verticalLinesCount = this.data.labels.length;
        const verticalStep = width / (verticalLinesCount - 1);
        console.log('step', verticalStep);
        
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
        const pointX = this.basePoint.pointX + offset.distanceX;
        const pointY = this.basePoint.pointY + offset.distanceY;
        const height = this.areasSizes.chart.height;
        const width = this.areasSizes.chart.width;
        
        // compute grid sizes
        this._getGridOpt(height, width);
        // draw area
        this.chartArea.draw({
            basePoint: {pointX, pointY},
            width: width,
            height: height,
            gridOpt: this.gridOpt
        })
    }

    renderLabelsArea(offset: Offset){
        const pointX = this.basePoint.pointX + offset.distanceX;
        const pointY = this.clientRect.height - defaultSizes.horizontalAxisHeight + offset.distanceY;
        const height = this.areasSizes.labels.height;
        const width = this.areasSizes.labels.width;

        this.labelsArea.draw({
            basePoint: {pointX, pointY},
            width: width,
            height: height,
            gridOpt: this.gridOpt,
        })
    }

    renderValuesArea(){
        const height = this.areasSizes.values.height;
        const width = this.areasSizes.values.width;
        const pointX = this.clientRect.width - width;
        const pointY = this.basePoint.pointY;
        this.valuesArea.draw({
            basePoint: {pointX, pointY},
            width: width,
            height: height,
            gridOpt: this.gridOpt,
        })
    }
}

export default Shape