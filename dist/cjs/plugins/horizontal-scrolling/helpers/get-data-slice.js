"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataSlice = void 0;
const getDataSlice = (originalData, startIdx, finishIdx) => {
    const datasets = originalData.datasets.map((dataset) => {
        if ('color' in dataset) {
            return {
                ...dataset,
                data: dataset.data.slice(startIdx, finishIdx + 1)
            };
        }
        else {
            return {
                data: dataset.data.slice(startIdx, finishIdx + 1)
            };
        }
    });
    const labels = originalData.labels.slice(startIdx, finishIdx + 1);
    return {
        datasets,
        labels
    };
};
exports.getDataSlice = getDataSlice;
//# sourceMappingURL=get-data-slice.js.map