import { Drawing } from '../../drawing/drawing';

import { TObserver, TConfig } from '../../types';

export class LabelsArea implements TObserver{
    id: string;
    drawing: Drawing;

    constructor(){
        this.id = '1';
        this.drawing = null;
    }

    private _draw(){
        this.drawing.drawBackground();
        this.drawing.drawLabelMarks()
        this.drawing.drawLabelTexts()
    }

    clear(){
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
        this.render()
    }

    private _createDrawing(config: TConfig){
        this.drawing = new Drawing({
            ctx: config.ctx, 
            data: config.data, 
            height: config.areasSizes.labels.height, 
            width: config.areasSizes.labels.width,
            basePoint: config.areasPoints.labels, 
            gridOpt: config.gridOpt, 
            options: config.options,
            cursorPoint: config.cursorPoint
        })
    }
}