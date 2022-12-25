import { TShape } from '../types';

enum Message {
    INITIALIZE = 'INITIALIZE',
    RENDER = 'RENDER',
    UPDATE = 'UPDATE'
};


type SwitcherP = {
    message: Message,
    data?: object,
    observers: Array<TShape>
}

export const switcher = ({message, data, observers}: SwitcherP) => {
    switch(message){
        case 'INITIALIZE':
            observers.forEach(observer => observer.initialize());
            break;
        case 'RENDER':
            observers.forEach(observer => observer.render());
            break;
        case 'UPDATE':
            observers.forEach(observer => observer.update());
            break;
        default: 
            return
    }
}