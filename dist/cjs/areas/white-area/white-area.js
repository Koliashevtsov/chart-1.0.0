"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhiteArea = void 0;
const drawing_1 = require("../../drawing");
// white area exist in order to get base chart offset and can be used as axes borders
class WhiteArea {
    id;
    drawing;
    constructor() {
        this.id = '3';
        this.drawing = null;
    }
    _draw() {
        this.drawing.drawVisibleChartBoundaries();
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
            height: config.areasSizes.white.height,
            width: config.areasSizes.white.width,
            basePoint: config.areasPoints.white,
            gridOpt: config.gridOpt,
            options: config.options,
            cursorPoint: config.cursorPoint,
            isCursorArea: config.isCursorArea,
            tooltips: config.tooltips
        });
    }
}
exports.WhiteArea = WhiteArea;
//# sourceMappingURL=white-area.js.map