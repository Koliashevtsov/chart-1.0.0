import { Point, TPointPath } from '../types';

export const pointsPathForChart = (
    data: string[],
    labels: string[], 
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
                name: 'set in points-for',
                value: value,
                label: labels[index],
                coordinates: {
                    pointX: basePoint.pointX + step * index,
                    pointY: pixelsFromAbsZero - Number(value) * scale
                }
                
            }
            paths.push(path)
        })
        return paths;
}