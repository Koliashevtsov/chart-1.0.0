import { Point } from '../types';

export const labelTextAlign = (points: Array<Point>, index: number) => {
    if(index === 0){
        return 'left'
    } else if (index === points.length -1) {
        return 'right'
    } else {
        return 'center'
    }
}