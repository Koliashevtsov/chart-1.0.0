import Controller from '../controller';

import { TShape} from '../types';


class Core {
    controller: Controller;

    constructor(){
        this.controller = new Controller()
    }

    register(shape: TShape){
        this.controller.add(shape);
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