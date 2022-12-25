import { switcher } from './switcher';

import { TShape } from '../types';

enum Message {
    INITIALIZE = 'INITIALIZE',
    RENDER = 'RENDER',
    UPDATE = 'UPDATE'
};

type NotifyD = {
    message: Message,
    data?: object
}
type ShapeObserver = TShape;

export class Observable {
    observers: Array<ShapeObserver>

    constructor(){
        this.observers = []
    }

    subscribe(observer: ShapeObserver){
        this.observers.push(observer)
    }

    unsubscribe(id: string){
        this.observers.find(observer => observer.id === id)
    }

    notify({message, data}: NotifyD){
        switcher({message, data, observers: this.observers})
    }
}