import { Data, Dataset, ExtendedDataset } from '../types';

export const equalizeDataToLabels = (data: Data) => {
    // check if labels count equal to each datasets data count, if no then equalize
    const { datasets, labels } = data;
    const validatedDatasets: Dataset[] | ExtendedDataset[] = datasets.map(dataset => {
        if(dataset.data.length === labels.length) return dataset

        if(dataset.data.length < labels.length){
            const count = labels.length - dataset.data.length;
            // push empty string count times
            for(let i = 0; i < count; i++){
                dataset.data.push('')
            }
            return dataset
        }

        if(dataset.data.length > labels.length){
            const data: string[] = dataset.data.slice(0, labels.length)
            return {
                ...dataset,
                data
            }
        }
    })

    return {
        datasets: validatedDatasets,
        labels
    }
}