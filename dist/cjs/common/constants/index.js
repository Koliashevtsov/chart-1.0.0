"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseCursorPoint = exports.baseOffset = exports.basePoint = exports.defaultGridOpt = exports.defaultSizes = exports.defaultChartOptions = void 0;
const types_1 = require("../../types");
const defaultChartOptions = {
    styles: {
        chart: {
            backgroundColor: types_1.Color.White,
            color: 'blue',
            lineWidth: 1.2,
            colors: ['#176ba0', '#7d3a71', '#de542c']
        },
        grid: {
            color: types_1.Color.Grey,
            lineWidth: 0.2
        },
        labels: {
            color: types_1.Color.Grey,
            lineWidth: 0.2,
            font: '14px Arial'
        },
        values: {
            color: types_1.Color.Grey,
            lineWidth: 0.2,
            font: '14px Arial'
        },
        boundary: {
            color: types_1.Color.Grey,
            lineWidth: 0.2
        },
        cursor: {
            backgroundColor: types_1.Color.Blue,
            color: types_1.Color.Purple,
            lineWidth: 1,
            font: '14px Arial'
        }
    }
};
exports.defaultChartOptions = defaultChartOptions;
const defaultGridOpt = {
    yScale: 10 // how many values consist between two horizontal lines
};
exports.defaultGridOpt = defaultGridOpt;
const defaultSizes = {
    verticalAxisWidth: 80,
    horizontalAxisHeight: 40,
    nameTabWidth: 120,
    nameTabHeight: 25,
    valueTabWidth: 80,
    valueTabHeight: 25,
    labelTabWidth: 80,
    labelTabHeight: 25
};
exports.defaultSizes = defaultSizes;
const basePoint = {
    pointX: 0,
    pointY: 0
};
exports.basePoint = basePoint;
const baseOffset = {
    distanceX: 0,
    distanceY: 0
};
exports.baseOffset = baseOffset;
const baseCursorPoint = {
    pointX: 0,
    pointY: 0
};
exports.baseCursorPoint = baseCursorPoint;
//# sourceMappingURL=index.js.map