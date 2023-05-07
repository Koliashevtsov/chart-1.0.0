export const valueTextBaseline = (points, index) => {
    if (index === 0) {
        return 'top';
    }
    else if (index === points.length - 1) {
        return 'bottom';
    }
    else {
        return 'middle';
    }
};
//# sourceMappingURL=value-text-baseline.js.map