import { DefOptions, Color } from '../../types';

const defaultChartOptions: DefOptions = {
    backgroundColor: Color.Orange,
    color: 'blue'
}

const defaultSizes = {
    verticalAxisWidth: 80,
    horizontalAxisHeight: 40
}

const basePoint = {
    pointX: 0,
    pointY: 0
}

export {
    defaultChartOptions,
    defaultSizes,
    basePoint
}