export const randomColors = (count) => {
    const colors = [];
    while (count > 0) {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        colors.push(randomColor);
        count -= 1;
    }
    return colors;
};
//# sourceMappingURL=random-colors.js.map