import { equalizeDataToLabels } from '../../helpers';
import { IBeforeConfigInitPlugin, DateTimeLabelsInputProp, ConfigProps } from '../../types';
import { getDateLabels, isValidDate } from './helpers';

class DateTimeLabels implements IBeforeConfigInitPlugin {
    id: string;
    mode: string;
    props: DateTimeLabelsInputProp;
    configProps: ConfigProps;

    constructor(){
        this.id = 'date-time-labels';
        this.mode = 'before-config-init';
        this.props = null;
        this.configProps = null;
    }

    init(pluginProps: DateTimeLabelsInputProp, configProps: ConfigProps) {
        this.props = pluginProps;
        this.configProps = configProps;
    }

    private _customizeLabels() {
        const newLabels = this._getLabels()

        // update labels
        this.configProps = {
            ...this.configProps,
            data: {
                ...this.configProps.data,
                labels: newLabels
            }
        }
    }

    private _getLabels(){
        const { startDate, finishDate, step } = this.props;
        
        const firstLabel = new Date(startDate)
        console.log(firstLabel);
        
        const lastLabel = new Date(finishDate)
        console.log(lastLabel);

        if(isValidDate(firstLabel) && isValidDate(lastLabel)){
            return getDateLabels(firstLabel, lastLabel, step)
        } else {
            throw new Error('Invalid date string');
        }
    }

    getConfigProps() {
        this._customizeLabels()
        console.log(this.configProps.data.labels);
        
        return this.configProps
    }

}

export default DateTimeLabels