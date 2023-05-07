import { IAfterConfigInitPlugin, CustomEventHandler, HorScrolPlugOptions, IConfig, HorizontalScrollingInputProp } from '../../types';
declare class HorizontalScrolling implements IAfterConfigInitPlugin {
    id: string;
    mode: string;
    config: IConfig;
    props: HorizontalScrollingInputProp;
    eventHandler: CustomEventHandler;
    pluginOptions: HorScrolPlugOptions;
    constructor();
    init(props: HorizontalScrollingInputProp, config: IConfig): void;
    private _updateConfig;
    private _resize;
    getConfig(): IConfig;
}
export default HorizontalScrolling;
