import state from '../../state/state';

import { CustomEventListener, ListenerProps, TController, TConfig, Point, TTooltips } from '../../types';

class CursorHover implements CustomEventListener {
    ctx: CanvasRenderingContext2D;
    controller: TController;
    config: TConfig;
    cursorPoint: Point;
    tooltips: TTooltips;

    constructor({ctx, controller, config}: ListenerProps){
        this.ctx = ctx;
        this.controller = controller;
        this.config = config;
        this.cursorPoint = this.config.cursorPoint;
        this.tooltips = this.config.tooltips;
    }

    private _mouseMove(event: MouseEvent){
        this.cursorPoint = {
            pointX: event.offsetX,
            pointY: event.offsetY
        }
        this.tooltips.name.isOpen = false;
        this.tooltips.value.isOpen = false;
        this.tooltips.label.isOpen = false;
        
        this._updateConfig()
    }

    private _mouseLeave(event: MouseEvent){
        this.cursorPoint = {
            pointX: event.offsetX,
            pointY: event.offsetY
        }
        this.tooltips.name.isOpen = false;
        this.tooltips.value.isOpen = false;
        this.tooltips.label.isOpen = false;
        
        this._updateConfig()
    }

    private _updateConfig(){
        const isCursorArea = this._isPointInArea(this.cursorPoint);
        // check if cursor on chart top point
        const pointsPath = state.getState().pointsPath;
        pointsPath.forEach(pointPath => {
            if(this.ctx.isPointInPath(pointPath.path, this.cursorPoint.pointX, this.cursorPoint.pointY)){
                
                this.tooltips.name.isOpen = true;
                this.tooltips.value.isOpen = true;
                this.tooltips.label.isOpen = true;

                this.tooltips.value.title = pointPath.value;
            }
        })

        this.config.update({ cursorPoint: this.cursorPoint, isCursorArea, tooltips: this.tooltips })
        
        this.controller.clear();
        this.controller.update(this.config)
    }

    private _isPointInArea(point: Point){
        // create path like CursorArea
        const cursorPseudo = new Path2D();
        const x = this.config.areasPoints.cursor.pointX;
        const y = this.config.areasPoints.cursor.pointY;
        const w = this.config.areasSizes.cursor.width;
        const h = this.config.areasSizes.cursor.height;
        cursorPseudo.rect(x, y, w, h);

        return this.ctx.isPointInPath(cursorPseudo, point.pointX, point.pointY)
    }

    private _mouseMoveBinded = this._mouseMove.bind(this);
    private _mouseLeaveBinded = this._mouseLeave.bind(this);

    private _addEventListeners(){
       this.ctx.canvas.addEventListener('mousemove', this._mouseMoveBinded);
       this.ctx.canvas.addEventListener('mouseleave', this._mouseLeaveBinded);
    }
    private _removeEventListeners(){
        this.ctx.canvas.removeEventListener('mousemove', this._mouseMoveBinded);
        this.ctx.canvas.removeEventListener('mouseleave', this._mouseLeaveBinded);
    }

    bindEvents(){
        this._addEventListeners()
    }
    
    unbindEvents(){
        this._removeEventListeners()
    }
}

export default CursorHover;