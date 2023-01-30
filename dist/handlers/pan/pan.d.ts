import { TConfig, Point, Offset, CustomEventListener, ListenerProps, TController } from '../../types';
declare class Pan implements CustomEventListener {
    ctx: CanvasRenderingContext2D;
    controller: TController;
    config: TConfig;
    cursorPoint: Point;
    drawing: boolean;
    offset: Offset;
    constructor({ ctx, controller, config }: ListenerProps);
    private _mouseDown;
    private _mouseUp;
    private _mouseMove;
    private _updateConfig;
    private _mouseDownBinded;
    private _mouseUpBinded;
    private _mouseMoveBinded;
    private _addEventListeners;
    private _removeEventListeners;
    bindEvents(): void;
    unbindEvents(): void;
}
export default Pan;
