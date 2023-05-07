"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cursor_hover_1 = __importDefault(require("./cursor-hover/cursor-hover"));
class EventHandler {
    listeners;
    constructor() {
        this.listeners = [
            new cursor_hover_1.default()
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
exports.default = EventHandler;
//# sourceMappingURL=event-handler.js.map