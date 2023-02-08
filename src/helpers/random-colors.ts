export const randomColors = (count: number) => {
    const colors = [];

    while(count > 0){
        const randomColor = getRandomColor();
        colors.push(randomColor)
        count -= 1
    }
    return colors
}

export const getRandomColor = (): string => {
    const regexStr = '^#([A-Fa-f0-9]){6}$';
    const randomStr = '#' + Math.floor(Math.random()*16777215).toString(16);

    if(!randomStr.match(regexStr)){
        return getRandomColor()
    }

    return randomStr
}