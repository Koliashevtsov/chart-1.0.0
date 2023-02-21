"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash = __importStar(require("lodash"));
const common_1 = require("../common/");
const helpers_1 = require("../helpers");
class Config {
    _config;
    ctx;
    data;
    options;
    basePoint;
    clientRect;
    areasSizes;
    offset;
    areasPoints;
    gridOpt;
    cursorPoint;
    isCursorArea;
    tooltips;
    constructor({ ctx, data, inputOptions }) {
        this._config = this._initConfig({ ctx, data, inputOptions });
        this._unzipProps();
    }
    _initConfig({ ctx, data, inputOptions }) {
        const _ctx = ctx;
        const _data = data;
        const _options = this._getOptions(ctx, data, common_1.defaultChartOptions, inputOptions);
        const _basePoint = Object.freeze(common_1.basePoint);
        const _clientRect = _ctx.canvas.getBoundingClientRect();
        const _areasSizes = this._getAreasSizes(_clientRect, common_1.defaultSizes, _data, _options);
        const _offset = this._scrollToFinishOffset(_areasSizes, common_1.baseOffset);
        const _areasPoints = this._getAreasPoints(_basePoint, _offset, _clientRect, common_1.defaultSizes, _areasSizes);
        const _gridOpt = this._getGridOpt(_areasSizes.chart.height, _areasSizes.chart.width, data, common_1.defaultGridOpt);
        const _cursorPoint = common_1.baseCursorPoint;
        const _isCursorArea = false;
        const _tooltips = this._getTooltips(common_1.defaultSizes);
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
        };
    }
    _unzipProps() {
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
    update(updater) {
        this._config = { ...this._config, ...updater };
        this._unzipProps();
    }
    _getOptions(ctx, data, defOptions, options) {
        const backgroundColor = (0, helpers_1.backgroundColorFromCss)(ctx.canvas)
            ? (0, helpers_1.backgroundColorFromCss)(ctx.canvas)
            : defOptions.styles.chart.backgroundColor;
        const updater = {
            styles: {
                chart: {
                    backgroundColor: backgroundColor,
                    colors: (0, helpers_1.randomColors)(data.datasets.length)
                }
            }
        };
        const defOptionsWithColors = lodash.merge(defOptions, updater);
        const opts = options
            ? lodash.merge(defOptionsWithColors, options)
            : defOptionsWithColors;
        return opts;
    }
    _getAreasSizes(clientRect, defaultSizes, data, options) {
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
        if (!options.horizontalScrolling) {
            // chart area
            chartWidth = clientRect.width - defaultSizes.verticalAxisWidth;
            chartHeight = clientRect.height - defaultSizes.horizontalAxisHeight;
            // labels area
            labelsWidth = chartWidth;
        }
        else {
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
        };
    }
    _getAreasPoints(basePoint, offset, clientRect, defaultSizes, areasSizes) {
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
        };
    }
    _getGridOpt(height, width, data, defaultGridOpt) {
        const absoluteValues = (0, helpers_1.absValues)(data.datasets, defaultGridOpt.yScale);
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
        };
    }
    _getValueTab(width, height) {
        return {
            isOpen: false,
            title: '',
            width,
            height
        };
    }
    _getTooltips(def) {
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
        };
    }
    _scrollToFinishOffset(areasSizes, baseOffset) {
        const offset = {
            distanceX: areasSizes.white.width - areasSizes.chart.width,
            distanceY: baseOffset.distanceY
        };
        return offset;
    }
}
exports.default = Config;
//# sourceMappingURL=config.js.map