import { Data, IConfig, Offset, TDefGridOpt } from '../../../types';
export declare const getGridOpt: (height: number, width: number, data: Data, defaultGridOpt: TDefGridOpt) => {
    absoluteValues: number[];
    absValueInOnePixel: number;
    absOffsetY: number;
    verticalLinesCount: number;
    horizontalLinesCount: number;
    verticalStep: number;
    horizontalStep: number;
};
export declare const updatedConfigProps: (originalConfig: IConfig, data: Data, offset: Offset, chartAreaWidth: number, chartAreaHeight: number) => {
    data: Data;
    areasSizes: import("../../../types").ASizes & {
        chart: {
            width: number;
        };
        labels: {
            width: number;
        };
    };
    offset: Offset;
    areasPoints: import("../../../types").APoints & {
        chart: {
            pointX: number;
        };
        labels: {
            pointX: number;
        };
    };
    gridOpt: {
        absoluteValues: number[];
        absValueInOnePixel: number;
        absOffsetY: number;
        verticalLinesCount: number;
        horizontalLinesCount: number;
        verticalStep: number;
        horizontalStep: number;
    };
};
