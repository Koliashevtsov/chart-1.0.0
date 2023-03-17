import { CustomEventHandler, InitHandlerProps } from '../types';

import CursorHover from './cursor-hover/cursor-hover';

class EventHandler {
    listeners: Array<CustomEventHandler>

    constructor(){
        this.listeners = [
            new CursorHover()
        ]
    }

    initialize({ controller, config }: InitHandlerProps){
        this.listeners.forEach(listener => listener.initialize({ controller, config }))
    }

    bindEvents(){
        this.listeners.forEach(listener => listener.bindEvents())
    }

    unbindEvents(){
        this.listeners.forEach(listener => listener.unbindEvents())
    }
}

export default EventHandler;