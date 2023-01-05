import Controller from '../controller';

import { TConfig, CustomEventListener, ListenerProps } from '../types';

import Pan from './pan/pan';
import CursorHover from './cursor-hover/cursor-hover';

class EventHandler {
    listeners: Array<CustomEventListener>

    constructor({ ctx, controller, config }: ListenerProps){
        this.listeners = [
            new Pan({ctx, controller, config}),
            new CursorHover({ctx, controller, config})
        ]
    }

    bindEvents(){
        this.listeners.forEach(listener => listener.bindEvents())
    }
}

export default EventHandler;