export const getLabelsOffset = (allLabels: string[], labelsStep: number, chartAreaWidth: number) => {
    const spaceAllLabels = (allLabels.length - 1) * labelsStep
    const labelsOffsetPx = spaceAllLabels - chartAreaWidth
    return labelsOffsetPx
}