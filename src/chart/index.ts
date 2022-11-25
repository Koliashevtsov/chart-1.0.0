import CanvasPart from '../canvas-part/';

type ChartConstructor = {
    context: CanvasRenderingContext2D
}


class Chart {
    ctx: CanvasRenderingContext2D;
    canvasPart: CanvasPart | null;

    constructor({ context }: ChartConstructor){
        this.ctx = context;
        this.canvasPart = null

        // bind this to loop method in order to use as requestAnimatedFrame callback
        this.loop = this.loop.bind(this)
    }

    private _render(){
        // clear canvas
        this._clear();
        // render all parts of canvas
        console.log('render');
        this.canvasPart.renderChartArea();
        this.canvasPart.renderViewport();
    }

    // private _update(){
    //     // first step - delete whole canvas
    //     this._clear();
    //     // second step - re-render whole canvas
    //     this._render();
    // }

    private _clear(){
        // clear all canvas
        const { width, height } = this.ctx.canvas.getBoundingClientRect();
        this.ctx.clearRect(0, 0, width, height);
    }

    

    init(){
        this.canvasPart = new CanvasPart({context: this.ctx});

        window.requestAnimationFrame(this.loop)
        
    }

    loop(){
        console.log('loop');
        console.log(this);
        
        this._render()

        window.requestAnimationFrame(this.loop)
        
    }
}

export default Chart;