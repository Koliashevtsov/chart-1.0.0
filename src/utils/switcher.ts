import { NotifyFull, TConfig, TObserver } from '../types';

enum Message {
    INITIALIZE = 'INITIALIZE',
    RENDER = 'RENDER',
    UPDATE = 'UPDATE'
};

export const switcher = ({ message, config }: NotifyFull, observers: Array<TObserver>) => {
    switch(message){
        case 'INITIALIZE':
            observers.forEach(observer => observer.initialize(config));
            break;
        case 'RENDER':
            observers.forEach(observer => observer.render());
            break;
        case 'UPDATE':
            observers.forEach(observer => observer.update(config));
            break;
        case 'CLEAR':
            observers.forEach(observers => observers.clear());
            break;
        default: 
            return
    }
}