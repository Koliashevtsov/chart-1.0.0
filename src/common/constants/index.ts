import { DefOptions, Color } from '../../types';

const defaultChartOptions: DefOptions = {
    horizontalScrolling: false,
    styles: {
        chart: {
            backgroundColor: Color.White,
            color: 'blue',
            lineWidth: 1.2,
            colors: ['#176ba0', '#7d3a71', '#de542c']
        },
        grid: {
            color: Color.Grey,
            lineWidth: 0.2
        },
        labels: {
            color: Color.Grey,
            lineWidth: 0.2,
            font: '14px Arial'
        },
        values: {
            color: Color.Grey,
            lineWidth: 0.2,
            font: '14px Arial'
        },
        boundary: {
            color: Color.Grey,
            lineWidth: 0.2
        },
        cursor: {
            color: Color.Purple,
            lineWidth: 1
        }
    }
}

const defaultGridOpt = {
    yScale: 10 // how many values consist between two horizontal lines
}

const defaultSizes = {
    verticalAxisWidth: 80,
    horizontalAxisHeight: 40
}

const basePoint = {
    pointX: 0,
    pointY: 0
}
const baseOffset = {
    distanceX: 0,
    distanceY: 0
}
const baseCursorPoint = {
    pointX: 0,
    pointY: 0
}

export {
    defaultChartOptions,
    defaultSizes,
    defaultGridOpt,
    basePoint,
    baseOffset,
    baseCursorPoint
}