import { Drawing } from '../../drawing';

import { TObserver, TConfig } from '../../types';

export class ValuesArea implements TObserver {
    id: string;
    drawing: Drawing;

    constructor(){
        this.id = '2';
        this.drawing = null;
    }

    private _draw() {
        this.drawing.drawBackground()
        //drawing horizontal marks for values
        this.drawing.drawValueMarks();
        this.drawing.drawValueTexts()
    }

    private _clear(){
        this.drawing.clear()
    }

    initialize(config: TConfig){
        this._createDrawing(config);
    }

    render(){
        this._draw()
    }

    update(config: TConfig){
        this._createDrawing(config);
        this._clear();
        this.render();
    }

    private _createDrawing(config: TConfig){
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
}