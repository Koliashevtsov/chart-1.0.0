import { Point } from '../types';

export const pointsForValues = (basePoint: Point, count: number, step: number) => {
    const points: Point[] = []

    for(let i = 0; i < count; i++){
        const point = {
            pointX: basePoint.pointX,
            pointY: basePoint.pointY + (step * i)
        }
        points.push(point)
    }
    return points
}