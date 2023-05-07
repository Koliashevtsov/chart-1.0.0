import { CustomEventHandler, InitHandlerProps, TController, IConfig, Point, TTooltips } from '../../types';
declare class CursorHover implements CustomEventHandler {
    ctx: CanvasRenderingContext2D;
    controller: TController;
    config: IConfig;
    cursorPoint: Point;
    tooltips: TTooltips;
    constructor();
    initialize({ controller, config }: InitHandlerProps): void;
    private _mouseMove;
    private _mouseLeave;
    private _updateConfig;
    private _isPointInArea;
    private _mouseMoveBinded;
    private _mouseLeaveBinded;
    private _addEventListeners;
    private _removeEventListeners;
    bindEvents(): void;
    unbindEvents(): void;
}
export default CursorHover;
