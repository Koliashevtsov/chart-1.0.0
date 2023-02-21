"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("../core"));
const areas_1 = require("../areas");
class Chart {
    ctx;
    core;
    constructor({ context }) {
        this.ctx = context;
        this.core = null;
    }
    init(settings) {
        const { data, options } = settings;
        if (data.datasets.length > 0) {
            data.datasets.forEach((dataset) => {
                if (!dataset.data) {
                    throw Error('Property data is required in each dataset');
                }
                if (dataset.data) {
                    if (dataset.data.length == 0) {
                        throw Error('Property data can not be an empty array');
                    }
                }
            });
        }
        this.core = new core_1.default({ ctx: this.ctx, data, inputOptions: options });
        const chartArea = new areas_1.ChartArea();
        const labelsArea = new areas_1.LabelsArea();
        const valuesArea = new areas_1.ValuesArea();
        const whiteArea = new areas_1.WhiteArea();
        const cursorArea = new areas_1.CursorArea();
        this.core.register(chartArea);
        this.core.register(labelsArea);
        this.core.register(valuesArea);
        this.core.register(whiteArea);
        this.core.register(cursorArea);
        this.core.run();
    }
    destroy() {
        this.core.stop();
    }
}
exports.default = Chart;
//# sourceMappingURL=chart.js.map