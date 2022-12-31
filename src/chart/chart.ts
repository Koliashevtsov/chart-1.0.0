import { InitSettings, Point, Offset, Data, Options, DefOptions, InputOptions, TObserver } from '../types';

import Core from '../core';
import Config from '../config';
import { ChartArea, LabelsArea, ValuesArea } from '../areas';

type ChartConstructor = {
    context: CanvasRenderingContext2D
}

class Chart {
    ctx: CanvasRenderingContext2D;
    core: Core;

    constructor({ context }: ChartConstructor){
        this.ctx = context;
        this.core = null;
    }

    init(settings: InitSettings){
        const { data, options } = settings;

        // this.shape = new Shape({context: this.ctx, data, options});
        // this._render();


        // testing
        // this.shape.renderChartArea()
        // this.shape.renderLabelsArea()
        // this.shape.renderValuesArea()
        // this.shape.renderViewport()

        // testing
        this.core = new Core({ctx: this.ctx, data, inputOptions: options})

        const chartArea = new ChartArea();
        const labelsArea = new LabelsArea();
        const valuesArea = new ValuesArea();

       
        this.core.register(chartArea);
        this.core.register(labelsArea);
        this.core.register(valuesArea);
        this.core.run();

        // and add functionality to change config
        
    }
}

export default Chart;