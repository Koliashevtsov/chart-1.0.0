import { Point, Color } from '../types';

type ShapeConstructor = {
    context: CanvasRenderingContext2D
}

class Shape {
    ctx: CanvasRenderingContext2D;

    constructor({context}: ShapeConstructor){
        this.ctx = context;
    } 

    renderViewport(x: number, y: number) {
        const { width, height } = this.ctx.canvas.getBoundingClientRect();

        this.ctx.fillStyle = Color.Grey;
        this.ctx.strokeRect(x, y, width, height);
    }

    renderChartArea (x: number, y: number) {
        console.log(`renderingChartArea, X - ${x}, Y - ${y}`);
        
        const { width, height } = this.ctx.canvas.getBoundingClientRect();
        
        const chartArea = new Path2D();
        chartArea.rect(
            x, 
            y, 
            width, 
            height
        );
        this.ctx.fillStyle = Color.Orange;
        this.ctx.fill(chartArea);
    }

}

export default Shape