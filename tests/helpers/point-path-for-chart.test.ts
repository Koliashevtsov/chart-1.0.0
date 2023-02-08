import { pointsPathForChart } from '../../src/helpers';

describe('Generate points paths', () => {
    const data = ['43', '51', '73']
    const basePoint = {pointX: 0, pointY: 0}
    const areaHeight = 400
    const step = 100
    const scale = 10
    const absOffsetY = 40

    it('Should have coordinates as expected', () => {
        const paths = pointsPathForChart(data, basePoint, areaHeight, step, scale, absOffsetY);
        const coordinates = [
            paths[0].coordinates,
            paths[1].coordinates,
            paths[2].coordinates
        ];
        const expectedCoordinates = [
            {pointX: 0, pointY: 370},
            {pointX: 100, pointY: 290},
            {pointX: 200, pointY: 70}
        ]
        expect(coordinates).toEqual(expectedCoordinates)
    })
})