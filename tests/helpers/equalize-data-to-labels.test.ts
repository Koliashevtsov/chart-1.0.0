import { equalizeDataToLabels } from '../../src/helpers';

describe('Equalize count of data to labels count', () => {
    const labels = ['1', '2', '3', '4', '5', '6', 'seven', '8', '9', '10',
        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21',
        '22', '23', '24', '25', '26', '27'
    ];
    

    it('Should return as expected with Dataset', () => {
        const dataset = {
            data: ['1', '2']
        };
    
        const expectedDataset = {
            data: ['1', '2', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
        }

        const result = equalizeDataToLabels({
            datasets: [
                dataset
            ],
            labels: labels
        }).datasets[0]

        expect(result).toEqual(expectedDataset)
    })

    it('Should return as expected with ExtendedDataset', () => {
        const dataset = {
            data: ['1', '2'],
            color: '#a8329c', 
            name: 'USDT'
        };

        const expectedDataset = {
            data: ['1', '2', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            color: '#a8329c',
            name: 'USDT'
        }

        const result = equalizeDataToLabels({
            datasets: [
                dataset
            ],
            labels: labels
        }).datasets[0]

        expect(result).toEqual(expectedDataset)
    })

    it('Should return as expected with a few ExtendedDataset', () => {
        const dataset1 = {
            data: ['1', '2'],
            color: '#a8329c', 
            name: 'USDT'
        };
        const dataset2 = {
            data: ['1', '2'],
            color: '#a8329c', 
            name: 'BTC'
        }

        const expectedDataset = {
            data: ['1', '2', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            color: '#a8329c',
            name: 'USDT'
        }

        const result = equalizeDataToLabels({
            datasets: [
                dataset1,
                dataset2
            ],
            labels: labels
        }).datasets[0]

        expect(result).toEqual(expectedDataset)
    })
})