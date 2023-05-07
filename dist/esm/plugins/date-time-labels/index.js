import { getDateLabels, isValidDate } from './helpers';
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
        if (isValidDate(firstLabel) && isValidDate(lastLabel)) {
            return getDateLabels(firstLabel, lastLabel, step);
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
export default DateTimeLabels;
//# sourceMappingURL=index.js.map