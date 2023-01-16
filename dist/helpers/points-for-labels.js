export const pointsForLabels = (basePoint, gridOpt) => {
    const count = gridOpt.verticalLinesCount;
    const step = gridOpt.verticalStep;
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
//# sourceMappingURL=points-for-labels.js.map