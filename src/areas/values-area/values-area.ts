import { Area } from '../../area';
import { Data, Options, AreaDrawProps } from '../../types';

export class ValuesArea extends Area {
    constructor(ctx: CanvasRenderingContext2D, data: Data, options: Options){
        super(ctx, data, options)
    }

    draw({ basePoint, width, height, gridOpt }: AreaDrawProps) {
        this.basePoint = basePoint;
        this.width = width;
        this.height = height;
        this.gridOpt = gridOpt;
        
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