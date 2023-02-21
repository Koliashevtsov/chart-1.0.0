import { Observable } from '../utils';
import { Message } from '../types';
class Controller {
    observable;
    constructor() {
        this.observable = new Observable();
    }
    add(area) {
        this.observable.subscribe(area);
    }
    initialize(config) {
        this.observable.notify({ message: Message.INITIALIZE, config });
    }
    render() {
        this.observable.notify({ message: Message.RENDER, config: null });
    }
    update(config) {
        this.observable.notify({ message: Message.UPDATE, config });
    }
    clear() {
        this.observable.notify({ message: Message.CLEAR, config: null });
    }
}
export default Controller;
//# sourceMappingURL=controller.js.map