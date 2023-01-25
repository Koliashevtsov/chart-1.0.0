import Core from '../core';
import { ChartArea, LabelsArea, ValuesArea, WhiteArea, CursorArea } from '../areas';
class Chart {
    ctx;
    core;
    constructor({ context }) {
        this.ctx = context;
        this.core = null;
    }
    init(settings) {
        const { data, options } = settings;
        this.core = new Core({ ctx: this.ctx, data, inputOptions: options });
        const chartArea = new ChartArea();
        const labelsArea = new LabelsArea();
        const valuesArea = new ValuesArea();
        const whiteArea = new WhiteArea();
        const cursorArea = new CursorArea();
        this.core.register(chartArea);
        this.core.register(labelsArea);
        this.core.register(valuesArea);
        this.core.register(whiteArea);
        this.core.register(cursorArea);
        this.core.run();
    }
}
export default Chart;
//# sourceMappingURL=chart.js.map