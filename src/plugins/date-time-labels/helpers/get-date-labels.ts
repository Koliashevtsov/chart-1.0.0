export const getDateLabels = (firstLabel: Date, lastLabel: Date, step: number) => {
    const milisecondsStep = step;
    const firstLabelInMiliseconds = new Date(firstLabel).getTime();
    const lastLabelInMiliseconds = new Date(lastLabel).getTime();
    const labelsCount = (lastLabelInMiliseconds - firstLabelInMiliseconds) / step + 1;
    const updated = [firstLabelInMiliseconds];

    for(let i = 0; i < labelsCount - 2; i++){
        const nextLabel = updated[updated.length - 1] + Number(milisecondsStep);
        updated.push(nextLabel)
    }

    // add last label
    updated.push(new Date(lastLabel).getTime())
    console.log(updated);
    
    // return arr with strings
    return updated.map(labelMilis => new Date(labelMilis).toISOString())
}