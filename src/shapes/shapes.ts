import { Color, Point } from '../types';

const renderViewport = ({pointX, pointY}: Point, ctx: CanvasRenderingContext2D) => {
    const { width, height } = ctx.canvas.getBoundingClientRect();
    
    ctx.fillStyle = Color.Grey;
    ctx.strokeRect(pointX, pointY, width, height);
}

const renderChartArea = ({pointX, pointY}: Point , ctx: CanvasRenderingContext2D) => {
    const { width, height } = ctx.canvas.getBoundingClientRect();
    
    const chartArea = new Path2D();
    chartArea.rect(pointX, pointY, width, height)

    ctx.fillStyle = Color.Orange;
    ctx.fill(chartArea);
}

export {
    renderChartArea,
    renderViewport
}