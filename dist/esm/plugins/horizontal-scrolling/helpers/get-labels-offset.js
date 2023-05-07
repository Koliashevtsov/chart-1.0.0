export const getLabelsOffset = (allLabels, labelsStep, chartAreaWidth) => {
    const spaceAllLabels = (allLabels.length - 1) * labelsStep;
    const labelsOffsetPx = spaceAllLabels - chartAreaWidth;
    return labelsOffsetPx;
};
//# sourceMappingURL=get-labels-offset.js.map