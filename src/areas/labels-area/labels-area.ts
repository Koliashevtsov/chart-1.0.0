import { Options, LabelsAreaDrawProps } from '../../types';

import { Area } from '../../area/area';

export class LabelsArea extends Area {
    constructor(ctx: CanvasRenderingContext2D, options: Options){
        super(ctx, options)
    }

    draw({ basePoint, width, height, gridOpt, labels }: LabelsAreaDrawProps ){
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
        this.drawLabelTexts(labels)
    }
}