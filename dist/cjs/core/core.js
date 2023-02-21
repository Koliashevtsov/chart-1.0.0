"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const controller_1 = __importDefault(require("../controller"));
const handlers_1 = __importDefault(require("../handlers"));
class Core {
    controller;
    config;
    eventHandler;
    constructor({ ctx, data, inputOptions }) {
        this.controller = new controller_1.default();
        this.config = new config_1.default({ ctx, data, inputOptions });
        this.eventHandler = new handlers_1.default({ ctx, controller: this.controller, config: this.config });
    }
    register(area) {
        this.controller.add(area);
    }
    _initialize() {
        this.eventHandler.bindEvents();
        this.controller.initialize(this.config);
    }
    _render() {
        this.controller.render();
    }
    run() {
        this._initialize();
        this._render();
    }
    stop() {
        this.eventHandler.unbindEvents();
        this.controller.clear();
    }
}
exports.default = Core;
//# sourceMappingURL=core.js.map