import { Data } from '../../../types';
export declare const getDataSlice: (originalData: Data, startIdx: number, finishIdx: number) => {
    datasets: ({
        data: string[];
        color: string;
        name: string;
    } | {
        data: string[];
    })[];
    labels: string[];
};
