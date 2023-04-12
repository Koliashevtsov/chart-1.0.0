import { Data } from '../../../types';

export const getDataSlice = (originalData: Data, startIdx: number, finishIdx: number) => {
    
    const datasets = originalData.datasets.map((dataset) => {
        if('color' in dataset){
            return {
                ...dataset,
                data: dataset.data.slice(startIdx, finishIdx + 1)
            }
        } else {
            return {
                data: dataset.data.slice(startIdx, finishIdx + 1)
            }
        }
    });
    
    const labels = originalData.labels.slice(startIdx, finishIdx + 1)
    
    return {
        datasets,
        labels
    }
}