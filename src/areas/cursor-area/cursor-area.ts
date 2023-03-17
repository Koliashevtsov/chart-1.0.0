import { Drawing } from '../../drawing';

import { TObserver, IConfig } from '../../types';

export class CursorArea implements TObserver {
    id: string;
    drawing: Drawing;

    constructor(){
        this.id = '4'
        this.drawing = null;
    }

    private _draw(){
        this.drawing.drawIntersection();
    }

    clear(){
        this.drawing.clear()
    }

    initialize(config: IConfig){
        this._createDrawing(config);
    }

    render(){
        this._draw()
    }

    update(config: IConfig){
        this._createDrawing(config);
        this.render()
    }

    private _createDrawing(config: IConfig){
        this.drawing = new Drawing({
            ctx: config.ctx, 
            data: config.data, 
            height: config.areasSizes.cursor.height, 
            width: config.areasSizes.cursor.width,
            basePoint: config.areasPoints.cursor, 
            gridOpt: config.gridOpt, 
            options: config.options,
            cursorPoint: config.cursorPoint,
            isCursorArea: config.isCursorArea,
            tooltips: config.tooltips
        })
    }
}