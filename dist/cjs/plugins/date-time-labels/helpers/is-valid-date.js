"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDate = void 0;
const isValidDate = (d) => {
    return d instanceof Date && !isNaN(d.getDate());
};
exports.isValidDate = isValidDate;
//# sourceMappingURL=is-valid-date.js.map