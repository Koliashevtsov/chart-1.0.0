"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextDate = void 0;
const defaults_1 = require("../../common/defaults");
const getNextDate = (prevDate, template, count) => {
    switch (template) {
        case defaults_1.dateTimeLabelsPluginStepDef.MILISECONDS:
            return setNextMiliseconds(prevDate, count);
        case defaults_1.dateTimeLabelsPluginStepDef.SECONDS:
            return setNextSeconds(prevDate, count);
        case defaults_1.dateTimeLabelsPluginStepDef.MINUTES:
            return setNextMinutes(prevDate, count);
        case defaults_1.dateTimeLabelsPluginStepDef.HOURS:
            return setNextHours(prevDate, count);
        case defaults_1.dateTimeLabelsPluginStepDef.DAYS:
            return setNextDays(prevDate, count);
        case defaults_1.dateTimeLabelsPluginStepDef.WEEKS:
            return setNextWeeks(prevDate, count);
        case defaults_1.dateTimeLabelsPluginStepDef.MONTHS:
            return setNextMonths(prevDate, count);
        case defaults_1.dateTimeLabelsPluginStepDef.YEARS:
            return setNextYears(prevDate, count);
        default:
            return prevDate.toISOString();
    }
};
exports.getNextDate = getNextDate;
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