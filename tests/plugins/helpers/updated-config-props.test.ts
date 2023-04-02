import * as lodash from 'lodash';

import { 
    updatedConfigProps, 
    getDataSlice, 
    getIdxsSlice, 
    initChartAreaWidth, 
    getLabelsOffset,
    getGridOpt } from '../../../src/plugins/helpers';

import Config from '../../../src/config';

import { defaultGridOpt } from '../../../src/common';


const canvas = document.createElement('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const datasets = [
    {data: ['2', '3', '4', '4', '6', '7', '4', '5', '4', '3', '2', '5'], color: '#a8329c', name: 'USDT'}
]
const labels = ['Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const dataForConfig = {datasets, labels};

const originalConfig = new Config({ctx, data: dataForConfig, inputOptions: {}})

describe('Get props which will be updated in config', () => {
    it('Should return object as expected, when plugin applied', () => {
        const labelsStep = 100;
        const clientWidth = 720;
        const { width, labelsCount } = initChartAreaWidth(labelsStep, clientWidth);
        
        const offsetX = clientWidth - width;
        const offset = {
            distanceX: offsetX,
            distanceY: originalConfig.offset.distanceY
        }

        const labelOffset = getLabelsOffset(originalConfig.data.labels, labelsStep, width) 

        const [startIdx, finishIdx] = getIdxsSlice(originalConfig.data, 400, 9, 100)
        const dataSliced = getDataSlice(originalConfig.data, startIdx, finishIdx)
        
        const updatedProps = updatedConfigProps(
            originalConfig, 
            dataSliced, 
            offset, 
            width, 
            originalConfig.areasSizes.chart.height
        )
            

        const areasSizes = lodash.merge(originalConfig.areasSizes, {
            chart: {
                width
            },
            labels: {
                width
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

        const gridOpt = getGridOpt(areasSizes.chart.height, areasSizes.chart.width, dataSliced, defaultGridOpt);

        const expected = {
            data: dataSliced,
            areasSizes,
            offset,
            areasPoints,
            gridOpt
        }

        // test 
        expect(updatedProps).toStrictEqual(expected)
    })
})
