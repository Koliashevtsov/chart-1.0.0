import Config from '../config';
import EventHandler from '../handlers';
import { TObserver, ConfigProps, TController } from '../types';
declare class Core {
    controller: TController;
    config: Config;
    eventHandler: EventHandler;
    constructor({ ctx, data, inputOptions }: ConfigProps);
    register(area: TObserver): void;
    private _initialize;
    private _render;
    run(): void;
}
export default Core;
