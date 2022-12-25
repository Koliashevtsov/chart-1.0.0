import { Observable } from '../utils';

import { TObserver } from '../types';

enum Message {
    INITIALIZE = 'INITIALIZE',
    RENDER = 'RENDER',
    UPDATE = 'UPDATE'
};

class Controller {
    observable: Observable

    constructor(){
        this.observable = new Observable();
    }

    add(area: TObserver){
        this.observable.subscribe(area);
    }

    initialize(){
        this.observable.notify({message: Message.INITIALIZE});
    }

    render(){
        this.observable.notify({message: Message.RENDER});
    }

    update(){
        this.observable.notify({message: Message.UPDATE});
    }
}

export default Controller;