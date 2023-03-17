import { Observable } from '../utils';

import { TObserver, Message, IConfig } from '../types';

class Controller {
    observable: Observable

    constructor(){
        this.observable = new Observable();
    }

    add(area: TObserver){
        this.observable.subscribe(area);
    }

    initialize(config: IConfig){
        this.observable.notify({message: Message.INITIALIZE, config});
    }

    render(){
        this.observable.notify({message: Message.RENDER, config: null});
    }

    update(config: IConfig){
        this.observable.notify({message: Message.UPDATE, config});
    }

    clear(){
        this.observable.notify({message: Message.CLEAR, config: null});
    }
}

export default Controller;