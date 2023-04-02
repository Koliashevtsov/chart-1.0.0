import { getLabelsOffset } from '../../../src/plugins/helpers';

const labels = ['Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

describe('Get starting labels offset in pixels', () => {
    it('Should return expected number', () => {
        
        const labelsStep = 100
        const chartAreaWidth = 800
        const expected = 300
        expect(getLabelsOffset(labels, labelsStep, chartAreaWidth)).toEqual(expected)
    })
    it('Should return 0 because chartAreaWidth fill all labels', () => {
        const labelsStep = 100
        const chartAreaWidth = 1100
        const expected = 0
        expect(getLabelsOffset(labels, labelsStep, chartAreaWidth)).toEqual(expected)
    })
})