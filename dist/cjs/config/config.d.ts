import { APoints, ASizes, ClientRectType, Data, GridOpt, Offset, Options, Point, IConfig, PrivateConfig, ConfigProps, HoverConfUpd, TTooltips, HorScrolPlugUpd } from '../types';
declare class Config implements IConfig {
    _config: PrivateConfig;
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
    tooltips: TTooltips;
    constructor();
    initialize({ ctx, data, inputOptions }: ConfigProps): void;
    private _initConfig;
    private _unzipProps;
    update(updater: HoverConfUpd | HorScrolPlugUpd): void;
    private _getOptions;
    private _getAreasSizes;
    private _getAreasPoints;
    private _getGridOpt;
    private _getTooltips;
}
export default Config;
