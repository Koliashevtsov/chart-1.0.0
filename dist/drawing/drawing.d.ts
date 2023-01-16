import { GridOpt, Options, Point, Data, DrawingInitProps, TPointPath, TValueTab } from '../types';
export declare class Drawing {
    ctx: CanvasRenderingContext2D;
    data: Data;
    options: Options;
    basePoint: Point;
    width: number;
    height: number;
    gridOpt: GridOpt;
    cursorPoint: Point;
    isCursorArea: boolean;
    valueTab: TValueTab;
    constructor({ ctx, data, height, width, basePoint, gridOpt, options, cursorPoint, isCursorArea, valueTab }: DrawingInitProps);
    drawBackground(): void;
    drawGrid(): void;
    drawLabelMarks(): void;
    drawLabelTexts(): void;
    drawValueMarks(): void;
    drawValueTexts(): void;
    drawChart(): Array<TPointPath>;
    drawVisibleChartBoundaries(): void;
    drawIntersection(): void;
    clear(): void;
}
