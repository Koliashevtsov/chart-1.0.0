import { Area } from '../../area/';

import { ChartAreaDrawProps, Options } from '../../types';

export class ChartArea extends Area {
    constructor(ctx: CanvasRenderingContext2D, options: Options){
        super(ctx, options)
    }

    draw({ basePoint, width, height, gridOpt }: ChartAreaDrawProps){
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
    }
}
