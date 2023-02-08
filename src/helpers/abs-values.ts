import { Dataset } from '../types';

// return closest bigger number 
const closestMax = (value: number, divid: number) => {
    let absMax = Math.ceil(value);
    do {
        absMax += 1;
    } while (absMax % divid !== 0);
    return absMax;
}

// return closest smaller number 
const closestMin = (value: number, divid: number) => {
    let absMin = Math.ceil(value);
    do {
        absMin -= 1;
    } while (absMin % divid !== 0);

    return absMin;
}

export const absValues = (datasets: Dataset[], scale: number) => {

    if(datasets.length === 0){
        return [scale, 0]
    } 
    // collect all data from datasets to one Set
    const valuesSet: Set<string> = new Set();
        
    datasets.forEach(dataset  => {
        if(dataset){
            dataset.data.forEach((value: string) => valuesSet.add(value))
        }
    })
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