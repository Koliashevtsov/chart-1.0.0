import { Dataset, InitSettings } from '../types';

import Core from '../core';
import { ChartArea, LabelsArea, ValuesArea, WhiteArea, CursorArea } from '../areas';

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
        
        if(data.datasets.length > 0){
            data.datasets.forEach((dataset: Dataset) => {
                if(!dataset.data){
                    throw Error('Property data is required in each dataset')
                }
                if(dataset.data){
                    if(dataset.data.length == 0){
                        throw Error('Property data can not be an empty array')
                    }
                }
                
            })
        }
        
        this.core = new Core({ctx: this.ctx, data, inputOptions: options})

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

    destroy(){
        this.core.stop();
    }
}

export default Chart;