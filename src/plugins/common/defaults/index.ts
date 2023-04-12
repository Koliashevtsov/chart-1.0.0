export const dateTimeLabelsPluginStepDef = {
    ONE_SECOND: '1sec',
    ONE_MINUTE: '1min',
    ONE_HOUR: '1h',
    ONE_DAY: '1d',
    ONE_WEEK: '1w',
    ONE_MONTH: '1M',
    ONE_YEAR: '1Y'
} as const

export const dateTimeLabelsPluginPropsDef = {
    startDate: new Date(Date.now() - 5000), // five seconds before finish
    finishDate: new Date(),
    step: dateTimeLabelsPluginStepDef.ONE_SECOND
}