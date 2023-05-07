import DateTimeLabels from './date-time-labels';
import HorizontalScrolling from './horizontal-scrolling';
import { EPluginMode } from './common';
const allPlugins = new Map();
allPlugins.set('date-time-labels', new DateTimeLabels());
allPlugins.set('horizontal-scrolling', new HorizontalScrolling());
class Plugins {
    inputPlugins;
    config;
    configProps;
    beforeConfigInitPlugins;
    afterConfigInitPlugins;
    constructor(inputPlugins, config, configProps) {
        this.inputPlugins = inputPlugins;
        this.config = config;
        this.configProps = configProps;
        this.beforeConfigInitPlugins = [];
        this.afterConfigInitPlugins = [];
        this._registerPlugins();
    }
    initialize(mode) {
        if (mode === EPluginMode.BeforeConfigInit) {
            // get config props from all registered plugins, each next plugin rewrite previous
            this.beforeConfigInitPlugins.forEach(plugin => {
                // find input plugin props
                const pluginProps = this.inputPlugins.find(inputPlugin => inputPlugin.id === plugin.id).prop; // can changed in future if other plugins will be added
                // init plugin
                plugin.init(pluginProps, this.configProps);
                // rewrite configProps 
                this.configProps = plugin.getConfigProps();
            });
            // and return it
            return this.configProps;
        }
        if (mode === EPluginMode.AfterConfigInit) {
            this.afterConfigInitPlugins.forEach(plugin => {
                // find input plugin props
                const pluginProps = this.inputPlugins.find(inputPlugin => inputPlugin.id === plugin.id).prop; // can changed in future if other plugins will be added
                // init plugin
                plugin.init(pluginProps, this.config);
                // update config
                plugin.getConfig();
            });
            return this.config;
        }
        return this.configProps;
    }
    _registerPlugins() {
        const inputPlugins = this.inputPlugins;
        if (!inputPlugins || inputPlugins.length == 0) {
            return;
        }
        inputPlugins.forEach(inputPlugin => {
            const plugin = allPlugins.get(inputPlugin.id);
            if (plugin.mode === EPluginMode.BeforeConfigInit) {
                this.beforeConfigInitPlugins.push(plugin);
            }
            if (plugin.mode === EPluginMode.AfterConfigInit) {
                this.afterConfigInitPlugins.push(plugin);
            }
        });
    }
}
export default Plugins;
//# sourceMappingURL=index.js.map