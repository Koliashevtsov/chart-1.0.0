import { AreaDrawProps, AreaInitProps } from '../../types';

import { Area } from '../../area/area';

export class LabelsArea extends Area {
    constructor({ctx, data, height, width, gridOpt, options}: AreaInitProps){
        super({ctx, data, height, width, gridOpt, options})
    }

    draw({ basePoint }: AreaDrawProps ){
        this.basePoint = basePoint;

        const labelsArea = new Path2D();
        labelsArea.rect(
            this.basePoint.pointX,
            this.basePoint.pointY,
            this.width,
            this.height
        )
        this.ctx.fillStyle = this.options.backgroundColor;
        this.ctx.fill(labelsArea);
        this.ctx.save();
        // drawing vertical marks for labels
        this.drawLabelMarks()
        this.drawLabelTexts()
    }
}