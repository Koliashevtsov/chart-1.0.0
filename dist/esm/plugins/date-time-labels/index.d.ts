import { IBeforeConfigInitPlugin, DateTimeLabelsInputProp, ConfigProps } from '../../types';
declare class DateTimeLabels implements IBeforeConfigInitPlugin {
    id: string;
    mode: string;
    props: DateTimeLabelsInputProp;
    configProps: ConfigProps;
    constructor();
    init(pluginProps: DateTimeLabelsInputProp, configProps: ConfigProps): void;
    private _customizeLabels;
    private _getLabels;
    getConfigProps(): ConfigProps;
}
export default DateTimeLabels;
