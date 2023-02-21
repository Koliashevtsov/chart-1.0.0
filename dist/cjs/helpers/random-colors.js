"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomColor = exports.randomColors = void 0;
const randomColors = (count) => {
    const colors = [];
    while (count > 0) {
        const randomColor = (0, exports.getRandomColor)();
        colors.push(randomColor);
        count -= 1;
    }
    return colors;
};
exports.randomColors = randomColors;
const getRandomColor = () => {
    const regexStr = '^#([A-Fa-f0-9]){6}$';
    const randomStr = '#' + Math.floor(Math.random() * 16777215).toString(16);
    if (!randomStr.match(regexStr)) {
        return (0, exports.getRandomColor)();
    }
    return randomStr;
};
exports.getRandomColor = getRandomColor;
//# sourceMappingURL=random-colors.js.map