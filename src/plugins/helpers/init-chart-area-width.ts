export const initChartAreaWidth = (labelsStep: number, clientWidth: number) => {
    // how many labels are visible and plus one can be partly invisible, so use Math.ceil
    const countSpaces = Math.ceil(clientWidth / labelsStep)
    let width = countSpaces * labelsStep;

    if(width < clientWidth){
        width = clientWidth
    }

    return {
        width: width,
        labelsCount: countSpaces + 1
    }
}