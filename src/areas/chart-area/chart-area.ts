import { Area } from '../../area/';

import { AreaDrawProps, AreaInitProps } from '../../types';

export class ChartArea extends Area {
    constructor({ctx, data, height, width, gridOpt, options}: AreaInitProps){
        super({ctx, data, height, width, gridOpt, options})
    }

    draw({ basePoint }: AreaDrawProps){
        this.basePoint = basePoint;

        const chartArea = new Path2D();
        
        // draw rectangle
        chartArea.rect(
            this.basePoint.pointX, 
            this.basePoint.pointY, 
            this.width, 
            this.height
        );
        this.ctx.fillStyle = this.options.backgroundColor;
        this.ctx.fill(chartArea);
        this.ctx.save();
            
        // draw grid
        this.drawGrid();
        // draw chart
        this.drawChart();
    }
}
