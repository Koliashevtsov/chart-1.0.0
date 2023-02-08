import { labelTextAlign } from "../../src/helpers";
import { Point } from "../../src/types";

describe('Labels text align', () => {
    const points: Point[] = [
        {pointX: 0, pointY: 0}, {pointX: 0, pointY: 100}, {pointX: 0, pointY: 200}
    ]

    it('Should returt left align for first point in points', () => {
        expect(labelTextAlign(points, 0)).toBe('left')
    })

    it('Should return right aling for last point in points', () => {
        expect(labelTextAlign(points, points.length - 1)).toBe('right')
    })

    it('Should return center for all others points in points', () => {
        expect(labelTextAlign(points, 1)).toBe('center')
    })
})