"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = __importDefault(require("../../state/state"));
class CursorHover {
    ctx;
    controller;
    config;
    cursorPoint;
    tooltips;
    constructor() {
        this.ctx = null;
        this.controller = null;
        this.config = null;
        this.cursorPoint = { pointX: 0, pointY: 0 };
        this.tooltips = null;
    }
    initialize({ controller, config }) {
        this.controller = controller;
        this.config = config;
        this.ctx = config.ctx;
        this.cursorPoint = this.config.cursorPoint;
        this.tooltips = this.config.tooltips;
    }
    _mouseMove(event) {
        this.cursorPoint = {
            pointX: event.offsetX,
            pointY: event.offsetY
        };
        this.tooltips.name.title = null;
        this.tooltips.value.title = null;
        this.tooltips.label.title = null;
        this._updateConfig();
    }
    _mouseLeave(event) {
        this.cursorPoint = {
            pointX: event.offsetX,
            pointY: event.offsetY
        };
        this.tooltips.name.title = null;
        this.tooltips.value.title = null;
        this.tooltips.label.title = null;
        this._updateConfig();
    }
    _updateConfig() {
        const isCursorArea = this._isPointInArea(this.cursorPoint);
        // check if cursor on chart top point
        const pointsPath = state_1.default.getState().pointsPath;
        pointsPath.forEach(pointPath => {
            if (this.ctx.isPointInPath(pointPath.path, this.cursorPoint.pointX, this.cursorPoint.pointY)) {
                this.tooltips.value.title = pointPath.value;
                this.tooltips.label.title = pointPath.label;
                this.tooltips.name.title = pointPath.name;
            }
        });
        this.config.update({ cursorPoint: this.cursorPoint, isCursorArea, tooltips: this.tooltips });
        this.controller.clear();
        this.controller.update(this.config);
    }
    _isPointInArea(point) {
        // create path like CursorArea
        const cursorPseudo = new Path2D();
        const x = this.config.areasPoints.cursor.pointX;
        const y = this.config.areasPoints.cursor.pointY;
        const w = this.config.areasSizes.cursor.width;
        const h = this.config.areasSizes.cursor.height;
        cursorPseudo.rect(x, y, w, h);
        return this.ctx.isPointInPath(cursorPseudo, point.pointX, point.pointY);
    }
    _mouseMoveBinded = this._mouseMove.bind(this);
    _mouseLeaveBinded = this._mouseLeave.bind(this);
    _addEventListeners() {
        this.ctx.canvas.addEventListener('mousemove', this._mouseMoveBinded);
        this.ctx.canvas.addEventListener('mouseleave', this._mouseLeaveBinded);
    }
    _removeEventListeners() {
        this.ctx.canvas.removeEventListener('mousemove', this._mouseMoveBinded);
        this.ctx.canvas.removeEventListener('mouseleave', this._mouseLeaveBinded);
    }
    bindEvents() {
        this._addEventListeners();
    }
    unbindEvents() {
        this._removeEventListeners();
    }
}
exports.default = CursorHover;
//# sourceMappingURL=cursor-hover.js.map