import { absValues } from '../../src/helpers';


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

describe('Absolute values ', () => {
    it('Should return array with absol values', () => {
        expect(absValues(data, 10)).toEqual(resultData)
    })
})