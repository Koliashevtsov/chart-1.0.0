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
    private _addEventListeners;
    bindEvents(): void;
}
export default Pan;
