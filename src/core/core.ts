import Config from '../config';
import Controller from '../controller';
import Plugins from '../plugins';

import  EventHandler  from '../handlers';

import { TObserver, CoreProps, TController, IConfig, IPlugins } from '../types';

class Core {
    controller: TController;
    config: IConfig;
    plugins: IPlugins;
    eventHandler: EventHandler;

    constructor({ctx, data, inputOptions, inputPlugins}: CoreProps){
        this.controller = new Controller()
        this.plugins  = new Plugins(inputPlugins, new Config(), {ctx, data, inputOptions})
        this.config = this.plugins.getConfig();
        this.eventHandler = new EventHandler()
    }

    register(area: TObserver){
        this.controller.add(area);
    }

    private _initialize(){
        // add plugins event handler to main EventHandler
        this.plugins.registeredPlugins.forEach(plugin => {
            // if plugin has eventHandler 
            if(plugin.eventHandler) this.eventHandler.listeners.push(plugin.eventHandler)
        })
        // init all event handlers and bind it
        this.eventHandler.initialize({ controller: this.controller, config: this.config })
        this.eventHandler.bindEvents();
        
        this.controller.initialize(this.config);
    }

    private _render(){
        this.controller.render();
    }

    run(){
        this._initialize();
        this._render();
    }

    stop(){
        this.eventHandler.unbindEvents()
        this.controller.clear()
    }

}

export default Core;