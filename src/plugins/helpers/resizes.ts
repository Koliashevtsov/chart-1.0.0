import * as lodash from 'lodash';

import { absValues } from '../../helpers';
import { defaultGridOpt } from '../../common';
import { getDataSlice } from './get-data-slice';

import { IConfig, TDefGridOpt, Data, Offset } from '../../types';

const getGridOpt = (height: number, width: number, data: Data, defaultGridOpt: TDefGridOpt) => {   
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

export const resizesConfigBase = (originalConfig: IConfig, startIdx: number, finishIdx: number, labelsStep: number) => {
    
    const { datasets, labels } = getDataSlice(originalConfig.data, startIdx, finishIdx);

    const areasSizes = lodash.merge(originalConfig.areasSizes, {
        chart: {
            width: labelsStep * (labels.length - 1)
        },
        labels: {
            width: labelsStep * (labels.length - 1)
        }
    })
    console.log('areaSize chart, labels', areasSizes.chart.width, areasSizes.labels.width);
    

    const offset = {
        distanceX: areasSizes.white.width - areasSizes.chart.width,
        distanceY: 0
    }

    const areasPoints = lodash.merge(originalConfig.areasPoints, {
        chart: {
            pointX: originalConfig.basePoint.pointX + offset.distanceX,
        },
        labels: {
            pointX: originalConfig.basePoint.pointX + offset.distanceX,
        }
    })
    console.log('areasPoints', areasPoints.chart.pointX);
    

    const data: Data = {
        datasets: datasets,
        labels: labels
    }

    const gridOpt = getGridOpt(areasSizes.chart.height, areasSizes.chart.width, data, defaultGridOpt)

    return {
        data,
        areasSizes,
        offset,
        areasPoints,
        gridOpt
    }
    
}

export const resizesConfigOffseting = (originalConfig: IConfig, newOffset: Offset,  startIdx: number, finishIdx: number, labelsStep: number) => {
    const baseProps = resizesConfigBase(originalConfig, startIdx, finishIdx, labelsStep)
    // and rewrite with newOffset
    const areasPoints = lodash.merge(originalConfig.areasPoints, {
        chart: {
            pointX: newOffset.distanceX,
        },
        labels: {
            pointX: newOffset.distanceX,
        }
    })

    return {
        ...baseProps,
        areasPoints,
        offset: newOffset
    }
}

