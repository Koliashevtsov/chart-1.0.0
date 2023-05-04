import { getIdxsSlice } from '../../../../src/plugins/horizontal-scrolling/helpers'

describe('Get first and last indexes of labels which should be rendered from right to left', () => {
    it('Should be equal', () => {
        const datasets = [
            {data: ['2', '3', '4', '4', '6', '7', '4', '5', '4', '3', '2', '5'], color: '#a8329c', name: 'USDT'}
        ]
        const labels = ['Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const data = {datasets, labels};

        const labelOffset = 400;
        const workLabelsCount = 12;
        const labelsStep = 100;

        const expected = [4, 11]
        expect(getIdxsSlice(data, labelOffset, workLabelsCount, labelsStep)).toStrictEqual(expected);
    })
})
