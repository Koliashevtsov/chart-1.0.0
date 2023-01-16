import { Drawing } from '../../drawing';
// white area exist in order to get base chart offset and can be used as axes borders
export class WhiteArea {
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
        this.drawing = new Drawing({
            ctx: config.ctx,
            data: config.data,
            height: config.areasSizes.white.height,
            width: config.areasSizes.white.width,
            basePoint: config.areasPoints.white,
            gridOpt: config.gridOpt,
            options: config.options,
            cursorPoint: config.cursorPoint,
            isCursorArea: config.isCursorArea,
            valueTab: config.valueTab
        });
    }
}
//# sourceMappingURL=white-area.js.map