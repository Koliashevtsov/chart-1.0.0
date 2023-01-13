import { GridOpt, Options, Point, Couples, Data, DrawingInitProps, TPointPath } from '../types';

import { 
    verticalCouplesPoint, 
    horizontalCouplesPoint, 
    pointsForLabels,
    pointsForValues,
    labelTextAlign,
    valueTextBaseline,
    pointsPathForChart
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
    isCursorArea: boolean;

    constructor({ctx, data, height, width, basePoint, gridOpt, options, cursorPoint, isCursorArea}: DrawingInitProps){
        this.ctx = ctx;
        this.data = data;
        this.options = options;
        this.width = width;
        this.height = height;
        this.gridOpt = gridOpt;
        this.basePoint = basePoint;
        this.cursorPoint = cursorPoint;
        this.isCursorArea = isCursorArea;
    }

    drawBackground(){
        const background = new Path2D();
        background.rect(
            this.basePoint.pointX,
            this.basePoint.pointY,
            this.width,
            this.height
        )
        this.ctx.fillStyle = this.options.styles.chart.backgroundColor;
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
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.moveTo(couple.from.pointX, couple.from.pointY);
                this.ctx.lineTo(couple.to.pointX, couple.to.pointY);
                this.ctx.strokeStyle = this.options.styles.grid.color;
                this.ctx.lineWidth = this.options.styles.grid.lineWidth;
                this.ctx.stroke();
                this.ctx.restore();
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
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.moveTo(couple.from.pointX, couple.from.pointY);
                this.ctx.lineTo(couple.to.pointX, couple.to.pointY);
                this.ctx.strokeStyle = this.options.styles.grid.color;
                this.ctx.lineWidth = this.options.styles.grid.lineWidth;
                this.ctx.stroke();
                this.ctx.restore();
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
                this.ctx.save()
                this.ctx.beginPath();
                this.ctx.moveTo(couple.from.pointX, couple.from.pointY);
                this.ctx.lineTo(couple.to.pointX, couple.to.pointY);
                this.ctx.strokeStyle = this.options.styles.labels.color;
                this.ctx.lineWidth = this.options.styles.labels.lineWidth;
                this.ctx.stroke();
                this.ctx.restore()
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
                this.ctx.save();
                this.ctx.font = this.options.styles.labels.font;
                this.ctx.fillStyle = this.options.styles.labels.color;
                this.ctx.textAlign = labelTextAlign(points, index);
                this.ctx.fillText(labels[index], point.pointX, point.pointY);
                this.ctx.restore();
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
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.moveTo(couple.from.pointX, couple.from.pointY);
                this.ctx.lineTo(couple.to.pointX, couple.to.pointY);
                this.ctx.strokeStyle = this.options.styles.values.color;
                this.ctx.lineWidth = this.options.styles.values.lineWidth;
                this.ctx.stroke();
                this.ctx.restore();
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
                this.ctx.save();
                this.ctx.font = this.options.styles.values.font;
                this.ctx.fillStyle = this.options.styles.values.color;
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = valueTextBaseline(points, index);
                this.ctx.fillText(String(values[index]), point.pointX, point.pointY);
                this.ctx.restore();
            })
        }
    }

    drawChart(): Array<TPointPath>{
        const pointsPathList: Array<TPointPath> = []

        this.data.datasets.forEach((dataset, index) => {
            // get points for each dataset
            const pointsPath = pointsPathForChart(
                dataset.data, 
                this.basePoint, 
                this.height, 
                this.gridOpt.verticalStep, 
                this.gridOpt.absValueInOnePixel,
                this.gridOpt.absOffsetY
            );
            
            const [startingPointPath, ...otherPointsPath] = pointsPath;
            // draw lines
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.moveTo(
                startingPointPath.coordinates.pointX, 
                startingPointPath.coordinates.pointY
            );
            otherPointsPath.forEach(point => this.ctx.lineTo(
                point.coordinates.pointX, 
                point.coordinates.pointY
                ));
            this.ctx.strokeStyle = this.options.styles.chart.colors[index];
            this.ctx.lineWidth = this.options.styles.chart.lineWidth;
            this.ctx.stroke();
            this.ctx.restore();

            // draw circles
            const radius = 3;
            
            pointsPath.forEach(point => {
                this.ctx.save();
                this.ctx.beginPath();
                // using path in order to save info about points
                const path = point.path;
                path.arc(point.coordinates.pointX, point.coordinates.pointY, radius, 0, 2 * Math.PI);
                this.ctx.fillStyle = this.options.styles.chart.colors[index];
                this.ctx.fill(path);
                this.ctx.restore();
            })
            // push paths from each dataset
            pointsPathList.push(...pointsPath)
        })

        return pointsPathList;
    }

    drawVisibleChartBoundaries(){
        this.ctx.save();
        this.ctx.strokeStyle = this.options.styles.boundary.color;
        this.ctx.lineWidth = this.options.styles.boundary.lineWidth;
        this.ctx.strokeRect(this.basePoint.pointX, this.basePoint.pointY, this.width, this.height)
        this.ctx.restore();
    }

    drawIntersection(){
        if(!this.isCursorArea){
            return
        }

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
        this.ctx.strokeStyle = this.options.styles.cursor.color;
        this.ctx.lineWidth = this.options.styles.cursor.lineWidth;
        this.ctx.beginPath();
        this.ctx.setLineDash([10, 12]);
        // vertical line
        this.ctx.moveTo(top.pointX, top.pointY);
        this.ctx.lineTo(bottom.pointX, bottom.pointY);
        // horizontal line
        this.ctx.moveTo(left.pointX, left.pointY);
        this.ctx.lineTo(right.pointX, right.pointY);
        this.ctx.stroke();
        this.ctx.restore();
    }

    clear(){
        this.ctx.clearRect(this.basePoint.pointX, this.basePoint.pointY, this.width, this.height);
    }
}