"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switcher = void 0;
const switcher = ({ message, config }, observers) => {
    switch (message) {
        case 'INITIALIZE':
            observers.forEach(observer => observer.initialize(config));
            break;
        case 'RENDER':
            observers.forEach(observer => observer.render());
            break;
        case 'UPDATE':
            observers.forEach(observer => observer.update(config));
            break;
        case 'CLEAR':
            observers.forEach(observers => observers.clear());
            break;
        default:
            return;
    }
};
exports.switcher = switcher;
//# sourceMappingURL=switcher.js.map