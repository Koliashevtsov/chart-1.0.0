import { switcher } from './switcher';

import { NotifyFull, TConfig, TObserver, } from '../types';


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

    notify(data: NotifyFull){
        switcher(data, this.observers)
    }
}