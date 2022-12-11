import { GridOpt, Options, Point, Couples, Data } from '../types';

import { 
    verticalCouplesPoint, 
    horizontalCouplesPoint, 
    pointsForLabels,
    pointsForValues,
    labelTextAlign,
    valueTextBaseline,
    pointsForChart
} from '../helpers';

export class Area {
    ctx: CanvasRenderingContext2D;
    data: Data;
    options: Options
    basePoint: Point;
    width: number;
    height: number;
    gridOpt: GridOpt;

    constructor(ctx: CanvasRenderingContext2D, data: Data, options: Options){
        this.ctx = ctx;
        this.data = data;
        this.options = options;
        this.basePoint = null;
        this.width = 0;
        this.height = 0;
        this.gridOpt = null;
    }

    drawGrid(){
        // vertical lines
        const vertCouples = verticalCouplesPoint(
            this.basePoint, 
            {pointX: this.basePoint.pointX, pointY: this.width}, 
            this.gridOpt.verticalStep,
            this.gridOpt.verticalLinesCount
        )
        if(vertCouples.length > 0) {
            vertCouples.forEach((couple: Couples) => {
                this.ctx.beginPath();
                this.ctx.moveTo(couple.from.pointX, couple.from.pointY);
                this.ctx.lineTo(couple.to.pointX, couple.to.pointY);
                this.ctx.strokeStyle = 'green';
                this.ctx.stroke();
            })
        }
        // horizontal lines
        const horCouples = horizontalCouplesPoint(
            this.basePoint,
            {pointX: this.basePoint.pointX + this.width, pointY: this.basePoint.pointY},
            this.gridOpt.horizontalStep,
            this.gridOpt.horizontalLinesCount
        );
        if(horCouples.length > 0) {
            horCouples.forEach((couple: Couples) => {
                this.ctx.beginPath();
                this.ctx.moveTo(couple.from.pointX, couple.from.pointY);
                this.ctx.lineTo(couple.to.pointX, couple.to.pointY);
                this.ctx.strokeStyle = 'green';
                this.ctx.stroke();
            })
        }
    }

    drawLabelMarks(){
        const MARK_HEIGHT = 5;
        const pointCouples = verticalCouplesPoint(
            this.basePoint,
            {pointX: this.basePoint.pointX, pointY: this.basePoint.pointY + MARK_HEIGHT},
            this.gridOpt.verticalStep,
            this.gridOpt.verticalLinesCount);
        // draw lines by points
        if(pointCouples.length > 0) {
            pointCouples.forEach((couple: Couples) => {
                this.ctx.beginPath();
                this.ctx.moveTo(couple.from.pointX, couple.from.pointY);
                this.ctx.lineTo(couple.to.pointX, couple.to.pointY);
                this.ctx.strokeStyle = 'green';
                this.ctx.stroke();
            })
        }
    }

    drawLabelTexts(){
        const labels = this.data.labels;
        const offsetText = 20;
        const bPoint = {pointX: this.basePoint.pointX, pointY: this.basePoint.pointY + offsetText};
        
        const points = pointsForLabels(bPoint, this.gridOpt);
        
        if(points.length > 0){
            points.forEach((point, index) => {
                this.ctx.font = '14px Arial';
                this.ctx.fillStyle = 'red';
                this.ctx.textAlign = labelTextAlign(points, index);
                this.ctx.fillText(labels[index], point.pointX, point.pointY);
            })
        }
    }

    drawValueMarks(){
        const VALUE_WIDTH = 5;

        const pointCouples = horizontalCouplesPoint(
            this.basePoint,
            {pointX: this.basePoint.pointX + VALUE_WIDTH, pointY: this.basePoint.pointY},
            this.gridOpt.horizontalStep,
            this.gridOpt.horizontalLinesCount
        )
        // draw lines by points
        if(pointCouples.length > 0) {
            pointCouples.forEach((couple: Couples) => {
                this.ctx.beginPath();
                this.ctx.moveTo(couple.from.pointX, couple.from.pointY);
                this.ctx.lineTo(couple.to.pointX, couple.to.pointY);
                this.ctx.strokeStyle = 'green';
                this.ctx.stroke();
            })
        }
    }

    drawValueTexts(values: Array<number>){
        const offsetText = 20;
        const bPoint = {pointX: this.basePoint.pointX + offsetText, pointY: this.basePoint.pointY};
        const points = pointsForValues(bPoint, this.gridOpt);
        if(points.length > 0){
            points.forEach((point, index) => {
                this.ctx.font = '14px Arial';
                this.ctx.fillStyle = 'red';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = valueTextBaseline(points, index);
                this.ctx.fillText(String(values[index]), point.pointX, point.pointY);
            })
        }
    }

    drawChart(){
        this.data.datasets.forEach(dataset => {
            // get points for each dataset
            const points = pointsForChart(
                dataset.data, 
                this.basePoint, 
                this.height, 
                this.gridOpt.verticalStep, 
                this.gridOpt.absValueInOnePixel,
                this.gridOpt.absOffsetY
            );
            
            const [startingPoint, ...otherPoints] = points;
            // draw lines
            this.ctx.beginPath();
            this.ctx.moveTo(startingPoint.pointX, startingPoint.pointY);
            otherPoints.forEach(point => this.ctx.lineTo(point.pointX, point.pointY));
            this.ctx.fillStyle = 'grey';
            this.ctx.stroke();
        })
        
    }
}