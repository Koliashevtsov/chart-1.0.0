import { verticalCouplesPoint } from '../../src/helpers';

describe('Generate couples of vertical points for grid', () => {
    const width = 800;
    const height = 400;

    const topPoint = {
        pointX: 0,
        pointY: 0
    };
    const bottomPoint = {
        pointX: 0,
        pointY: height
    };
    const step = 100
    const count = 9

    it('Should return length of array couples that equal count', () => {
        const arr = verticalCouplesPoint(topPoint, bottomPoint, step, count);
        expect(arr.length).toBe(count)
    })

    it('Should does not go beyond width and height', () => {
        const arr = verticalCouplesPoint(topPoint, bottomPoint, step, count);
        const bottomRightPoint = {
            pointX: width,
            pointY: height
        }
        expect(arr[arr.length - 1].to).toEqual(bottomRightPoint);
    })
})