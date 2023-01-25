import { Point, Couples } from '../types';

export const horizontalCouplesPoint = (leftPoint: Point, rightPoint: Point, step: number, count: number) => {
    // calculate points for drawing horizontal lines from grid
    const points: Array<Couples> = [];

    for(let i = 0; i < count; i++){
        const point: Couples = {
            from: { 
                pointX: leftPoint.pointX,
                pointY: leftPoint.pointY + step * i
            },
            to: {
                pointX: rightPoint.pointX,
                pointY: rightPoint.pointY  + step * i
            }
        }
        points.push(point)
    }

    return points
}