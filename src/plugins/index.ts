import DateTimeLabels from './date-time-labels';
import HorizontalScrolling from './horizontal-scrolling';

import { InputPlugin, IConfig, IPlugins, IPlugin, ConfigProps } from '../types';

const allPlugins = new Map();
allPlugins.set('date-time-labels', new DateTimeLabels())
allPlugins.set('horizontal-scrolling', new HorizontalScrolling());


class Plugins implements IPlugins {
    registeredPlugins: IPlugin[];
    config: IConfig;
    configProps: ConfigProps;

    constructor(inputPlugins: InputPlugin[], config: IConfig, configProps: ConfigProps){
        this.config = config;
        this.configProps = configProps;
        this.registeredPlugins = this._registerPlugins(inputPlugins)
    }

    private _registerPlugins(inputPlugins: InputPlugin[]){
        if(!inputPlugins || inputPlugins.length == 0){
            return []
        }

        const pls = inputPlugins.map(inputPlugin => {
            const plugin: IPlugin = allPlugins.get(inputPlugin.id);
            plugin.init(inputPlugin.prop, this.config)
            return plugin
        })
        return pls
    }

    getConfig(){
        if(this.registeredPlugins.length == 0){
            // if no one plugin registered
            // init config with props
            this.config.initialize(this.configProps)
            // and then return it
            return this.config
        }
        // pack config from each registered plugin
        this.registeredPlugins.forEach(plugin => {
            this.config.update(plugin.getConfig())
        })
        return this.config
    }


}

export default Plugins;