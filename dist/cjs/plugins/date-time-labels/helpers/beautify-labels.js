"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beautifyLabels = void 0;
const defaults_1 = require("../../common/defaults");
const beautifyLabels = (labels, template) => {
    switch (template) {
        case defaults_1.dateTimeLabelsPluginStepDef.MILISECONDS:
            return labels.map(milisecondsMapper);
        case defaults_1.dateTimeLabelsPluginStepDef.SECONDS:
            return labels.map(secondsMapper);
        case defaults_1.dateTimeLabelsPluginStepDef.MINUTES:
            return labels.map(minutesMapper);
        case defaults_1.dateTimeLabelsPluginStepDef.HOURS:
            return labels.map(hoursMapper);
        case defaults_1.dateTimeLabelsPluginStepDef.DAYS:
            return labels.map(datesMapper);
        case defaults_1.dateTimeLabelsPluginStepDef.WEEKS:
            return labels.map(weeksMapper);
        case defaults_1.dateTimeLabelsPluginStepDef.MONTHS:
            return labels.map(monthsMapper);
        case defaults_1.dateTimeLabelsPluginStepDef.YEARS:
            return labels.map(yearsMapper);
        default:
            return labels;
    }
};
exports.beautifyLabels = beautifyLabels;
const milisecondsMapper = (label) => {
    return String(new Date(label).getTime());
};
const secondsMapper = (label) => {
    const date = new Date(label);
    const hours = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    return `${hours}:${min}:${sec}`;
};
const minutesMapper = (label) => {
    const date = new Date(label);
    const hours = date.getHours();
    const min = date.getMinutes();
    return `${hours}:${min}`;
};
const hoursMapper = (label) => {
    const date = new Date(label);
    const hours = date.getHours();
    const min = date.getMinutes();
    return `${hours}:${min}`;
};
const datesMapper = (label) => {
    const d = new Date(label);
    const date = d.getDate();
    const month = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    return `${date}/${month}`;
};
const weeksMapper = (label) => {
    const d = new Date(label);
    const date = d.getDate();
    const month = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    return `${date}/${month}`;
};
const monthsMapper = (label) => {
    const d = new Date(label);
    const month = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    const year = d.getFullYear();
    return `${month}/${year}`;
};
const yearsMapper = (label) => {
    const d = new Date(label);
    const year = d.getFullYear();
    return `${year}`;
};
//# sourceMappingURL=beautify-labels.js.map