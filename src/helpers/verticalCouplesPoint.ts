import { Point, Couples } from '../types';

export const verticalCouplesPoint = (topPoint: Point, bottomPoint: Point, step: number, count: number): Array<Couples> | [] => {
    // calculate points for drawing vertical lines from grid
    const points: Array<Couples> = [];

    for(let i = 0; i < count; i++){
        const point: Couples = {
            from: { 
                pointX: topPoint.pointX + step * i,
                pointY: topPoint.pointY
            },
            to: {
                pointX: bottomPoint.pointX + step * i,
                pointY: bottomPoint.pointY
            }
        }
        points.push(point)
    }

    return points
}