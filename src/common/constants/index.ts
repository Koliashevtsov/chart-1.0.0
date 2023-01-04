import { DefOptions, Color } from '../../types';

const defaultChartOptions: DefOptions = {
    backgroundColor: Color.Orange,
    color: 'blue',
    horizontalScrolling: false
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