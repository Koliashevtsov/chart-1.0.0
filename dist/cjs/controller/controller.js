"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const types_1 = require("../types");
class Controller {
    observable;
    constructor() {
        this.observable = new utils_1.Observable();
    }
    add(area) {
        this.observable.subscribe(area);
    }
    initialize(config) {
        this.observable.notify({ message: types_1.Message.INITIALIZE, config });
    }
    render() {
        this.observable.notify({ message: types_1.Message.RENDER, config: null });
    }
    update(config) {
        this.observable.notify({ message: types_1.Message.UPDATE, config });
    }
    clear() {
        this.observable.notify({ message: types_1.Message.CLEAR, config: null });
    }
}
exports.default = Controller;
//# sourceMappingURL=controller.js.map