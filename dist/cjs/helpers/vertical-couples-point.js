"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verticalCouplesPoint = void 0;
const verticalCouplesPoint = (topPoint, bottomPoint, step, count) => {
    // calculate points for drawing vertical lines from grid
    const points = [];
    for (let i = 0; i < count; i++) {
        const point = {
            from: {
                pointX: topPoint.pointX + step * i,
                pointY: topPoint.pointY
            },
            to: {
                pointX: bottomPoint.pointX + step * i,
                pointY: bottomPoint.pointY
            }
        };
        points.push(point);
    }
    return points;
};
exports.verticalCouplesPoint = verticalCouplesPoint;
//# sourceMappingURL=vertical-couples-point.js.map