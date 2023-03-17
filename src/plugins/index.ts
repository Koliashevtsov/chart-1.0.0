import HorizontalScrolling from './horizontal-scrolling';

import { InputPlugin, IConfig, IPlugins, IPlugin } from '../types';

const allPlugins = new Map()
allPlugins.set('horizontal-scrolling', new HorizontalScrolling())

class Plugins implements IPlugins {
    registeredPlugins: IPlugin[]
    config: IConfig

    constructor(inputPlugins: InputPlugin[], config: IConfig){
        this.config = config
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