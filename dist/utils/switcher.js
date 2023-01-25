var Message;
(function (Message) {
    Message["INITIALIZE"] = "INITIALIZE";
    Message["RENDER"] = "RENDER";
    Message["UPDATE"] = "UPDATE";
})(Message || (Message = {}));
;
export const switcher = ({ message, config }, observers) => {
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
//# sourceMappingURL=switcher.js.map