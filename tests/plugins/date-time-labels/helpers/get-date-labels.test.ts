import { getDateLabels } from '../../../../src/plugins/date-time-labels/helpers';

describe('Get array of date labels', () => {
    it('Should terurn array of labels by seconds', () => {
        const startDate = '2023-01-12T18:50:25.000Z';
        const finishDate = '2023-01-12T18:50:30.000Z';
        const step = '1sec';
        const labels = getDateLabels(new Date(startDate), new Date(finishDate), step);

        const expectedLocal = [
            '20:50:25',
            '20:50:26',
            '20:50:27',
            '20:50:28',
            '20:50:29',
            '20:50:30'
        ]

        expect(labels).toEqual(expectedLocal)
    })
})