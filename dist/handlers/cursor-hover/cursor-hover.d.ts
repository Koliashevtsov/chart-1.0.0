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
    private _addEventListeners;
    bindEvents(): void;
}
export default CursorHover;
