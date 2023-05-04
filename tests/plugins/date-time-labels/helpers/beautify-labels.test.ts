import { beautifyLabels } from '../../../../src/plugins/date-time-labels/helpers/beautify-labels';
import { dateTimeLabelsPluginStepDef } from '../../../../src/plugins/common/defaults';

describe('Transform labels DateISO format string to easy read format', () => {
    it('Should return miliseconds', () => {
        const rawLabels = [
            '2023-01-12T18:50:25.000Z',
            '2023-01-12T18:50:26.000Z',
            '2023-01-12T18:50:27.000Z',
            '2023-01-12T18:50:28.000Z',
            '2023-01-12T18:50:29.000Z',
            '2023-01-12T18:50:30.000Z'
        ]
        const expected = [
            '1673549425000',
            '1673549426000',
            '1673549427000',
            '1673549428000',
            '1673549429000',
            '1673549430000'
        ]

        expect(beautifyLabels(rawLabels, dateTimeLabelsPluginStepDef.MILISECONDS)).toEqual(expected)
    })

    it('Should return with seconds', () => {
        const rawLabels = [
            '2023-01-12T18:50:25.000Z',
            '2023-01-12T18:50:26.000Z',
            '2023-01-12T18:50:27.000Z',
            '2023-01-12T18:50:28.000Z',
            '2023-01-12T18:50:29.000Z',
            '2023-01-12T18:50:30.000Z'
        ]
        const expectedLocal = [
            '20:50:25',
            '20:50:26',
            '20:50:27',
            '20:50:28',
            '20:50:29',
            '20:50:30'
        ]
        expect(beautifyLabels(rawLabels, dateTimeLabelsPluginStepDef.SECONDS)).toEqual(expectedLocal)
    })

    it('Should return with minutes', () => {
        const rawLabels = [
            '2023-01-12T18:50:25.000Z',
            '2023-01-12T18:50:26.000Z',
            '2023-01-12T18:50:27.000Z',
            '2023-01-12T18:50:28.000Z',
            '2023-01-12T18:50:29.000Z',
            '2023-01-12T18:50:30.000Z'
        ]
        const expectedLocal = [
            '20:50',
            '20:50',
            '20:50',
            '20:50',
            '20:50',
            '20:50'
        ]
        expect(beautifyLabels(rawLabels, dateTimeLabelsPluginStepDef.MINUTES)).toEqual(expectedLocal)
    })

    it('Should return by hours template', () => {
        const rawLabels = [
            '2023-01-12T18:50:25.000Z',
            '2023-01-12T18:50:26.000Z',
            '2023-01-12T18:50:27.000Z',
            '2023-01-12T18:50:28.000Z',
            '2023-01-12T18:50:29.000Z',
            '2023-01-12T18:50:30.000Z'
        ]
        const expectedLocal = [
            '20:50',
            '20:50',
            '20:50',
            '20:50',
            '20:50',
            '20:50'
        ]
        expect(beautifyLabels(rawLabels, dateTimeLabelsPluginStepDef.HOURS)).toEqual(expectedLocal)
    })


    // days template 
    it('Should return by date template when month smaller than 10', () => {
        const rawLabels = [
            '2023-09-12T18:50:25.000Z',
            '2023-09-13T18:50:26.000Z',
            '2023-09-14T18:50:27.000Z',
            '2023-09-15T18:50:28.000Z',
            '2023-09-16T18:50:29.000Z',
            '2023-09-17T18:50:30.000Z'
        ]

        const expectedLocal = [
            '12/09',
            '13/09',
            '14/09',
            '15/09',
            '16/09',
            '17/09'
        ]
        expect(beautifyLabels(rawLabels, dateTimeLabelsPluginStepDef.DAYS)).toEqual(expectedLocal)
    })

    it('Should return by date template when month bigger or equal 10', () => {
        const rawLabels = [
            '2023-10-12T18:50:25.000Z',
            '2023-10-13T18:50:26.000Z',
            '2023-10-14T18:50:27.000Z',
            '2023-10-15T18:50:28.000Z',
            '2023-10-16T18:50:29.000Z',
            '2023-10-17T18:50:30.000Z'
        ]
        const expectedLocal = [
            '12/10',
            '13/10',
            '14/10',
            '15/10',
            '16/10',
            '17/10'
        ]
        expect(beautifyLabels(rawLabels, dateTimeLabelsPluginStepDef.DAYS)).toEqual(expectedLocal)
    })

    // weeks template
    it('Should return by weeks template', () => {
        const rawLabels = [
            '2023-10-12T18:50:25.000Z',
            '2023-10-13T18:50:26.000Z',
            '2023-10-14T18:50:27.000Z',
            '2023-10-15T18:50:28.000Z',
            '2023-10-16T18:50:29.000Z',
            '2023-10-17T18:50:30.000Z'
        ]
        const expectedLocal = [
            '12/10',
            '13/10',
            '14/10',
            '15/10',
            '16/10',
            '17/10'
        ]
        expect(beautifyLabels(rawLabels, dateTimeLabelsPluginStepDef.WEEKS)).toEqual(expectedLocal)
    })

    // month template
    it('Should return by month template', () => {
        const rawLabels = [
            '2023-07-12T18:50:25.000Z',
            '2023-08-13T18:50:26.000Z',
            '2023-09-14T18:50:27.000Z',
            '2023-10-15T18:50:28.000Z',
            '2023-11-16T18:50:29.000Z',
            '2023-12-17T18:50:30.000Z'
        ]
        const expectedLocal = [
            '07/2023',
            '08/2023',
            '09/2023',
            '10/2023',
            '11/2023',
            '12/2023'
        ]
        expect(beautifyLabels(rawLabels, dateTimeLabelsPluginStepDef.MONTHS)).toEqual(expectedLocal)
    })

    // year template
    it('Should return by year template', () => {
        const rawLabels = [
            '2023-07-12T18:50:25.000Z',
            '2024-08-13T18:50:26.000Z',
            '2025-09-14T18:50:27.000Z',
            '2026-10-15T18:50:28.000Z',
            '2027-11-16T18:50:29.000Z',
            '2028-12-17T18:50:30.000Z'
        ]
        const expectedLocal = [
            '2023',
            '2024',
            '2025',
            '2026',
            '2027',
            '2028'
        ]
        expect(beautifyLabels(rawLabels, dateTimeLabelsPluginStepDef.YEARS)).toEqual(expectedLocal)
    })
})