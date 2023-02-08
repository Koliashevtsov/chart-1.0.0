import { absValues } from '../../src/helpers';
import { Data } from '../../src/types';

describe('Absolute values ', () => {
    it('Should return array with absol values', () => {
        const data = {
            datasets: [
                {
                    data: ['3', '2', '3']
                },
                {
                    data: ['4', '5', '4']
                },
                {
                    data: ['4', '6']
                },
                {
                    data: ['0.4', '4', '3.3']
                }
            ],
            labels: [
                'Jan', 'Feb', 'Mar'
            ]
        }
        
        const resultData = [10, 0]

        expect(absValues(data.datasets, 10)).toEqual(resultData)
    })

    it('Should work with empty datasets', () => {
        const data: Data = {
            datasets: [],
            labels: [
                'Jan', 'Feb', 'Mar'
            ]
        }
        const result = [10, 0]
        expect(absValues(data.datasets, 10)).toEqual(result)
    })
})