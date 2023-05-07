export const pointsPathForChart = (name, data, labels, basePoint, areaHeight, step, scale, absOffsetY) => {
    const paths = [];
    const pixelsFromAbsZero = areaHeight + (absOffsetY * scale);
    data.forEach((value, index) => {
        const path = {
            path: new Path2D(),
            name,
            value: value,
            label: labels[index],
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