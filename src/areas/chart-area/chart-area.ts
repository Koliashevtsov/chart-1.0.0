import { Drawing } from '../../drawing';

import { TObserver, TConfig} from '../../types';

export class ChartArea implements TObserver {
    id: string;
    drawing: Drawing;

    constructor(){
        this.id = '0'
        this.drawing = null;
    }

    draw(){
        this.drawing.drawBackground()
        // draw grid
        this.drawing.drawGrid();
        // draw chart
        this.drawing.drawChart();
    }

    initialize(config: TConfig){
        this.drawing = new Drawing({
            ctx: config.ctx, 
            data: config.data, 
            height: config.areasSizes.chart.height, 
            width: config.areasSizes.chart.width,
            basePoint: config.areasPoints.chart, 
            gridOpt: config.gridOpt, 
            options: config.options
        })
    }

    render(){
        this.draw()
    }

    update(){
        this.render()
    }
}
