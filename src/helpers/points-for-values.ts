import { Point, GridOpt } from '../types';

export const pointsForValues = (basePoint: Point, gridOpt: GridOpt) => {
    const step = gridOpt.horizontalStep;
    const count = gridOpt.horizontalLinesCount;
    const points = []

    for(let i = 0; i < count; i++){
        const point = {
            pointX: basePoint.pointX,
            pointY: basePoint.pointY + (step * i)
        }
        points.push(point)
    }
    return points
}