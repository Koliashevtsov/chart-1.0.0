export const horizontalCouplesPoint = (leftPoint, rightPoint, step, count) => {
    // calculate points for drawing horizontal lines from grid
    const points = [];
    for (let i = 0; i < count; i++) {
        const point = {
            from: {
                pointX: leftPoint.pointX,
                pointY: leftPoint.pointY + step * i
            },
            to: {
                pointX: rightPoint.pointX,
                pointY: rightPoint.pointY + step * i
            }
        };
        points.push(point);
    }
    return points;
};
//# sourceMappingURL=horizontalCouplesPoint.js.map