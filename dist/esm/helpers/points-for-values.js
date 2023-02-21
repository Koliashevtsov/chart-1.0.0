export const pointsForValues = (basePoint, count, step) => {
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
//# sourceMappingURL=points-for-values.js.map