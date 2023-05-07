"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initChartAreaWidth = void 0;
const initChartAreaWidth = (labelsStep, clientWidth) => {
    // how many labels are visible and plus one can be partly invisible, so use Math.ceil
    const countSpaces = Math.ceil(clientWidth / labelsStep);
    let width = countSpaces * labelsStep;
    if (width < clientWidth) {
        width = clientWidth;
    }
    return {
        width: width,
        labelsCount: countSpaces + 1
    };
};
exports.initChartAreaWidth = initChartAreaWidth;
//# sourceMappingURL=init-chart-area-width.js.map