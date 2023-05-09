import { Data, Dataset, ExtendedDataset } from '../types';
export declare const equalizeDataToLabels: (data: Data) => {
    datasets: Dataset[] | ExtendedDataset[];
    labels: string[];
};
