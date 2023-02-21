"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointsForValues = void 0;
const pointsForValues = (basePoint, count, step) => {
    const points = [];
    for (let i = 0; i < count; i++) {
        const point = {
            pointX: basePoint.pointX,
            pointY: basePoint.pointY + (step * i)
        };
        points.push(point);
    }
    return points;
};
exports.pointsForValues = pointsForValues;
//# sourceMappingURL=points-for-values.js.map