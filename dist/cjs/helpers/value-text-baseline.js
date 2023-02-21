"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valueTextBaseline = void 0;
const valueTextBaseline = (points, index) => {
    if (index === 0) {
        return 'top';
    }
    else if (index === points.length - 1) {
        return 'bottom';
    }
    else {
        return 'middle';
    }
};
exports.valueTextBaseline = valueTextBaseline;
//# sourceMappingURL=value-text-baseline.js.map