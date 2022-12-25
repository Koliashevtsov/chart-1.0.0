import { switcher } from './switcher';

import { TObserver } from '../types';

enum Message {
    INITIALIZE = 'INITIALIZE',
    RENDER = 'RENDER',
    UPDATE = 'UPDATE'
};

type NotifyD = {
    message: Message,
}

export class Observable {
    observers: Array<TObserver>

    constructor(){
        this.observers = []
    }

    subscribe(observer: TObserver){
        this.observers.push(observer)
    }

    unsubscribe(id: string){
        this.observers.find(observer => observer.id === id)
    }

    notify({message}: NotifyD){
        switcher({message, observers: this.observers})
    }
}