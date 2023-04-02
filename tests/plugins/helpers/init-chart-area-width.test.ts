import { initChartAreaWidth } from '../../../src/plugins/helpers';

describe('Calculate chartArea width', () => {
    it('Should return width bigger then clientArea width', () => {
        const labelsStep = 100
        const clientWidth = 720

        const expected = {
            width: 800,
            labelsCount: 9
        }

        expect(initChartAreaWidth(labelsStep, clientWidth)).toStrictEqual(expected)
    })

    it('Should return width equal to clientArea width', () => {
        const labelsStep = 100
        const clientWidth = 800

        const expected = {
            width: 800,
            labelsCount: 9
        }

        expect(initChartAreaWidth(labelsStep, clientWidth)).toStrictEqual(expected)
    })
})
