import { GridOpt, Options, Point, Couples } from '../types';

import { 
    verticalCouplesPoint, 
    horizontalCouplesPoint, 
    pointsForLabels,
    pointsForValues,
    labelTextAlign,
    valueTextBaseline
} from '../helpers';

export class Area {
    ctx: CanvasRenderingContext2D;
    options: Options
    basePoint: Point;
    width: number;
    height: number;
    gridOpt: GridOpt;

    constructor(ctx: CanvasRenderingContext2D, options: Options){
        this.ctx = ctx;
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
            {pointX: this.width, pointY: this.basePoint.pointY},
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

    drawLabelTexts(labels: Array<string>){
        const offsetText = 20;
        const bPoint = {pointX: this.basePoint.pointX, pointY: this.basePoint.pointY + offsetText}
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

    drawValueTexts(values: Array<string>){
        const offsetText = 20;
        const bPoint = {pointX: this.basePoint.pointX + offsetText, pointY: this.basePoint.pointY};
        const points = pointsForValues(bPoint, this.gridOpt);
        if(points.length > 0){
            points.forEach((point, index) => {
                this.ctx.font = '14px Arial';
                this.ctx.fillStyle = 'red';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = valueTextBaseline(points, index);
                this.ctx.fillText(values[index], point.pointX, point.pointY);
            })
        }
    }
}