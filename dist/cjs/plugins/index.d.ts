import { InputPlugin, IConfig, IPlugins, ConfigProps, IBeforeConfigInitPlugin, IAfterConfigInitPlugin } from '../types';
declare class Plugins implements IPlugins {
    inputPlugins: InputPlugin[];
    config: IConfig;
    configProps: ConfigProps;
    beforeConfigInitPlugins: IBeforeConfigInitPlugin[];
    afterConfigInitPlugins: IAfterConfigInitPlugin[];
    constructor(inputPlugins: InputPlugin[], config: IConfig, configProps: ConfigProps);
    initialize(mode: string): IConfig | ConfigProps;
    private _registerPlugins;
}
export default Plugins;
