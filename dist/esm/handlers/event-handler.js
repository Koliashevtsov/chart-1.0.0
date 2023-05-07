import CursorHover from './cursor-hover/cursor-hover';
class EventHandler {
    listeners;
    constructor() {
        this.listeners = [
            new CursorHover()
        ];
    }
    initialize({ controller, config }) {
        this.listeners.forEach(listener => listener.initialize({ controller, config }));
    }
    bindEvents() {
        this.listeners.forEach(listener => listener.bindEvents());
    }
    unbindEvents() {
        this.listeners.forEach(listener => listener.unbindEvents());
    }
}
export default EventHandler;
//# sourceMappingURL=event-handler.js.map