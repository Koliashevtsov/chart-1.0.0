import Controller from '../controller';

import { TObserver} from '../types';


class Core {
    controller: Controller;

    constructor(){
        this.controller = new Controller()
    }

    register(area: TObserver){
        this.controller.add(area);
    }

    private _initialize(){
        this.controller.initialize();
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