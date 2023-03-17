export const getSliceIdxs = (allLabels: string[], visibleAreaWidth: number, spaceBetweenLabels: number) => {
    // how many labels are visible and plus one should be partly or full invisible, so use Math.floor + 1 + 1
    const count = Math.floor(visibleAreaWidth / spaceBetweenLabels) + 1 + 1;
    const finishIdx = allLabels.length - 1;
    const startIdx = finishIdx - count + 1;

    return [startIdx, finishIdx]
}