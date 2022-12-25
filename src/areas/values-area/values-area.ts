import { Drawing } from '../../drawing';

import { TObserver, TConfig } from '../../types';

export class ValuesArea implements TObserver {
    id: string;
    drawing: Drawing;

    constructor(config: TConfig){
        this.id = '2';
        this.drawing = new Drawing({
            ctx: config.ctx, 
            data: config.data, 
            height: config.areasSizes.values.height, 
            width: config.areasSizes.values.width,
            basePoint: config.areasPoints.values, 
            gridOpt: config.gridOpt, 
            options: config.options
        })
    }

    draw() {
        this.drawing.drawBackground()
        //drawing horizontal marks for values
        this.drawing.drawValueMarks();
        this.drawing.drawValueTexts()
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