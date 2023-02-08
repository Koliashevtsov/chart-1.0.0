import { pointsForLabels } from '../../src/helpers';

describe('Generate points for drawing labels', () => {
    const basePoint = {
        pointX: 0,
        pointY: 0
    };
    
    it('Should return empty arr', () => {
        const count = 0;
        const step = 0;
        expect(pointsForLabels(basePoint, count, step)).toEqual([])
    })

    it('Should return one point like basePoint', () => {
        const count = 1;
        const step = 0;
        expect(pointsForLabels(basePoint, count, step)).toEqual([basePoint])
    })

    it('Should return 2 points', () => {
        const count = 2;
        const step = 200;
        const expected = [basePoint, {pointX: 200, pointY: 0}]
        expect(pointsForLabels(basePoint, count, step)).toEqual(expected)
    })
})