import Config from '../config';
import Controller from '../controller';
import Plugins from '../plugins';
import EventHandler from '../handlers';
import { EPluginMode } from '../plugins/common';
class Core {
    controller;
    config;
    plugins;
    eventHandler;
    constructor({ ctx, data, inputOptions, inputPlugins }) {
        this.controller = new Controller();
        this.config = new Config();
        this.plugins = new Plugins(inputPlugins, this.config, { ctx, data, inputOptions });
        this.eventHandler = new EventHandler();
    }
    register(area) {
        this.controller.add(area);
    }
    _initialize() {
        // plugins
        const configProps = this.plugins.initialize(EPluginMode.BeforeConfigInit);
        this.config.initialize(configProps);
        this.plugins.initialize(EPluginMode.AfterConfigInit);
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
export default Core;
//# sourceMappingURL=core.js.map