import { Observable } from '../utils';

import { TObserver, Message, TConfig } from '../types';

class Controller {
    observable: Observable

    constructor(){
        this.observable = new Observable();
    }

    add(area: TObserver){
        this.observable.subscribe(area);
    }

    initialize(config: TConfig){
        this.observable.notify({message: Message.INITIALIZE, config});
    }

    render(){
        this.observable.notify({message: Message.RENDER, config: null});
    }

    update(config: TConfig){
        this.observable.notify({message: Message.UPDATE, config});
    }
}

export default Controller;