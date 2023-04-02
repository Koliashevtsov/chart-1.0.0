import { resizedChartAreaWidth } from '../../../src/plugins/helpers';

describe('Calculate new chart area width', () => {
    it('Should return width bigger than clientArea width if offset minus', () => {
        const labelsStep = 100
        const clientWidth = 720
        const offsetX = -80

        const expected = {
            width: 800,
            labelsCount: 9
        }

        expect(resizedChartAreaWidth(labelsStep, clientWidth, offsetX)).toStrictEqual(expected)
    })

    it('Should return width bigger than clientArea width if offset zero', () => {
        const labelsStep = 100
        const clientWidth = 720
        const offsetX = 0

        const expected = {
            width: 800,
            labelsCount: 9
        }

        expect(resizedChartAreaWidth(labelsStep, clientWidth, offsetX)).toStrictEqual(expected)
    })

    it('Should return width bigger than clientArea width if offset equal minus labelsStep', () => {
        const labelsStep = 100
        const clientWidth = 720
        const offsetX = -100

        const expected = {
            width: 900,
            labelsCount: 10
        }

        expect(resizedChartAreaWidth(labelsStep, clientWidth, offsetX)).toStrictEqual(expected)
    })

    it('Should return width bigger than clientArea width if offset equal minus labelsStep plus 80', () => {
        const labelsStep = 100
        const clientWidth = 720
        const offsetX = -180

        const expected = {
            width: 900,
            labelsCount: 10
        }

        expect(resizedChartAreaWidth(labelsStep, clientWidth, offsetX)).toStrictEqual(expected)
    })
})
