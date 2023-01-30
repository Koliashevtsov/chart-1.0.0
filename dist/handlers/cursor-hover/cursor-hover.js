import state from '../../state/state';
class CursorHover {
    ctx;
    controller;
    config;
    cursorPoint;
    valueTab;
    constructor({ ctx, controller, config }) {
        this.ctx = ctx;
        this.controller = controller;
        this.config = config;
        this.cursorPoint = this.config.cursorPoint;
        this.valueTab = this.config.valueTab;
    }
    _mouseMove(event) {
        this.cursorPoint = {
            pointX: event.offsetX,
            pointY: event.offsetY
        };
        this.valueTab.isOpen = false;
        this._updateConfig();
    }
    _mouseLeave(event) {
        this.cursorPoint = {
            pointX: event.offsetX,
            pointY: event.offsetY
        };
        this.valueTab.isOpen = false;
        this._updateConfig();
    }
    _updateConfig() {
        const isCursorArea = this._isPointInArea(this.cursorPoint);
        // check if cursor on chart top point
        const pointsPath = state.getState().pointsPath;
        pointsPath.forEach(pointPath => {
            if (this.ctx.isPointInPath(pointPath.path, this.cursorPoint.pointX, this.cursorPoint.pointY)) {
                this.valueTab.isOpen = true;
                this.valueTab.value = pointPath.value;
            }
        });
        this.config.update({ cursorPoint: this.cursorPoint, isCursorArea, valueTab: this.valueTab });
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
export default CursorHover;
//# sourceMappingURL=cursor-hover.js.map