import { Point } from '../types';

export const pointsForLabels = (basePoint: Point, count: number, step: number) => {
    const points: Point[] = [];

    for(let i = 0; i < count; i++){
        const point = {
            pointX: basePoint.pointX + (step * i),
            pointY: basePoint.pointY
        }
        points.push(point)
    }
    return points
}