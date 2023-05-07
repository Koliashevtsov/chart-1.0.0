import { Drawing } from '../../drawing';
export class CursorArea {
    id;
    drawing;
    constructor() {
        this.id = '4';
        this.drawing = null;
    }
    _draw() {
        this.drawing.drawIntersection();
    }
    clear() {
        this.drawing.clear();
    }
    initialize(config) {
        this._createDrawing(config);
    }
    render() {
        this._draw();
    }
    update(config) {
        this._createDrawing(config);
        this.render();
    }
    _createDrawing(config) {
        this.drawing = new Drawing({
            ctx: config.ctx,
            data: config.data,
            height: config.areasSizes.cursor.height,
            width: config.areasSizes.cursor.width,
            basePoint: config.areasPoints.cursor,
            gridOpt: config.gridOpt,
            options: config.options,
            cursorPoint: config.cursorPoint,
            isCursorArea: config.isCursorArea,
            tooltips: config.tooltips
        });
    }
}
//# sourceMappingURL=cursor-area.js.map