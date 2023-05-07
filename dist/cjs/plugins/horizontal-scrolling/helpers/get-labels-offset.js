"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLabelsOffset = void 0;
const getLabelsOffset = (allLabels, labelsStep, chartAreaWidth) => {
    const spaceAllLabels = (allLabels.length - 1) * labelsStep;
    const labelsOffsetPx = spaceAllLabels - chartAreaWidth;
    return labelsOffsetPx;
};
exports.getLabelsOffset = getLabelsOffset;
//# sourceMappingURL=get-labels-offset.js.map