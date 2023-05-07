import { dateTimeLabelsPluginStepDef } from "../../common/defaults";
import { isValidTemplate } from "./is-valid-template";
export const parseDateStep = (step) => {
    // delete all posible spaces in step string;
    const inputString = step.replace(/\s+/g, "");
    const numbers = [];
    const strings = [];
    const iteratedSymbols = inputString.split('');
    // if arr contain less then two items
    if (iteratedSymbols.length < 2) {
        throw new Error('step must contain both of the number and string part');
    }
    iteratedSymbols.forEach((symbol, index) => {
        // if first symbol is not a number throw error
        if (index === 0) {
            if (isNaN(Number(symbol))) {
                throw new Error('first symbol in step must be an integer');
            }
            // else push to arr
            numbers.push(Number(symbol));
        }
        // if last symbol is not a string throw arror
        else if (index === iteratedSymbols.length - 1) {
            if (!isNaN(Number(symbol))) {
                throw new Error('last symbol in step must be string');
            }
            strings.push(symbol);
        }
        // for all others
        else {
            // if symbol is number add to numbers
            if ((!isNaN(Number(symbol)))) {
                numbers.push(Number(symbol));
            }
            else {
                strings.push(symbol);
            }
        }
    });
    const count = numbers.join('');
    const template = strings.join('');
    // validate template
    if (!isValidTemplate(template)) {
        throw new Error(`step template is not valid, please use one of the following templates: 
            ${Object.values(dateTimeLabelsPluginStepDef).join(', ')}`);
    }
    return {
        count,
        template
    };
};
//# sourceMappingURL=parse-date-step.js.map