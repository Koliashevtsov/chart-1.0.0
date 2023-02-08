import { horizontalCouplesPoint } from '../../src/helpers';

describe('Generate couples of horizontal points for grid', () => {
    const width = 800;
    const height = 400;

    const leftPoint = {
        pointX: 0,
        pointY: 0
    };
    const rightPoint = {
        pointX: width,
        pointY: 0
    };
    const step = 100
    const count = 5

    it('Should return length of array couples that equal count', () => {
        const arr = horizontalCouplesPoint(leftPoint, rightPoint, step, count);
        expect(arr.length).toBe(count)
    })

    it('Should does not go beyond width and height', () => {
        const arr = horizontalCouplesPoint(leftPoint, rightPoint, step, count);
        const bottomRightPoint = {
            pointX: width,
            pointY: height
        }
        expect(arr[arr.length - 1].to).toEqual(bottomRightPoint);
    })
})