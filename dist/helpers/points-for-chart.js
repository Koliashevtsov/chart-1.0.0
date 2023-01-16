export const pointsForChart = (data, basePoint, areaHeight, step, scale, absOffsetY) => {
    const points = [];
    const pixelsFromAbsZero = areaHeight + (absOffsetY * scale);
    data.forEach((value, index) => {
        const point = {
            pointX: basePoint.pointX + step * index,
            pointY: pixelsFromAbsZero - Number(value) * scale
        };
        points.push(point);
    });
    return points;
};
//# sourceMappingURL=points-for-chart.js.map