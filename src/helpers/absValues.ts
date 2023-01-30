import { Data } from '../types';

// return closest bigger number dividing on five
const closestMax = (value: number, divid: number) => {
    let absMax = Math.ceil(value);
    do {
        absMax += 1;
    } while (absMax % divid !== 0);
    return absMax;
}

// return closest smaller number dividing on five
const closestMin = (value: number, divid: number) => {
    let absMin = Math.ceil(value);
    do {
        absMin -= 1;
    } while (absMin % divid !== 0);
    return absMin;
}

export const absValues = (data: Data, scale: number) => {
    // collect all data from datasets to one Set
    const valuesSet: Set<string> = new Set();
    data.datasets.forEach(dataset  => dataset.data.forEach(value => valuesSet.add(value)))
    const values = Array.from(valuesSet).sort((a: string, b: string) => Number(a) - Number(b));
    // get min and max
    const minValue = values[0];
    const maxValue = values[values.length - 1];
    // correct max and min for chart value
    const absMax = closestMax(Number(maxValue), scale);
    const absMin = closestMin(Number(minValue), scale);
    // generate absValues
    const absVals = [absMin];
    while(absVals[absVals.length -1] !== absMax){
        absVals.push(absVals[absVals.length -1] + scale)
    }
    return absVals.sort((a, b) => b - a)
}