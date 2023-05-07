"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
class DateTimeLabels {
    id;
    mode;
    props;
    configProps;
    constructor() {
        this.id = 'date-time-labels';
        this.mode = 'before-config-init';
        this.props = null;
        this.configProps = null;
    }
    init(pluginProps, configProps) {
        this.props = pluginProps;
        this.configProps = configProps;
    }
    _customizeLabels() {
        const newLabels = this._getLabels();
        console.log(newLabels);
        // update labels
        this.configProps = {
            ...this.configProps,
            data: {
                ...this.configProps.data,
                labels: newLabels
            }
        };
    }
    _getLabels() {
        const { startDate, finishDate, step } = this.props;
        const firstLabel = new Date(startDate);
        const lastLabel = new Date(finishDate);
        if ((0, helpers_1.isValidDate)(firstLabel) && (0, helpers_1.isValidDate)(lastLabel)) {
            return (0, helpers_1.getDateLabels)(firstLabel, lastLabel, step);
        }
        else {
            throw new Error('Invalid date string');
        }
    }
    getConfigProps() {
        this._customizeLabels();
        return this.configProps;
    }
}
exports.default = DateTimeLabels;
//# sourceMappingURL=index.js.map