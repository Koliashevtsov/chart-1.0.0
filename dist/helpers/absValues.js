// return closest bigger number dividing on five
const closestMax = (value, divid) => {
    let absMax = value;
    while (absMax % divid !== 0) {
        absMax += 1;
    }
    return absMax;
};
// return closest smaller number dividing on five
const closestMin = (value, divid) => {
    let absMin = value;
    while (absMin % divid !== 0) {
        absMin -= 1;
    }
    return absMin;
};
export const absValues = (data, scale) => {
    // collect all data from datasets to one Set
    const valuesSet = new Set();
    data.datasets.forEach(dataset => dataset.data.forEach(value => valuesSet.add(value)));
    const values = Array.from(valuesSet).sort((a, b) => Number(a) - Number(b));
    // get min and max
    const minValue = values[0];
    const maxValue = values[values.length - 1];
    // correct max and min for chart value
    const absMax = closestMax(Number(maxValue), scale);
    const absMin = closestMin(Number(minValue), scale);
    // generate absValues
    const absVals = [absMin];
    while (absVals[absVals.length - 1] !== absMax) {
        absVals.push(absVals[absVals.length - 1] + scale);
    }
    return absVals.sort((a, b) => b - a);
};
//# sourceMappingURL=absValues.js.map