import { Drawing } from '../../drawing';
import state  from '../../state/state';

import { TObserver, TConfig} from '../../types';

export class ChartArea implements TObserver {
    id: string;
    drawing: Drawing;

    constructor(){
        this.id = '0'
        this.drawing = null;
    }

    private _draw(){
        this.drawing.drawBackground()
        // draw grid
        this.drawing.drawGrid();
        // draw chart
        const pointsPath = this.drawing.drawChart();
        // and write points path to state
        state.setState({pointsPath})
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
            height: config.areasSizes.chart.height, 
            width: config.areasSizes.chart.width,
            basePoint: config.areasPoints.chart, 
            gridOpt: config.gridOpt, 
            options: config.options,
            cursorPoint: config.cursorPoint,
            isCursorArea: config.isCursorArea
        })
    }
}
