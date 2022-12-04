import { Area } from '../../area';
import { Options, ValuesAreaDrawProps } from '../../types';

export class ValuesArea extends Area {
    constructor(ctx: CanvasRenderingContext2D, options: Options){
        super(ctx, options)
    }

    draw({ basePoint, width, height, gridOpt, datasets }: ValuesAreaDrawProps) {
        this.basePoint = basePoint;
        this.width = width;
        this.height = height;
        this.gridOpt = gridOpt;
        
        const valuesSet: Set<string> = new Set();
        datasets.forEach(dataset  => dataset.data.forEach(value => valuesSet.add(value)))
        const values = Array.from(valuesSet).sort();
        
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
        this.drawValueTexts(values)
    }
}