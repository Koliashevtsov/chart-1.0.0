import { 
    CustomEventHandler, IConfig, InitHandlerProps, TController, Point, APoints, Offset, HorScrolPlugOptions, HorScrolPlugUpd 
} from '../../types';
import { resizesConfigBase, resizesConfigOffseting } from '../helpers';

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
        this._updateConfid();

        // adjust offset if beyond range
        // if(offsetX > LEFT_PAN_RANGE){
        //     offsetX = LEFT_PAN_RANGE
        //     console.log('offset when LEFT_RANGE', this.offset.distanceX);
            
        //     this._watchLeftRange(offsetX)
        // } else if(offsetX < RIGHT_PAN_RANGE){
        //     offsetX = RIGHT_PAN_RANGE
        //     this.offset.distanceX = offsetX
        // } else {
        //     console.log('offsetX when no range', offsetX);
        //     this._updateConfigSameLabels(offsetX)
        // }
        
    }

    private _getOffset (diffX: number) {
        console.log('get_Offet this, ', this);
        
        let offsetX = this.offset.distanceX + diffX;
        // adjust offset if beyond range
        if(offsetX > this.leftBoundary) {
            offsetX = this.leftBoundary
        } 
        if (offsetX < this.rightBoundary) {
            console.log('hello');
            
            // offsetX = this.rightBoundary
        }
        this.offset.distanceX = offsetX 
    }

    private _updateConfid () {
        const offsetX = this.offset.distanceX;
        console.log('see offsetX in offset and in config', this.offset.distanceX, this.config.offset.distanceX);
        
        if(offsetX === this.leftBoundary) {
            // pan to left boundry
            this._scrollBeyondLeft()
        } else if (offsetX === this.rightBoundary) {
            // pan to right boundry
        } else {
            // pan to left or to right does not touch boundry
            this._updateConfigSameLabels()
        }
    }

    private _scrollBeyondLeft(){
        if(this.pluginOptions.startIdx === 0){
            this._updateConfigSameLabels();
        } else {
            this.offset.distanceX = -100 - 1
            this.pluginOptions.startIdx -= 1
            this.pluginOptions.finishIdx -= 1;
            this._updateConfigNewLabels();
        }
    }

    private _updateConfigNewLabels(){
        console.log('UPDATE_NEW_LABELS', this.config.offset.distanceX);
        
        const { originalConfig, startIdx, finishIdx, labelsStep } = this.pluginOptions;
        const updatedConfigProps = resizesConfigOffseting(originalConfig, this.offset, startIdx, finishIdx, labelsStep);
        console.log('a', updatedConfigProps.areasPoints.chart.pointX);
        
        this.config.update(updatedConfigProps)
        console.log('x', this.config.offset.distanceX);
        console.log('xx', this.offset.distanceX);

        this.controller.clear()
        this.controller.update(this.config)
    }

    private _updateConfigSameLabels(){
        console.log('UPDATE_SAME_LABELS', this.config.offset.distanceX);
        
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