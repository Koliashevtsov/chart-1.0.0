import { CustomEventListener, ListenerProps, TController, TConfig, Point } from '../../types';

class CursorHover implements CustomEventListener {
    ctx: CanvasRenderingContext2D;
    controller: TController;
    config: TConfig;
    cursorPoint: Point

    constructor({ctx, controller, config}: ListenerProps){
        this.ctx = ctx;
        this.controller = controller;
        this.config = config;
        this.cursorPoint = this.config.cursorPoint;
    }

    private _mouseMove(event: MouseEvent){
        this.cursorPoint = {
            pointX: event.offsetX,
            pointY: event.offsetY
        }

        this._updateConfig()
    }

    private _updateConfig(){
        
        const isCursorArea = this._isPointInArea(this.cursorPoint);

        const config = {
            ...this.config,
            cursorPoint: this.cursorPoint,
            isCursorArea
        }
        
        this.controller.clear();
        this.controller.update(config)
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

    private _addEventListeners(){
       this.ctx.canvas.addEventListener('mousemove', this._mouseMove.bind(this))
    }

    bindEvents(){
        this._addEventListeners()
    }
}

export default CursorHover;