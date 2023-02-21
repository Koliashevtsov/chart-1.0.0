import { switcher } from './switcher';
export class Observable {
    observers;
    constructor() {
        this.observers = [];
    }
    subscribe(observer) {
        this.observers.push(observer);
    }
    unsubscribe(id) {
        this.observers.find(observer => observer.id === id);
    }
    notify(data) {
        switcher(data, this.observers);
    }
}
//# sourceMappingURL=index.js.map