"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.labelTextAlign = void 0;
const labelTextAlign = (points, index) => {
    if (index === 0) {
        return 'left';
    }
    else if (index === points.length - 1) {
        return 'right';
    }
    else {
        return 'center';
    }
};
exports.labelTextAlign = labelTextAlign;
//# sourceMappingURL=label-text-align.js.map