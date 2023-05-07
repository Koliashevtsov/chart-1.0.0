"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateLabels = void 0;
const parse_date_step_1 = require("./parse-date-step");
const get_next_date_1 = require("./get-next-date");
const beautify_labels_1 = require("./beautify-labels");
const getDateLabels = (firstLabel, lastLabel, step) => {
    const { count, template } = (0, parse_date_step_1.parseDateStep)(step);
    const updated = [firstLabel.toISOString()];
    let loopCount = firstLabel.getTime();
    for (; loopCount < lastLabel.getTime();) {
        const nextLabel = (0, get_next_date_1.getNextDate)(new Date(updated[updated.length - 1]), template, Number(count));
        loopCount = new Date(nextLabel).getTime();
        if (loopCount < lastLabel.getTime()) {
            updated.push(nextLabel);
        }
    }
    // add last label
    updated.push(lastLabel.toISOString());
    // return arr with strings
    return (0, beautify_labels_1.beautifyLabels)(updated, template);
};
exports.getDateLabels = getDateLabels;
//# sourceMappingURL=get-date-labels.js.map