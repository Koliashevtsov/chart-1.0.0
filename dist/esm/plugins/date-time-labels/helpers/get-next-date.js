import { dateTimeLabelsPluginStepDef } from '../../common/defaults';
export const getNextDate = (prevDate, template, count) => {
    switch (template) {
        case dateTimeLabelsPluginStepDef.MILISECONDS:
            return setNextMiliseconds(prevDate, count);
        case dateTimeLabelsPluginStepDef.SECONDS:
            return setNextSeconds(prevDate, count);
        case dateTimeLabelsPluginStepDef.MINUTES:
            return setNextMinutes(prevDate, count);
        case dateTimeLabelsPluginStepDef.HOURS:
            return setNextHours(prevDate, count);
        case dateTimeLabelsPluginStepDef.DAYS:
            return setNextDays(prevDate, count);
        case dateTimeLabelsPluginStepDef.WEEKS:
            return setNextWeeks(prevDate, count);
        case dateTimeLabelsPluginStepDef.MONTHS:
            return setNextMonths(prevDate, count);
        case dateTimeLabelsPluginStepDef.YEARS:
            return setNextYears(prevDate, count);
        default:
            return prevDate.toISOString();
    }
};
const setNextMiliseconds = (prevDate, count) => {
    const miliseconds = prevDate.getUTCMilliseconds();
    return new Date(prevDate.setUTCMilliseconds(miliseconds + count)).toISOString();
};
const setNextSeconds = (prevDate, count) => {
    const seconds = prevDate.getUTCSeconds();
    return new Date(prevDate.setUTCSeconds(seconds + count)).toISOString();
};
const setNextMinutes = (prevDate, count) => {
    const minutes = prevDate.getUTCMinutes();
    return new Date(prevDate.setUTCMinutes(minutes + count)).toISOString();
};
const setNextHours = (prevDate, count) => {
    const hours = prevDate.getUTCHours();
    return new Date(prevDate.setUTCHours(hours + count)).toISOString();
};
const setNextDays = (prevDate, count) => {
    const days = prevDate.getUTCDate();
    return new Date(prevDate.setUTCDate(days + count)).toISOString();
};
const setNextWeeks = (prevDate, count) => {
    const days = prevDate.getUTCDate();
    // increase days on 7 days by week
    const daysOnWeeks = count * 7;
    return new Date(prevDate.setUTCDate(days + daysOnWeeks)).toISOString();
};
const setNextMonths = (prevDate, count) => {
    const month = prevDate.getUTCMonth();
    return new Date(prevDate.setUTCMonth(month + count)).toISOString();
};
const setNextYears = (prevDate, count) => {
    const years = prevDate.getUTCFullYear();
    return new Date(prevDate.setUTCFullYear(years + count)).toISOString();
};
//# sourceMappingURL=get-next-date.js.map