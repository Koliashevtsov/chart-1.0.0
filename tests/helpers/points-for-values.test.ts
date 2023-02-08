import { pointsForValues } from '../../src/helpers';

describe('Generate points for drawing values', () => {
    const basePoint = {
        pointX: 0,
        pointY: 0
    }

    it('Should return empty arr', () => {
        const count = 0;
        const step = 0;
        expect(pointsForValues(basePoint, count, step)).toEqual([])
    })

    it('Should return one point like basePoint', () => {
        const count = 1;
        const step = 0;
        expect(pointsForValues(basePoint, count, step)).toEqual([basePoint])
    })

    it('Should return 2 points', () => {
        const count = 2;
        const step = 200;
        const expected = [basePoint, {pointX: 0, pointY: 200}]
        expect(pointsForValues(basePoint, count, step)).toEqual(expected)
    })
})