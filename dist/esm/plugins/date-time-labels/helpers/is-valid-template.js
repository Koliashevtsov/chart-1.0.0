import { dateTimeLabelsPluginStepDef } from '../../common/defaults';
export const isValidTemplate = (template) => {
    const templates = Object.values(dateTimeLabelsPluginStepDef);
    return templates.find(t => t === template);
};
//# sourceMappingURL=is-valid-template.js.map