"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state = () => {
    const initialPointsPath = [];
    let state = {
        pointsPath: initialPointsPath,
    };
    return {
        getState() {
            return state;
        },
        setState(updater) {
            state = { ...state, ...updater };
        }
    };
};
exports.default = state();
//# sourceMappingURL=state.js.map