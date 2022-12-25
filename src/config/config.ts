import { 
    defaultChartOptions as defOptions, 
    defaultSizes,
    basePoint,
    baseOffset,
    defaultGridOpt 
} from '../common/';

import { absValues } from '../helpers';

import { APoints, ASizes, ClientRectType, Data, GridOpt, InputOptions, Offset, Options, Point, TConfig } from '../types';

type ConfigProps = {
    ctx: CanvasRenderingContext2D;
    data: Data;
    inputOptions: InputOptions;
}

class Config implements TConfig{
    ctx: CanvasRenderingContext2D;
    data: Data;
    options: Options;
    basePoint: Point;
    clientRect: ClientRectType;
    areasSizes: ASizes;
    areasPoints: APoints;
    gridOpt: GridOpt;
    offset: Offset;

    constructor({ctx, data, inputOptions}: ConfigProps){
        this.ctx = ctx;
        this.data = data;
        this.options = this._getOptions(inputOptions);
        this.basePoint = Object.freeze(basePoint);
        this.clientRect = this.ctx.canvas.getBoundingClientRect();
        this.areasSizes = this._getAreasSizes();
        this.areasPoints = this._getAreasPoints();
        this.gridOpt = this._getGridOpt(this.areasSizes.chart.height, this.areasSizes.chart.width);
        this.offset = baseOffset;
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

    private _getAreasPoints(){
        return {
            chart: {
                pointX: this.basePoint.pointX + this.offset.distanceX,
                pointY: this.basePoint.pointY + this.offset.distanceY
            },
            labels: {
                pointX: this.basePoint.pointX + this.offset.distanceX,
                pointY: this.clientRect.height - defaultSizes.horizontalAxisHeight + this.offset.distanceY
            },
            values: {
                pointX: this.clientRect.width - this.areasSizes.values.width,
                pointY: this.basePoint.pointY
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
        
        return {
            absoluteValues,
            absValueInOnePixel,
            absOffsetY,
            verticalLinesCount,
            horizontalLinesCount,
            verticalStep,
            horizontalStep
        }
    }
}

export default Config;