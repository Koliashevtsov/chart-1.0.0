"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursorArea = void 0;
const drawing_1 = require("../../drawing");
class CursorArea {
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
        this.drawing = new drawing_1.Drawing({
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
exports.CursorArea = CursorArea;
//# sourceMappingURL=cursor-area.js.map