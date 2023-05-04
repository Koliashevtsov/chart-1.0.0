import { dateTimeLabelsPluginStepDef } from '../../common/defaults';

export const beautifyLabels = (labels: string[], template: string) => {
    switch(template){
        case dateTimeLabelsPluginStepDef.MILISECONDS:
            return labels.map(milisecondsMapper)
        case dateTimeLabelsPluginStepDef.SECONDS:
            return labels.map(secondsMapper)
        case dateTimeLabelsPluginStepDef.MINUTES:
            return labels.map(minutesMapper)
        case dateTimeLabelsPluginStepDef.HOURS:
            return labels.map(hoursMapper)
        case dateTimeLabelsPluginStepDef.DAYS:
            return labels.map(datesMapper)
        case dateTimeLabelsPluginStepDef.WEEKS:
            return labels.map(weeksMapper)
        case dateTimeLabelsPluginStepDef.MONTHS:
            return labels.map(monthsMapper)
        case dateTimeLabelsPluginStepDef.YEARS:
            return labels.map(yearsMapper)
        default:
            return labels
    }
}

const milisecondsMapper = (label: string) => {
    return String(new Date(label).getTime())
}

const secondsMapper = (label: string) => {
    const date = new Date(label);
    const hours = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    return `${hours}:${min}:${sec}`
}

const minutesMapper = (label: string) => {
    const date = new Date(label);
    const hours = date.getHours();
    const min = date.getMinutes();
    return `${hours}:${min}`
}

const hoursMapper = (label: string) => {
    const date = new Date(label);
    const hours = date.getHours();
    const min = date.getMinutes();
    return `${hours}:${min}`
}

const datesMapper = (label: string) => {
    const d = new Date(label);
    const date = d.getDate();
    const month = d.getMonth() < 9 ?  '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    return `${date}/${month}`
}

const weeksMapper = (label: string) => {
    const d = new Date(label);
    const date = d.getDate();
    const month = d.getMonth() < 9 ?  '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    return `${date}/${month}`
}

const monthsMapper = (label: string) => {
    const d = new Date(label);
    const month = d.getMonth() < 9 ?  '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    const year = d.getFullYear();
    return `${month}/${year}`
}

const yearsMapper = (label: string) => {
    const d = new Date(label);
    const year = d.getFullYear()
    return `${year}`
}