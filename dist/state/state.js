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
export default state();
//# sourceMappingURL=state.js.map