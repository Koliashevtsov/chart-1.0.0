import Config from '../config';
import Controller from '../controller';

import { TObserver, ConfigProps } from '../types';


class Core {
    controller: Controller;
    config: Config;

    constructor({ctx, data, inputOptions}: ConfigProps){
        this.controller = new Controller()
        this.config = new Config({ctx, data, inputOptions})
    }

    register(area: TObserver){
        this.controller.add(area);
    }

    private _initialize(){
        this.controller.initialize(this.config);
    }

    private _render(){
        this.controller.render();
    }

    run(){
        this._initialize();
        this._render();
    }

}

export default Core;