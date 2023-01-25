import { Point } from '../types';

export const pointsForChart = (
    data: Array<string>, 
    basePoint: Point, 
    areaHeight: number,
    step: number, 
    scale: number,
    absOffsetY: number
    ) => {
        const points: Array<Point> = [];
        const pixelsFromAbsZero = areaHeight + (absOffsetY * scale);
        
        data.forEach((value, index) => {
            const point = {
                pointX: basePoint.pointX + step * index,
                pointY: pixelsFromAbsZero - Number(value) * scale
            }
            points.push(point)
        })
        return points;
}