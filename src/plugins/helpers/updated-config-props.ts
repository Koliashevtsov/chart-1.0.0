import * as lodash from 'lodash';

import { absValues } from '../../helpers';
import { defaultGridOpt } from '../../common';

import { Data, IConfig, Offset, TDefGridOpt } from '../../types';

export const getGridOpt = (height: number, width: number, data: Data, defaultGridOpt: TDefGridOpt) => {   
    const absoluteValues = absValues(data.datasets, defaultGridOpt.yScale);
    const absOffsetY = absoluteValues[absoluteValues.length - 1];
    const absValueInOnePixel = height / (absoluteValues[0] - absOffsetY); 
    const horizontalLinesCount = absoluteValues.length;
    const horizontalStep = height / (horizontalLinesCount - 1);
    const verticalLinesCount = data.labels.length;
    const verticalStep = width / (verticalLinesCount - 1);
    
    return {
        absoluteValues,
        absValueInOnePixel,
        absOffsetY,
        verticalLinesCount,
        horizontalLinesCount,
        verticalStep,
        horizontalStep
    }
}

export const updatedConfigProps = (originalConfig: IConfig, data: Data, offset: Offset, chartAreaWidth: number, chartAreaHeight: number) => {
    const gridOpt = getGridOpt(chartAreaHeight, chartAreaWidth, data, defaultGridOpt);

    const areasSizes = lodash.merge(originalConfig.areasSizes, {
        chart: {
            width: chartAreaWidth
        },
        labels: {
            width: chartAreaWidth
        }
    })

    const areasPoints = lodash.merge(originalConfig.areasPoints, {
        chart: {
            pointX: originalConfig.basePoint.pointX + offset.distanceX,
        },
        labels: {
            pointX: originalConfig.basePoint.pointX + offset.distanceX,
        }
    })
    
    return {
        data,
        areasSizes,
        offset,
        areasPoints,
        gridOpt
    }
}