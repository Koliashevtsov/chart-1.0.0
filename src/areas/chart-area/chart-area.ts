import { Drawing } from '../../drawing';

import { TObserver, TConfig} from '../../types';

export class ChartArea implements TObserver {
    id: string;
    drawing: Drawing;

    constructor(config: TConfig){
        this.id = '0'
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

    draw(){
        this.drawing.drawBackground()
        // draw grid
        this.drawing.drawGrid();
        // draw chart
        this.drawing.drawChart();
    }

    initialize(){

    }

    render(){
        this.draw()
    }

    update(){
        this.render()
    }
}
