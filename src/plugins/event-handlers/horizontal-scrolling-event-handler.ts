import { getDataSlice, getIdxsSlice, resizedChartAreaWidth, updatedConfigProps } from '../helpers';

import { 
    CustomEventHandler, IConfig, InitHandlerProps, TController, 
    Point, APoints, Offset, HorScrolPlugOptions
} from '../../types';

const SCROLL_DIRECTION = {
    LEFT: 'left',
    RIGHT: 'right'
}

class HorizontalScrollingEventHandler implements CustomEventHandler {
    pluginOptions: HorScrolPlugOptions;
    controller: TController;
    config: IConfig;
    ctx: CanvasRenderingContext2D;
    cursorPoint: Point;
    drawing: boolean;
    offset: Offset;
    leftBoundary: number;
    rightBoundary: number;

    constructor(pluginOptions: HorScrolPlugOptions){
        this.pluginOptions = pluginOptions
        this.controller = null;
        this.config = null;
        this.ctx = null;
        this.cursorPoint = {pointX: 0, pointY: 0};
        this.offset = {distanceX: 0, distanceY: 0};
        this.drawing = false;
        this.leftBoundary = 0;  
    }

    initialize({ controller, config }: InitHandlerProps){
        this.controller = controller;
        this.config = config;
        this.ctx = config.ctx;
        this.offset = this.config.offset;
        this.rightBoundary = this.config.areasSizes.white.width - this.config.areasSizes.chart.width;
    }

    bindEvents(){
        this._addEventListeners()
    }

    unbindEvents(){
        this._removeEventListeners()
    }

    private _mouseDown(event: MouseEvent){
        // reset cursor point and start to draw
        this.cursorPoint.pointX = event.offsetX;
        this.cursorPoint.pointY = event.offsetY;
        this.drawing = true;
    }

    private _mouseUp(){
        this.drawing = false;
    }

    private _mouseMove(event: MouseEvent){
        if(this.drawing){
            // calculate diff cursor way between events, diff wont be equal and depends on speed move
            // diff can be positive or negative
            // update offset distance it is MAIN what _mouseMove doing
            const diffX = event.offsetX - this.cursorPoint.pointX;
            this._handleOffset(diffX)
            
            // update cursor point
            this.cursorPoint.pointX = event.offsetX;
            this.cursorPoint.pointY = event.offsetY;
        }
    }

    private _handleOffset(diffX: number){
        this._getOffset(diffX)
        this._updateConfig();
    }

    private _getOffset (diffX: number) {
        console.log(diffX);
        
        let offsetX = this.offset.distanceX + diffX;
        
        // if it is left range of labels and offset bigger set offset to 0
        if(this.pluginOptions.labelsOffset == 0 && offsetX > this.leftBoundary){
            console.log('stop!!!!!!!!!!! LEFT', offsetX, this.pluginOptions.labelsOffset);
            offsetX = this.leftBoundary
        }
        // if it is right range of labels and offset smaller set offset to right range
        if((this.pluginOptions.originalConfig.data.labels.length - 1) * this.pluginOptions.labelsStep -
            this.pluginOptions.labelsOffset - this.config.areasSizes.chart.width == 0 && 
            offsetX < this.rightBoundary){
                console.log('stop!!!!!!!!!!!!!!!!!!! RIGHT', offsetX, this.pluginOptions.labelsOffset);
            offsetX = this.rightBoundary
        }

        this.offset.distanceX = offsetX 
    }

    private _updateConfig () {
        const offsetX = this.offset.distanceX;
        
        if(offsetX > this.leftBoundary) {
            this._updateConfigNewLabels(SCROLL_DIRECTION.LEFT);
        } else if (offsetX < this.rightBoundary) {
            this._updateConfigNewLabels(SCROLL_DIRECTION.RIGHT);
        } else {
            console.log('offset before SMALL update', this.offset.distanceX);
            console.log('rightBoundary', this.rightBoundary);
            
            this._updateConfigSameLabels()
        }
    }

    private _resize(direction: string){
        // rewrite offset by hand because one grig step was offset
        if(direction === 'left'){
            console.log('resize direct LEFT', this.offset.distanceX);
            
            this.offset.distanceX = -this.pluginOptions.labelsStep;
            this.pluginOptions.labelsOffset -= this.pluginOptions.labelsStep;
        }
        if(direction === 'right'){
            console.log('resize direction RIGHT');
            
            this.offset.distanceX = this.offset.distanceX + this.pluginOptions.labelsStep;
            this.pluginOptions.labelsOffset += this.pluginOptions.labelsStep;
        }
        
        const { width, labelsCount } = resizedChartAreaWidth(
            this.pluginOptions.labelsStep, 
            this.config.areasSizes.white.width, 
            this.offset.distanceX
        )
        
        // rewrite right boundary
        this.rightBoundary = this.config.areasSizes.white.width - width;
        // calculate idxs
        const [ startIdx, finishIdx ] = getIdxsSlice(
            this.pluginOptions.originalConfig.data, 
            this.pluginOptions.labelsOffset, 
            labelsCount,
            this.pluginOptions.labelsStep
        )
        // rewrite data slice
        const data = getDataSlice(this.pluginOptions.originalConfig.data, startIdx, finishIdx)
            console.log('offset before BIG update', this.offset.distanceX);
            
        return updatedConfigProps(
            this.pluginOptions.originalConfig, 
            data, 
            this.offset, 
            width, 
            this.config.areasSizes.chart.height
        );
    }

    private _updateConfigNewLabels(direction: string){
        const updated = this._resize(direction)
        
        this.config.update(updated)

        this.controller.clear()
        this.controller.update(this.config)
    }

    private _updateConfigSameLabels(){
        const areasPoints = this.config.areasPoints;
        // overload areas points with offset
        const updatedPoints: APoints = {
            ...areasPoints,
            chart: {
                pointX: this.offset.distanceX,
                pointY: areasPoints.chart.pointY
            },
            labels: {
                pointX: this.offset.distanceX,
                pointY: areasPoints.labels.pointY
            }
        };
        this.config.update({ offset: this.offset, areasPoints: updatedPoints });
        
        this.controller.clear();
        this.controller.update(this.config);
    }

    private _mouseDownBinded = this._mouseDown.bind(this);
    private _mouseUpBinded = this._mouseUp.bind(this);
    private _mouseMoveBinded = this._mouseMove.bind(this);

    private _addEventListeners(){
        this.ctx.canvas.addEventListener('mousedown', this._mouseDownBinded);
        this.ctx.canvas.addEventListener('mouseup', this._mouseUpBinded);
        this.ctx.canvas.addEventListener('mousemove', this._mouseMoveBinded);
    }
    private _removeEventListeners(){
        this.ctx.canvas.removeEventListener('mousedown', this._mouseDownBinded);
        this.ctx.canvas.removeEventListener('mouseup', this._mouseUpBinded);
        this.ctx.canvas.removeEventListener('mousemove', this._mouseMoveBinded)
    }
}
export default HorizontalScrollingEventHandler