"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Observable = void 0;
const switcher_1 = require("./switcher");
class Observable {
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
        (0, switcher_1.switcher)(data, this.observers);
    }
}
exports.Observable = Observable;
//# sourceMappingURL=index.js.map