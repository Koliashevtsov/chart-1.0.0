"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backgroundColorFromCss = void 0;
const backgroundColorFromCss = (element) => {
    if (!element) {
        return null;
    }
    if (element.tagName === 'BODY') {
        return null;
    }
    const styles = getComputedStyle(element);
    const color = styles.backgroundColor;
    // if element does not have backgroundColor throught css move up in tree
    if (color === '' || color === 'rgba(0, 0, 0, 0)' || color === 'transparent') {
        return (0, exports.backgroundColorFromCss)(element.parentElement);
    }
    else {
        return color;
    }
};
exports.backgroundColorFromCss = backgroundColorFromCss;
//# sourceMappingURL=background-color-from-css.js.map