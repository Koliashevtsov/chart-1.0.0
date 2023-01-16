import Config from '../config';
import Controller from '../controller';
import EventHandler from '../handlers';
class Core {
    controller;
    config;
    eventHandler;
    constructor({ ctx, data, inputOptions }) {
        this.controller = new Controller();
        this.config = new Config({ ctx, data, inputOptions });
        this.eventHandler = new EventHandler({ ctx, controller: this.controller, config: this.config });
    }
    register(area) {
        this.controller.add(area);
    }
    _initialize() {
        this.eventHandler.bindEvents();
        this.controller.initialize(this.config);
    }
    _render() {
        this.controller.render();
    }
    run() {
        this._initialize();
        this._render();
    }
}
export default Core;
//# sourceMappingURL=core.js.map