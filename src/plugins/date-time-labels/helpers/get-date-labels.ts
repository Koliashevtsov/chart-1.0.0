import { parseDateStep } from './parse-date-step';
import { getNextDate } from './get-next-date';
import { beautifyLabels } from './beautify-labels';

export const getDateLabels = (firstLabel: Date, lastLabel: Date, step: string) => {
    const { count, template } = parseDateStep(step);

    const updated = [firstLabel.toISOString()];
    let loopCount = firstLabel.getTime()
    
    for(;loopCount < lastLabel.getTime();){
        const nextLabel = getNextDate(new Date(updated[updated.length - 1]), template, Number(count))
        
        loopCount = new Date(nextLabel).getTime()
        if(loopCount < lastLabel.getTime()){
            updated.push(nextLabel)
        }
    }

    // add last label
    updated.push(lastLabel.toISOString())

    // return arr with strings
    return beautifyLabels(updated, template) 
}