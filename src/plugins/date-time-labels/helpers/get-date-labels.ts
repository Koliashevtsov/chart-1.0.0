import { parseDateStep } from './parse-date-step';

export const getDateLabels = (firstLabel: Date, lastLabel: Date, step: string) => {
    const { multiplier, template } = parseDateStep(step); 
    console.log(multiplier, template);
    
    const milisecondsStep = multiplier;
    const firstLabelInMiliseconds = new Date(firstLabel).getTime();
    const lastLabelInMiliseconds = new Date(lastLabel).getTime();
    const labelsCount = (lastLabelInMiliseconds - firstLabelInMiliseconds) / Number(step) + 1;
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