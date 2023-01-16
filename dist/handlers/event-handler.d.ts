import { CustomEventListener, ListenerProps } from '../types';
declare class EventHandler {
    listeners: Array<CustomEventListener>;
    constructor({ ctx, controller, config }: ListenerProps);
    bindEvents(): void;
}
export default EventHandler;
