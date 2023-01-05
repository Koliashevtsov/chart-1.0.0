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
        const isCursorArea = true;

        const config = {
            ...this.config,
            cursorPoint: this.cursorPoint,
            isCursorArea
        }
        console.log(config.offset.distanceX);
        
        this.controller.clear();
        this.controller.update(config)
    }

    private _addEventListeners(){
       this.ctx.canvas.addEventListener('mousemove', this._mouseMove.bind(this))
    }

    bindEvents(){
        this._addEventListeners()
    }
}

export default CursorHover;