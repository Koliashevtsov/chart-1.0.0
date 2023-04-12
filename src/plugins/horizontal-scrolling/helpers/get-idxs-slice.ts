import { Data } from '../../../types';

export const getIdxsSlice = (
    originalData: Data, 
    labelsOffsetPxs: number, 
    workLabelsCount: number, 
    labelsStep: number ) => {
        if(labelsOffsetPxs <= 0){
            const startIdx = 0;
            let finishIdx = startIdx + workLabelsCount - 1;

            if(finishIdx > originalData.labels.length - 1){
                finishIdx = originalData.labels.length - 1
            }
            return [startIdx, finishIdx]
        } else {
            const startIdx = labelsOffsetPxs / labelsStep;
            let finishIdx = startIdx + workLabelsCount - 1;

            if(finishIdx > originalData.labels.length - 1){
                finishIdx = originalData.labels.length - 1
            }
            return [startIdx, finishIdx]
        }
}