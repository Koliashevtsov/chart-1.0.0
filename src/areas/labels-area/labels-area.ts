import { Options, AreaDrawProps, Data } from '../../types';

import { Area } from '../../area/area';

export class LabelsArea extends Area {
    constructor(ctx: CanvasRenderingContext2D, data: Data, options: Options){
        super(ctx, data, options)
    }

    draw({ basePoint, width, height, gridOpt }: AreaDrawProps ){
        this.basePoint = basePoint;
        this.width = width;
        this.height = height;
        this.gridOpt = gridOpt;

        const labelsArea = new Path2D();
        labelsArea.rect(
            this.basePoint.pointX,
            this.basePoint.pointY,
            width,
            height
        )
        this.ctx.fillStyle = this.options.backgroundColor;
        this.ctx.fill(labelsArea);
        this.ctx.save();
        // drawing vertical marks for labels
        this.drawLabelMarks()
        this.drawLabelTexts()
    }
}