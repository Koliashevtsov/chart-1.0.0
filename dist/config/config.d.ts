import { APoints, ASizes, ClientRectType, Data, GridOpt, Offset, Options, Point, TConfig, ConfigProps, PanConfUpd, HoverConfUpd, TValueTab } from '../types';
declare class Config implements TConfig {
    _config: {
        ctx: CanvasRenderingContext2D;
        data: Data;
        options: Options;
        basePoint: Readonly<{
            pointX: number;
            pointY: number;
        }>;
        clientRect: DOMRect;
        areasSizes: {
            chart: {
                width: number;
                height: number;
            };
            labels: {
                width: number;
                height: number;
            };
            values: {
                width: number;
                height: number;
            };
            white: {
                width: number;
                height: number;
            };
            cursor: {
                width: number;
                height: number;
            };
        };
        offset: Offset;
        areasPoints: {
            chart: {
                pointX: number;
                pointY: number;
            };
            labels: {
                pointX: number;
                pointY: number;
            };
            values: {
                pointX: number;
                pointY: number;
            };
            white: {
                pointX: number;
                pointY: number;
            };
            cursor: {
                pointX: number;
                pointY: number;
            };
        };
        gridOpt: {
            absoluteValues: number[];
            absValueInOnePixel: number;
            absOffsetY: number;
            verticalLinesCount: number;
            horizontalLinesCount: number;
            verticalStep: number;
            horizontalStep: number;
        };
        cursorPoint: {
            pointX: number;
            pointY: number;
        };
        isCursorArea: boolean;
        valueTab: {
            isOpen: boolean;
            value: string;
            width: number;
            height: number;
        };
    };
    ctx: CanvasRenderingContext2D;
    data: Data;
    options: Options;
    basePoint: Point;
    clientRect: ClientRectType;
    areasSizes: ASizes;
    offset: Offset;
    areasPoints: APoints;
    gridOpt: GridOpt;
    cursorPoint: Point;
    isCursorArea: boolean;
    valueTab: TValueTab;
    constructor({ ctx, data, inputOptions }: ConfigProps);
    private _initConfig;
    private _unzipProps;
    update(updater: PanConfUpd | HoverConfUpd): void;
    private _getOptions;
    private _getAreasSizes;
    private _getAreasPoints;
    private _getGridOpt;
    private _getValueTab;
    private _scrollToFinishOffset;
}
export default Config;
