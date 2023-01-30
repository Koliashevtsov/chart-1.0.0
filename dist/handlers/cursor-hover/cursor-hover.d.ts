import { CustomEventListener, ListenerProps, TController, TConfig, Point, TValueTab } from '../../types';
declare class CursorHover implements CustomEventListener {
    ctx: CanvasRenderingContext2D;
    controller: TController;
    config: TConfig;
    cursorPoint: Point;
    valueTab: TValueTab;
    constructor({ ctx, controller, config }: ListenerProps);
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
