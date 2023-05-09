export const resizedChartAreaWidth = (labelsStep, clientWidth, offsetX) => {
    let countSpaces = 0;
    if (offsetX > 0) {
        const countSpaces = Math.floor(clientWidth / labelsStep);
        const width = countSpaces * labelsStep;
        return {
            width,
            labelsCount: countSpaces
        };
    }
    while (offsetX + (countSpaces * labelsStep) < clientWidth) {
        countSpaces += 1;
    }
    return {
        width: countSpaces * labelsStep,
        labelsCount: countSpaces + 1
    };
};
//# sourceMappingURL=resized-chart-area-width.js.map