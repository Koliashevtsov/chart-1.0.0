import { Observable } from '../utils';

enum Message {
    INITIALIZE = 'INITIALIZE',
    RENDER = 'RENDER',
    UPDATE = 'UPDATE'
};

type Shape = {
    id: string;
    update: () => void,
    render: () => void,
    draw: () => void
}

class Controller {
    observable: Observable

    constructor(){
        this.observable = new Observable();
    }

    add(shape: Shape){
        this.observable.subscribe(shape);
    }

    initialize(){
        this.observable.notify(Message.INITIALIZE);
    }

    render(){
        this.observable.notify(Message.RENDER);
    }
}

export default Controller;