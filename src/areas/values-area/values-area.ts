import { Area } from '../../area';
import { AreaInitProps, AreaDrawProps } from '../../types';

export class ValuesArea extends Area {
    constructor({ctx, data, height, width, gridOpt, options}: AreaInitProps){
        super({ctx, data, height, width, gridOpt, options})
    }

    draw({ basePoint }: AreaDrawProps) {
        this.basePoint = basePoint;
        
        const valuesArea = new Path2D();
        valuesArea.rect(
            this.basePoint.pointX,
            this.basePoint.pointY,
            this.width,
            this.height
        );
        this.ctx.fillStyle = this.options.backgroundColor;
        this.ctx.fill(valuesArea);
        this.ctx.save();
        //drawing horizontal marks for values
        this.drawValueMarks();
        this.drawValueTexts(this.gridOpt.absoluteValues)
    }
}