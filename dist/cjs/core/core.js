"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const controller_1 = __importDefault(require("../controller"));
const plugins_1 = __importDefault(require("../plugins"));
const handlers_1 = __importDefault(require("../handlers"));
const common_1 = require("../plugins/common");
class Core {
    controller;
    config;
    plugins;
    eventHandler;
    constructor({ ctx, data, inputOptions, inputPlugins }) {
        this.controller = new controller_1.default();
        this.config = new config_1.default();
        this.plugins = new plugins_1.default(inputPlugins, this.config, { ctx, data, inputOptions });
        this.eventHandler = new handlers_1.default();
    }
    register(area) {
        this.controller.add(area);
    }
    _initialize() {
        // plugins
        const configProps = this.plugins.initialize(common_1.EPluginMode.BeforeConfigInit);
        this.config.initialize(configProps);
        this.plugins.initialize(common_1.EPluginMode.AfterConfigInit);
        // add plugins event handler to main EventHandler
        this.plugins.afterConfigInitPlugins.forEach(plugin => {
            // if plugin has eventHandler 
            if (plugin.eventHandler)
                this.eventHandler.listeners.push(plugin.eventHandler);
        });
        // event handler
        // init all event handlers and bind it
        this.eventHandler.initialize({ controller: this.controller, config: this.config });
        this.eventHandler.bindEvents();
        // controller
        this.controller.initialize(this.config);
    }
    _render() {
        this.controller.render();
    }
    run() {
        this._initialize();
        this._render();
    }
    stop() {
        this.eventHandler.unbindEvents();
        this.controller.clear();
    }
}
exports.default = Core;
//# sourceMappingURL=core.js.map