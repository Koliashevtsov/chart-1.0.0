"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const horizontal_scrolling_event_handler_1 = __importDefault(require("./event-handlers/horizontal-scrolling-event-handler"));
const helpers_1 = require("./helpers");
class HorizontalScrolling {
    id;
    mode;
    config;
    props;
    eventHandler;
    pluginOptions;
    constructor() {
        this.id = 'horizontal-scrolling';
        this.mode = 'after-config-init';
        this.config = null;
        this.props = null;
        this.eventHandler = null;
        this.pluginOptions = null;
    }
    init(props, config) {
        this.props = props;
        this.config = config;
        const clientWidth = this.config.areasSizes.white.width;
        const spaceBetweenLabels = this.props.scrolling;
        // if  original labels fit to client width do cancel plugin
        const allLabelsWidth = config.data.labels.length * props.scrolling;
        if (allLabelsWidth <= clientWidth) {
            this.pluginOptions = null;
            return;
        }
        const { width } = (0, helpers_1.initChartAreaWidth)(spaceBetweenLabels, clientWidth);
        this.pluginOptions = {
            originalConfig: { ...this.config },
            labelsOffset: (0, helpers_1.getLabelsOffset)(this.config.data.labels, spaceBetweenLabels, width),
            labelsStep: spaceBetweenLabels
        };
        this.eventHandler = new horizontal_scrolling_event_handler_1.default(this.pluginOptions);
    }
    _updateConfig() {
        const updated = this._resize();
        this.config.update(updated);
    }
    _resize() {
        const clientWidth = this.config.areasSizes.white.width;
        const spaceBetweenLabels = this.props.scrolling;
        const { width, labelsCount } = (0, helpers_1.initChartAreaWidth)(spaceBetweenLabels, clientWidth);
        // calculate new offset
        const offset = { ...this.config.offset, distanceX: clientWidth - width };
        // calculate idxs
        const [startIdx, finishIdx] = (0, helpers_1.getIdxsSlice)(this.config.data, this.pluginOptions.labelsOffset, labelsCount, this.pluginOptions.labelsStep);
        // rewrite data slice
        const data = (0, helpers_1.getDataSlice)(this.config.data, startIdx, finishIdx);
        // get updated props
        const updated = (0, helpers_1.updatedConfigProps)(this.config, data, offset, width, this.config.areasSizes.chart.height);
        return updated;
    }
    getConfig() {
        // if plugin has been canceled
        if (!this.pluginOptions) {
            return this.config;
        }
        // or update config
        this._updateConfig();
        // and retun it
        return this.config;
    }
}
exports.default = HorizontalScrolling;
//# sourceMappingURL=index.js.map