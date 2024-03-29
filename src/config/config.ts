import * as lodash from 'lodash';

import { 
    defaultChartOptions as defOptions, 
    defaultSizes,
    basePoint,
    defaultGridOpt,
    baseOffset,
    baseCursorPoint
} from '../common/';

import { absValues, backgroundColorFromCss, randomColors } from '../helpers';

import { 
    APoints, 
    ASizes, 
    ClientRectType, 
    Data, 
    GridOpt, 
    InputOptions, 
    Offset, 
    Options, 
    Point, 
    TConfig, 
    ConfigProps, 
    TDefSizes,
    PanConfUpd,
    HoverConfUpd,
    TDefGridOpt,
    TTooltips,
    DefOptions
} from '../types';



class Config implements TConfig{
    _config
    ctx: CanvasRenderingContext2D;
    data: Data;
    options: Options;
    basePoint: Point;
    clientRect: ClientRectType;
    areasSizes: ASizes;
    offset: Offset;
    areasPoints: APoints;
    gridOpt: GridOpt;
    cursorPoint: Point;
    isCursorArea: boolean;
    tooltips: TTooltips;

    constructor({ctx, data, inputOptions}: ConfigProps){
        this._config = this._initConfig({ctx, data, inputOptions});
        this._unzipProps();
    }

    private _initConfig({ctx, data, inputOptions}: ConfigProps){
        const _ctx = ctx;
        const _data = data;
        const _options = this._getOptions(ctx, data, defOptions, inputOptions);
        const _basePoint = Object.freeze(basePoint);
        const _clientRect = _ctx.canvas.getBoundingClientRect();
        const _areasSizes = this._getAreasSizes(_clientRect, defaultSizes, _data, _options);
        const _offset = this._scrollToFinishOffset(_areasSizes, baseOffset);
        const _areasPoints = this._getAreasPoints(_basePoint, _offset, _clientRect, defaultSizes, _areasSizes);
        const _gridOpt = this._getGridOpt(_areasSizes.chart.height, _areasSizes.chart.width, data, defaultGridOpt);
        const _cursorPoint = baseCursorPoint;
        const _isCursorArea = false;
        const _tooltips = this._getTooltips(defaultSizes);

        return {
            ctx: _ctx,
            data: _data,
            options: _options,
            basePoint: _basePoint,
            clientRect: _clientRect,
            areasSizes: _areasSizes,
            offset: _offset,
            areasPoints: _areasPoints,
            gridOpt: _gridOpt,
            cursorPoint: _cursorPoint,
            isCursorArea: _isCursorArea,
            tooltips: _tooltips
        }
    }

    private _unzipProps(){
        this.ctx = this._config.ctx;
        this.data = this._config.data;
        this.options = this._config.options;
        this.basePoint = this._config.basePoint;
        this.clientRect = this._config.clientRect;
        this.areasSizes = this._config.areasSizes;
        this.offset = this._config.offset;
        this.areasPoints = this._config.areasPoints;
        this.gridOpt = this._config.gridOpt;
        this.cursorPoint = this._config.cursorPoint;
        this.isCursorArea = this._config.isCursorArea;
        this.tooltips = this._config.tooltips;
    }

    update(updater: PanConfUpd | HoverConfUpd){
        this._config = { ...this._config, ...updater };
        this._unzipProps();
    }

    private _getOptions(ctx: CanvasRenderingContext2D, data: Data, defOptions: DefOptions, options?: InputOptions): Options {
        const backgroundColor = backgroundColorFromCss(ctx.canvas) 
            ? backgroundColorFromCss(ctx.canvas) 
            : defOptions.styles.chart.backgroundColor;

        const updater = {
            styles: {
                chart: {
                    backgroundColor:  backgroundColor,
                    colors: randomColors(data.datasets.length)
                }
            }
        };

        const defOptionsWithColors = lodash.merge(defOptions, updater);
        
          const opts = options
            ? lodash.merge(defOptionsWithColors, options)
            : defOptionsWithColors;
        return opts;
    }

    private _getAreasSizes(clientRect: DOMRect, defaultSizes: TDefSizes, data: Data, options: Options) {
        let chartWidth;
        let chartHeight;
        let labelsWidth;
        const labelsHeight = defaultSizes.horizontalAxisHeight;
        const valuesWidth = defaultSizes.verticalAxisWidth;
        const valuesHeight = clientRect.height;
        const whiteWidth = clientRect.width - defaultSizes.verticalAxisWidth;
        const whiteHeight = clientRect.height - defaultSizes.horizontalAxisHeight;
        const cursorAreaWidth = whiteWidth;
        const cursorAreaHeight = whiteHeight;

        if(!options.horizontalScrolling){
            // chart area
            chartWidth = clientRect.width - defaultSizes.verticalAxisWidth;
            chartHeight = clientRect.height - defaultSizes.horizontalAxisHeight;
            // labels area
            labelsWidth = chartWidth;
        } else {
            // chart area
            chartHeight = clientRect.height - defaultSizes.horizontalAxisHeight;
            chartWidth = options.horizontalScrolling.labelsStep * (data.labels.length - 1);
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
            },
            white: {
                width: whiteWidth,
                height: whiteHeight
            },
            cursor: {
                width: cursorAreaWidth,
                height: cursorAreaHeight
            }
        }
    }

    private _getAreasPoints(
        basePoint: Point, 
        offset: Offset, 
        clientRect: DOMRect, 
        defaultSizes: TDefSizes,
        areasSizes: ASizes
        ) {
        return {
            chart: {
                pointX: basePoint.pointX + offset.distanceX,
                pointY: basePoint.pointY + offset.distanceY
            },
            labels: {
                pointX: basePoint.pointX + offset.distanceX,
                pointY: clientRect.height - defaultSizes.horizontalAxisHeight + offset.distanceY
            },
            values: {
                pointX: clientRect.width - areasSizes.values.width,
                pointY: basePoint.pointY
            },
            white: {
                pointX: basePoint.pointX,
                pointY: basePoint.pointY
            },
            cursor: {
                pointX: basePoint.pointX,
                pointY: basePoint.pointY
            }
        }
    }

    private _getGridOpt(height: number, width: number, data: Data, defaultGridOpt: TDefGridOpt){   
        const absoluteValues = absValues(data.datasets, defaultGridOpt.yScale);
        const absOffsetY = absoluteValues[absoluteValues.length - 1];
        const absValueInOnePixel = height / (absoluteValues[0] - absOffsetY); 
        const horizontalLinesCount = absoluteValues.length;
        const horizontalStep = height / (horizontalLinesCount - 1);
        const verticalLinesCount = data.labels.length;
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

    private _getValueTab(width: number, height: number){
        return {
            isOpen: false,
            title: '',
            width,
            height
        }
    }
    private _getTooltips(def: TDefSizes): TTooltips{
        return {
            name: {
                title: null,
                width: def.nameTabWidth,
                height: def.nameTabHeight
            },
            value: {
                title: null,
                width: def.valueTabWidth,
                height: def.valueTabHeight
            },
            label: {
                title: null,
                width: def.labelTabWidth,
                height: def.labelTabHeight
            }
        }
    }

    private _scrollToFinishOffset(areasSizes: ASizes, baseOffset: Offset){
        const offset: Offset = {
            distanceX: areasSizes.white.width - areasSizes.chart.width,
            distanceY: baseOffset.distanceY
        }
        return offset;
    }
}

export default Config;