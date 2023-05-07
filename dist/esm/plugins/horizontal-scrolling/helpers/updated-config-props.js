import * as lodash from 'lodash';
import { absValues } from '../../../helpers';
import { defaultGridOpt } from '../../../common';
export const getGridOpt = (height, width, data, defaultGridOpt) => {
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
    };
};
export const updatedConfigProps = (originalConfig, data, offset, chartAreaWidth, chartAreaHeight) => {
    const gridOpt = getGridOpt(chartAreaHeight, chartAreaWidth, data, defaultGridOpt);
    const areasSizes = lodash.merge(originalConfig.areasSizes, {
        chart: {
            width: chartAreaWidth
        },
        labels: {
            width: chartAreaWidth
        }
    });
    const areasPoints = lodash.merge(originalConfig.areasPoints, {
        chart: {
            pointX: originalConfig.basePoint.pointX + offset.distanceX,
        },
        labels: {
            pointX: originalConfig.basePoint.pointX + offset.distanceX,
        }
    });
    return {
        data,
        areasSizes,
        offset,
        areasPoints,
        gridOpt
    };
};
//# sourceMappingURL=updated-config-props.js.map