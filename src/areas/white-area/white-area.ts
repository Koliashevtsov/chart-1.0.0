import { Drawing } from '../../drawing';

import { TObserver, TConfig } from '../../types';

// white area exist in order to get base chart offset and can be used as axes borders
export class WhiteArea implements TObserver{
    id: string;
    drawing: Drawing;

    constructor(){
        this.id = '3';
        this.drawing = null;
    }

    private _draw() {
        this.drawing.drawVisibleChartBoundaries()
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
        this.render();
    }

    private _createDrawing(config: TConfig){
        this.drawing = new Drawing({
            ctx: config.ctx, 
            data: config.data, 
            height: config.areasSizes.white.height, 
            width: config.areasSizes.white.width,
            basePoint: config.areasPoints.white, 
            gridOpt: config.gridOpt, 
            options: config.options
        })
    }
}
