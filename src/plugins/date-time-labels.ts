import { IPlugin, DateTimeLabelsInputProp, IConfig } from '../types';

class DateTimeLabels implements IPlugin {
    id: string;
    props: DateTimeLabelsInputProp;
    config: IConfig;

    constructor(){
        this.id = 'date-time-labels';
        this.config = null;
        this.props = null;
    }

    init(props: DateTimeLabelsInputProp, config: IConfig) {
        this.props = props;
        this.config = config
    }

    private _customizeLabels() {
        const labels = this.config.data.labels;
        console.log(labels);
        
    }

    getConfig() {
        this._customizeLabels()
        return this.config
    }

}

export default DateTimeLabels