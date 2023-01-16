import Pan from './pan/pan';
import CursorHover from './cursor-hover/cursor-hover';
class EventHandler {
    listeners;
    constructor({ ctx, controller, config }) {
        this.listeners = [
            new Pan({ ctx, controller, config }),
            new CursorHover({ ctx, controller, config })
        ];
    }
    bindEvents() {
        this.listeners.forEach(listener => listener.bindEvents());
    }
}
export default EventHandler;
//# sourceMappingURL=event-handler.js.map