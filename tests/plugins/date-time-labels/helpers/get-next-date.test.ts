import { getNextDate } from '../../../../src/plugins/date-time-labels/helpers';
import { dateTimeLabelsPluginStepDef } from '../../../../src/plugins/common/defaults'

describe('Get next date', () => {
    // miliseconds
    it('Should return expected date after added one milisecond', () => {
        const date = new Date('2023-01-12T18:50:28.999Z')
        const nextDate = getNextDate(date, dateTimeLabelsPluginStepDef.MILISECONDS, 1)
        const expected = '2023-01-12T18:50:29.000Z'
        expect(nextDate).toEqual(expected)
    })

    it('Should return expected date after added 1000 milisecond', () => {
        const date = new Date('2023-01-12T18:50:28.000Z')
        const nextDate = getNextDate(date, dateTimeLabelsPluginStepDef.MILISECONDS, 1000)
        const expected = '2023-01-12T18:50:29.000Z'
        expect(nextDate).toEqual(expected)
    })

    // seconds
    it('Should return expected date after added 1 second', () => {
        const date = new Date('2023-01-12T18:50:28.000Z')
        const nextDate = getNextDate(date, dateTimeLabelsPluginStepDef.SECONDS, 1)
        const expected = '2023-01-12T18:50:29.000Z'
        expect(nextDate).toEqual(expected)
    })

    it('Should return expected date after added 61 seconds', () => {
        const date = new Date('2023-01-12T18:50:28.000Z')
        const nextDate = getNextDate(date, dateTimeLabelsPluginStepDef.SECONDS, 61)
        const expected = '2023-01-12T18:51:29.000Z'
        expect(nextDate).toEqual(expected)
    })

    // minutes
    it('Should return expected date after added 61 minutes', () => {
        const date = new Date('2023-01-12T18:50:28.000Z')
        const nextDate = getNextDate(date, dateTimeLabelsPluginStepDef.MINUTES, 61)
        const expected = '2023-01-12T19:51:28.000Z'
        expect(nextDate).toEqual(expected)
    })

    // hours
    it('Should return expected date after added 24 hours', () => {
        const date = new Date('2023-01-12T18:50:28.000Z')
        const nextDate = getNextDate(date, dateTimeLabelsPluginStepDef.HOURS, 24)
        const expected = '2023-01-13T18:50:28.000Z'
        expect(nextDate).toEqual(expected)
    })

    // days
    it('Should return expected date after added 1 day', () => {
        const date = new Date('2023-01-31T18:50:28.000Z')
        const nextDate = getNextDate(date, dateTimeLabelsPluginStepDef.DAYS, 1)
        const expected = '2023-02-01T18:50:28.000Z'
        expect(nextDate).toEqual(expected)
    })

    // weeks
    it('Should return expected date after added 1 week', () => {
        const date = new Date('2023-04-23T18:50:28.000Z')
        const nextDate = getNextDate(date, dateTimeLabelsPluginStepDef.WEEKS, 1)
        const expected = '2023-04-30T18:50:28.000Z'
        expect(nextDate).toEqual(expected)
    })
    it('Should return expected date after added 2 week', () => {
        const date = new Date('2023-04-23T18:50:28.000Z')
        const nextDate = getNextDate(date, dateTimeLabelsPluginStepDef.WEEKS, 2)
        const expected = '2023-05-07T18:50:28.000Z'
        expect(nextDate).toEqual(expected)
    })

    // months
    it('Should return expected date after added 1 month', () => {
        const date = new Date('2023-04-23T18:50:28.000Z')
        const nextDate = getNextDate(date, dateTimeLabelsPluginStepDef.MONTHS, 1)
        const expected = '2023-05-23T18:50:28.000Z'
        expect(nextDate).toEqual(expected)
    })
    it('Should return expected date after added 12 months', () => {
        const date = new Date('2023-04-23T18:50:28.000Z')
        const nextDate = getNextDate(date, dateTimeLabelsPluginStepDef.MONTHS, 12)
        const expected = '2024-04-23T18:50:28.000Z'
        expect(nextDate).toEqual(expected)
    })

    // years
    it('Should return expected date after added 1 year', () => {
        const date = new Date('2023-04-23T18:50:28.000Z')
        const nextDate = getNextDate(date, dateTimeLabelsPluginStepDef.YEARS, 1)
        const expected = '2024-04-23T18:50:28.000Z'
        expect(nextDate).toEqual(expected)
    })
})