"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointsForLabels = void 0;
const pointsForLabels = (basePoint, count, step) => {
    const points = [];
    for (let i = 0; i < count; i++) {
        const point = {
            pointX: basePoint.pointX + (step * i),
            pointY: basePoint.pointY
        };
        points.push(point);
    }
    return points;
};
exports.pointsForLabels = pointsForLabels;
//# sourceMappingURL=points-for-labels.js.map