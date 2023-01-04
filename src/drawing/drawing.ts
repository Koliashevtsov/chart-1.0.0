import { GridOpt, Options, Point, Couples, Data, DrawingInitProps } from '../types';

import { 
    verticalCouplesPoint, 
    horizontalCouplesPoint, 
    pointsForLabels,
    pointsForValues,
    labelTextAlign,
    valueTextBaseline,
    pointsForChart
} from '../helpers';

export class Drawing {
    ctx: CanvasRenderingContext2D;
    data: Data;
    options: Options
    basePoint: Point;
    width: number;
    height: number;
    gridOpt: GridOpt;
    cursorPoint: Point;

    constructor({ctx, data, height, width, basePoint, gridOpt, options, cursorPoint}: DrawingInitProps){
        this.ctx = ctx;
        this.data = data;
        this.options = options;
        this.width = width;
        this.height = height;
        this.gridOpt = gridOpt;
        this.basePoint = basePoint;
        this.cursorPoint = cursorPoint;
    }

    drawBackground(){
        const background = new Path2D();
        background.rect(
            this.basePoint.pointX,
            this.basePoint.pointY,
            this.width,
            this.height
        )
        this.ctx.fillStyle = this.options.backgroundColor;
        this.ctx.fill(background);
        this.ctx.save();
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

    drawValueTexts(){
        const values = this.gridOpt.absoluteValues;
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

    drawVisibleChartBoundaries(){
        this.ctx.strokeStyle = 'blue';
        this.ctx.strokeRect(this.basePoint.pointX, this.basePoint.pointY, this.width, this.height)
    }

    drawIntersection(){
        const top: Point = {
            pointX: this.cursorPoint.pointX,
            pointY: this.basePoint.pointY
        }
        const bottom: Point = {
            pointX: this.cursorPoint.pointX,
            pointY: this.height
        }
        const left: Point = {
            pointX: this.basePoint.pointX,
            pointY: this.cursorPoint.pointY
        }
        const right: Point = {
            pointX: this.width,
            pointY: this.cursorPoint.pointY
        }

        this.ctx.save();
        this.ctx.strokeStyle = 'purple';
        this.ctx.beginPath();
        this.ctx.setLineDash([10, 12]);
        // vertical line
        this.ctx.moveTo(top.pointX, top.pointY);
        this.ctx.lineTo(bottom.pointX, bottom.pointY);
        // horizontal line
        this.ctx.moveTo(left.pointX, left.pointY);
        this.ctx.lineTo(right.pointX, right.pointY);
        this.ctx.stroke();
    }

    clear(){
        this.ctx.clearRect(this.basePoint.pointX, this.basePoint.pointY, this.width, this.height);
    }
}