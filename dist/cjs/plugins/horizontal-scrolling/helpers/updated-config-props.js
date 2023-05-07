"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedConfigProps = exports.getGridOpt = void 0;
const lodash = __importStar(require("lodash"));
const helpers_1 = require("../../../helpers");
const common_1 = require("../../../common");
const getGridOpt = (height, width, data, defaultGridOpt) => {
    const absoluteValues = (0, helpers_1.absValues)(data.datasets, defaultGridOpt.yScale);
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
exports.getGridOpt = getGridOpt;
const updatedConfigProps = (originalConfig, data, offset, chartAreaWidth, chartAreaHeight) => {
    const gridOpt = (0, exports.getGridOpt)(chartAreaHeight, chartAreaWidth, data, common_1.defaultGridOpt);
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
exports.updatedConfigProps = updatedConfigProps;
//# sourceMappingURL=updated-config-props.js.map