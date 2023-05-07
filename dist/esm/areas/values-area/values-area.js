import { Drawing } from '../../drawing';
export class ValuesArea {
    id;
    drawing;
    constructor() {
        this.id = '2';
        this.drawing = null;
    }
    _draw() {
        this.drawing.drawBackground();
        //drawing horizontal marks for values
        this.drawing.drawValueMarks();
        this.drawing.drawValueTexts();
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
            height: config.areasSizes.values.height,
            width: config.areasSizes.values.width,
            basePoint: config.areasPoints.values,
            gridOpt: config.gridOpt,
            options: config.options,
            cursorPoint: config.cursorPoint,
            isCursorArea: config.isCursorArea,
            tooltips: config.tooltips
        });
    }
}
//# sourceMappingURL=values-area.js.map