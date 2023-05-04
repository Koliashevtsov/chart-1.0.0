import { getDataSlice } from '../../../../src/plugins/horizontal-scrolling/helpers';

describe('Get data slice by range indexes of all data', () => {
    it('Should return as expected', () => {
        const datasets = [
            {data: ['2', '3', '4', '4', '6', '7', '4', '5', '4', '3', '2', '5'], color: '#a8329c', name: 'USDT'}
        ]
        const labels = ['Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        const data = {datasets, labels};
        const startIdx = 4;
        const finishIdx = 11;

        const expectedData = {
            datasets: [
                {data: ['6', '7', '4', '5', '4', '3', '2', '5'], color: '#a8329c', name: 'USDT'}
            ],
            labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }

        expect(getDataSlice(data, startIdx, finishIdx)).toStrictEqual(expectedData);
    })
})