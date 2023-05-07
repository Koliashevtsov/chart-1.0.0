import EventHandler from '../handlers';
import { TObserver, CoreProps, TController, IConfig, IPlugins } from '../types';
declare class Core {
    controller: TController;
    config: IConfig;
    plugins: IPlugins;
    eventHandler: EventHandler;
    constructor({ ctx, data, inputOptions, inputPlugins }: CoreProps);
    register(area: TObserver): void;
    private _initialize;
    private _render;
    run(): void;
    stop(): void;
}
export default Core;
