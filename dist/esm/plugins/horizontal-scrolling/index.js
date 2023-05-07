import HorizontalScrollingEventHandler from './event-handlers/horizontal-scrolling-event-handler';
import { getDataSlice, getIdxsSlice, getLabelsOffset, initChartAreaWidth, updatedConfigProps } from './helpers';
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
        const allLabelsWidth = (config.data.labels.length - 1) * props.scrolling;
        if (allLabelsWidth <= clientWidth) {
            this.pluginOptions = null;
            return;
        }
        const { width } = initChartAreaWidth(spaceBetweenLabels, clientWidth);
        this.pluginOptions = {
            originalConfig: { ...this.config },
            labelsOffset: getLabelsOffset(this.config.data.labels, spaceBetweenLabels, width),
            labelsStep: spaceBetweenLabels
        };
        this.eventHandler = new HorizontalScrollingEventHandler(this.pluginOptions);
    }
    _updateConfig() {
        const updated = this._resize();
        this.config.update(updated);
    }
    _resize() {
        const clientWidth = this.config.areasSizes.white.width;
        const spaceBetweenLabels = this.props.scrolling;
        const { width, labelsCount } = initChartAreaWidth(spaceBetweenLabels, clientWidth);
        // calculate new offset
        const offset = { ...this.config.offset, distanceX: clientWidth - width };
        // calculate idxs
        const [startIdx, finishIdx] = getIdxsSlice(this.config.data, this.pluginOptions.labelsOffset, labelsCount, this.pluginOptions.labelsStep);
        // rewrite data slice
        const data = getDataSlice(this.config.data, startIdx, finishIdx);
        // get updated props
        const updated = updatedConfigProps(this.config, data, offset, width, this.config.areasSizes.chart.height);
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
export default HorizontalScrolling;
//# sourceMappingURL=index.js.map