"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelsArea = void 0;
const drawing_1 = require("../../drawing/drawing");
class LabelsArea {
    id;
    drawing;
    constructor() {
        this.id = '1';
        this.drawing = null;
    }
    _draw() {
        this.drawing.drawBackground();
        this.drawing.drawLabelMarks();
        this.drawing.drawLabelTexts();
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
            height: config.areasSizes.labels.height,
            width: config.areasSizes.labels.width,
            basePoint: config.areasPoints.labels,
            gridOpt: config.gridOpt,
            options: config.options,
            cursorPoint: config.cursorPoint,
            isCursorArea: config.isCursorArea,
            tooltips: config.tooltips
        });
    }
}
exports.LabelsArea = LabelsArea;
//# sourceMappingURL=labels-area.js.map