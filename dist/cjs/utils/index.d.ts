import { NotifyFull, TObserver } from '../types';
export declare class Observable {
    observers: Array<TObserver>;
    constructor();
    subscribe(observer: TObserver): void;
    unsubscribe(id: string): void;
    notify(data: NotifyFull): void;
}
