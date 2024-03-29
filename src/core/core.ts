import Config from '../config';
import Controller from '../controller';

import  EventHandler  from '../handlers';

import { TObserver, ConfigProps, TController } from '../types';


class Core {
    controller: TController;
    config: Config;
    eventHandler: EventHandler;

    constructor({ctx, data, inputOptions}: ConfigProps){
        this.controller = new Controller()
        this.config = new Config({ctx, data, inputOptions})
        this.eventHandler = new EventHandler({ctx, controller: this.controller, config: this.config})
    }

    register(area: TObserver){
        this.controller.add(area);
    }

    private _initialize(){
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