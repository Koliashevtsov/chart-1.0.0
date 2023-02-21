"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartArea = void 0;
const drawing_1 = require("../../drawing");
const state_1 = __importDefault(require("../../state/state"));
class ChartArea {
    id;
    drawing;
    constructor() {
        this.id = '0';
        this.drawing = null;
    }
    _draw() {
        this.drawing.drawBackground();
        // draw grid
        this.drawing.drawGrid();
        // draw chart
        const pointsPath = this.drawing.drawChart();
        // and write points path to state
        state_1.default.setState({ pointsPath });
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
            height: config.areasSizes.chart.height,
            width: config.areasSizes.chart.width,
            basePoint: config.areasPoints.chart,
            gridOpt: config.gridOpt,
            options: config.options,
            cursorPoint: config.cursorPoint,
            isCursorArea: config.isCursorArea,
            tooltips: config.tooltips
        });
    }
}
exports.ChartArea = ChartArea;
//# sourceMappingURL=chart-area.js.map