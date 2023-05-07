import { CustomEventHandler, InitHandlerProps } from '../types';
declare class EventHandler {
    listeners: Array<CustomEventHandler>;
    constructor();
    initialize({ controller, config }: InitHandlerProps): void;
    bindEvents(): void;
    unbindEvents(): void;
}
export default EventHandler;
