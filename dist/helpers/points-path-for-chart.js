// function above is similar to pointsForChart but return object with additional properties
export const pointsPathForChart = (data, basePoint, areaHeight, step, scale, absOffsetY) => {
    const paths = [];
    const pixelsFromAbsZero = areaHeight + (absOffsetY * scale);
    data.forEach((value, index) => {
        const path = {
            path: new Path2D(),
            value: value,
            coordinates: {
                pointX: basePoint.pointX + step * index,
                pointY: pixelsFromAbsZero - Number(value) * scale
            }
        };
        paths.push(path);
    });
    return paths;
};
//# sourceMappingURL=points-path-for-chart.js.map