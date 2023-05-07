"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidTemplate = void 0;
const defaults_1 = require("../../common/defaults");
const isValidTemplate = (template) => {
    const templates = Object.values(defaults_1.dateTimeLabelsPluginStepDef);
    return templates.find(t => t === template);
};
exports.isValidTemplate = isValidTemplate;
//# sourceMappingURL=is-valid-template.js.map