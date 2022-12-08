import { Area } from '../../area/';

import { AreaDrawProps, Data, Options } from '../../types';

export class ChartArea extends Area {
    constructor(ctx: CanvasRenderingContext2D, data: Data, options: Options){
        super(ctx, data, options)
    }

    draw({ basePoint, width, height, gridOpt }: AreaDrawProps){
        this.basePoint = basePoint;
        this.width = width;
        this.height = height;
        this.gridOpt = gridOpt;

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
