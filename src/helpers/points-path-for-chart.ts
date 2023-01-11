import { Point, TPointPath } from '../types';

// function above is similar to pointsForChart but return object with additional properties
export const pointsPathForChart = (
    data: Array<string>, 
    basePoint: Point, 
    areaHeight: number,
    step: number, 
    scale: number,
    absOffsetY: number
    ) => {
        const paths: Array<TPointPath> = [];
        const pixelsFromAbsZero = areaHeight + (absOffsetY * scale);
        
        data.forEach((value, index) => {
            const path: TPointPath = {
                path: new Path2D(),
                value: value,
                coordinates: {
                    pointX: basePoint.pointX + step * index,
                    pointY: pixelsFromAbsZero - Number(value) * scale
                }
                
            }
            paths.push(path)
        })
        return paths;
}