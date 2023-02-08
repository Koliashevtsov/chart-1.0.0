import { valueTextBaseline } from '../../src/helpers';
import { Point } from '../../src/types';

describe('Value text baseline', () => {
    const points: Point[] = [
        {pointX: 800, pointY: 0}, {pointX: 800, pointY: 100}, {pointX: 800, pointY: 200}
    ]

    it('Should returt left align for first point in points', () => {
        expect(valueTextBaseline(points, 0)).toBe('top')
    })

    it('Should return right aling for last point in points', () => {
        expect(valueTextBaseline(points, points.length - 1)).toBe('bottom')
    })

    it('Should return center for all others points in points', () => {
        expect(valueTextBaseline(points, 1)).toBe('middle')
    })
})