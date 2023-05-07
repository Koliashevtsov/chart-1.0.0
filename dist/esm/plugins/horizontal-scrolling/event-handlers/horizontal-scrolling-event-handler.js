import { getDataSlice, getIdxsSlice, resizedChartAreaWidth, updatedConfigProps } from '../helpers';
const SCROLL_DIRECTION = {
    LEFT: 'left',
    RIGHT: 'right'
};
class HorizontalScrollingEventHandler {
    pluginOptions;
    controller;
    config;
    ctx;
    cursorPoint;
    drawing;
    offset;
    leftBoundary;
    rightBoundary;
    constructor(pluginOptions) {
        this.pluginOptions = pluginOptions;
        this.controller = null;
        this.config = null;
        this.ctx = null;
        this.cursorPoint = { pointX: 0, pointY: 0 };
        this.offset = { distanceX: 0, distanceY: 0 };
        this.drawing = false;
        this.leftBoundary = 0;
    }
    initialize({ controller, config }) {
        this.controller = controller;
        this.config = config;
        this.ctx = config.ctx;
        this.offset = this.config.offset;
        this.rightBoundary = this.config.areasSizes.white.width - this.config.areasSizes.chart.width;
    }
    bindEvents() {
        this._addEventListeners();
    }
    unbindEvents() {
        this._removeEventListeners();
    }
    _mouseDown(event) {
        // reset cursor point and start to draw
        this.cursorPoint.pointX = event.offsetX;
        this.cursorPoint.pointY = event.offsetY;
        this.drawing = true;
    }
    _mouseUp() {
        this.drawing = false;
    }
    _mouseMove(event) {
        if (this.drawing) {
            // calculate diff cursor way between events, diff wont be equal and depends on speed move
            // diff can be positive or negative
            // update offset distance it is MAIN what _mouseMove doing
            const diffX = event.offsetX - this.cursorPoint.pointX;
            this._handleOffset(diffX);
            // update cursor point
            this.cursorPoint.pointX = event.offsetX;
            this.cursorPoint.pointY = event.offsetY;
        }
    }
    _handleOffset(diffX) {
        this._getOffset(diffX);
        this._updateConfig();
    }
    _getOffset(diffX) {
        let offsetX = this.offset.distanceX + diffX;
        // if it is left range of labels and offset bigger set offset to 0
        if (this.pluginOptions.labelsOffset == 0 && offsetX > this.leftBoundary) {
            offsetX = this.leftBoundary;
        }
        // if it is right range of labels and offset smaller set offset to right range
        if ((this.pluginOptions.originalConfig.data.labels.length - 1) * this.pluginOptions.labelsStep -
            this.pluginOptions.labelsOffset - this.config.areasSizes.chart.width == 0 &&
            offsetX < this.rightBoundary) {
            offsetX = this.rightBoundary;
        }
        this.offset.distanceX = offsetX;
    }
    _updateConfig() {
        const offsetX = this.offset.distanceX;
        if (offsetX > this.leftBoundary) {
            this._updateConfigNewLabels(SCROLL_DIRECTION.LEFT);
        }
        else if (offsetX < this.rightBoundary) {
            this._updateConfigNewLabels(SCROLL_DIRECTION.RIGHT);
        }
        else {
            this._updateConfigSameLabels();
        }
    }
    _resize(direction) {
        // rewrite offset by hand because one grig step was offset
        if (direction === 'left') {
            this.offset.distanceX = -this.pluginOptions.labelsStep;
            this.pluginOptions.labelsOffset -= this.pluginOptions.labelsStep;
        }
        if (direction === 'right') {
            this.offset.distanceX = this.offset.distanceX + this.pluginOptions.labelsStep;
            this.pluginOptions.labelsOffset += this.pluginOptions.labelsStep;
        }
        const { width, labelsCount } = resizedChartAreaWidth(this.pluginOptions.labelsStep, this.config.areasSizes.white.width, this.offset.distanceX);
        // rewrite right boundary
        this.rightBoundary = this.config.areasSizes.white.width - width;
        // calculate idxs
        const [startIdx, finishIdx] = getIdxsSlice(this.pluginOptions.originalConfig.data, this.pluginOptions.labelsOffset, labelsCount, this.pluginOptions.labelsStep);
        // rewrite data slice
        const data = getDataSlice(this.pluginOptions.originalConfig.data, startIdx, finishIdx);
        return updatedConfigProps(this.pluginOptions.originalConfig, data, this.offset, width, this.config.areasSizes.chart.height);
    }
    _updateConfigNewLabels(direction) {
        const updated = this._resize(direction);
        this.config.update(updated);
        this.controller.clear();
        this.controller.update(this.config);
    }
    _updateConfigSameLabels() {
        const areasPoints = this.config.areasPoints;
        // overload areas points with offset
        const updatedPoints = {
            ...areasPoints,
            chart: {
                pointX: this.offset.distanceX,
                pointY: areasPoints.chart.pointY
            },
            labels: {
                pointX: this.offset.distanceX,
                pointY: areasPoints.labels.pointY
            }
        };
        this.config.update({ offset: this.offset, areasPoints: updatedPoints });
        this.controller.clear();
        this.controller.update(this.config);
    }
    _mouseDownBinded = this._mouseDown.bind(this);
    _mouseUpBinded = this._mouseUp.bind(this);
    _mouseMoveBinded = this._mouseMove.bind(this);
    _addEventListeners() {
        this.ctx.canvas.addEventListener('mousedown', this._mouseDownBinded);
        this.ctx.canvas.addEventListener('mouseup', this._mouseUpBinded);
        this.ctx.canvas.addEventListener('mousemove', this._mouseMoveBinded);
    }
    _removeEventListeners() {
        this.ctx.canvas.removeEventListener('mousedown', this._mouseDownBinded);
        this.ctx.canvas.removeEventListener('mouseup', this._mouseUpBinded);
        this.ctx.canvas.removeEventListener('mousemove', this._mouseMoveBinded);
    }
}
export default HorizontalScrollingEventHandler;
//# sourceMappingURL=horizontal-scrolling-event-handler.js.map