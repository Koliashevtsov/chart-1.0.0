import { dateTimeLabelsPluginStepDef } from '../../common/defaults';

export const isValidTemplate = (template: string) => {
    const templates = Object.values(dateTimeLabelsPluginStepDef);
    return templates.find(t => t === template)
}