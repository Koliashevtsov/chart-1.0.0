import { Point } from '../types';

export const valueTextBaseline = (points: Array<Point>, index: number) => {
    if(index === 0){
        return 'top'
    } else if (index === points.length -1) {
        return 'bottom'
    } else {
        return 'middle'
    }
}