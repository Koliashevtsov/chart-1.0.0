import { Observable } from '../utils';

// types
type Dataset = {
    data: Array<string> | [];
}

type Data = {
    datasets: Array<Dataset>;
    labels: Array<string> | [];
}
type TStyle = {
    backgroundColor?: Color | string,
    color?: Color | string,
    lineWidth?: number;
    font?: string;
    colors?: Array<string>
}
type TStyles = {
    chart: TStyle,
    grid: TStyle,
    labels: TStyle,
    values: TStyle,
    boundary: TStyle,
    cursor: TStyle
}
type TPointPath = {
    path: Path2D,
    coordinates: Point;
    value: string;
}
type TState = {
    pointsPath: Array<TPointPath>
}
type DefOptions = {
    horizontalScrolling: false;
    styles: TStyles;
}
type TDefGridOpt = {
    yScale: number;
}

type Options = {
    horizontalScrolling: {labelsStep: number} | false;
    styles: TStyles;
}
type InputOptions = {
    horizontalScrolling?: {labelsStep: number};
    styles?: {
        chart?: TStyle;
        grid?: TStyle;
        labels?: TStyle;
        values?: TStyle;
        boundary?: TStyle;
        cursor?: TStyle;
      };
}

type InitSettings = {
    data: Data,
    options?: InputOptions
}
type TObserver = {
    id: string;
    initialize: (config: TConfig) => void;
    update: (config: TConfig) => void;
    render: () => void;
    clear: () => void;
}
type TController = {
    observable: Observable;
    add: (area: TObserver) => void;
    initialize: (config: TConfig) => void;
    render: () => void;
    update: (config: TConfig) => void;
    clear: () => void;
}
type TValueTab = {
    isOpen: boolean;
    value: string;
    width: number;
    height: number;
}
type NotifyFull = {
    message: Message;
    config: TConfig;
}
type ConfigProps = {
    ctx: CanvasRenderingContext2D;
    data: Data;
    inputOptions: InputOptions;
};
type TConfig = {
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
    update: (updater: PanConfUpd | HoverConfUpd) => void;
}
type Point = {
    pointX: number;
    pointY: number;
}
type Offset = {
    distanceX: number;
    distanceY: number;
}
// areas types
type TDefSizes = {
    verticalAxisWidth: number;
    horizontalAxisHeight: number;
}
type AreaDimentions = {
    width: number;
    height: number;
}
type ASizes = {
    chart: AreaDimentions;
    labels: AreaDimentions;
    values: AreaDimentions;
    white: AreaDimentions;
    cursor: AreaDimentions;
}
type APoints = {
    chart: Point;
    labels: Point;
    values: Point;
    white: Point;
    cursor: Point;
}
type ClientRectType = {
    x: number;
    y: number;
    width: number;
    height: number;
}
type GridOpt = {
    absoluteValues: number[];
    absValueInOnePixel: number;
    absOffsetY: number;
    verticalLinesCount: number;
    horizontalLinesCount: number;
    verticalStep: number;
    horizontalStep: number;
}
type DrawingInitProps = {
    ctx: CanvasRenderingContext2D;
    data: Data;
    height: number;
    width: number;
    basePoint: Point;
    gridOpt: GridOpt;
    options: Options;
    cursorPoint: Point;
    isCursorArea: boolean;
    valueTab: TValueTab;
}
type AreaDrawProps = {
    basePoint: Point;
}

type Couples = {
    from: Point;
    to: Point;
}
type CustomEventListener = {
    bindEvents: () => void;
}
type ListenerProps = {
    ctx: CanvasRenderingContext2D;
    controller: TController;
    config: TConfig;
}
type PanConfUpd = {
    offset: Offset;
    areasPoints: APoints
}
type HoverConfUpd = {
    cursorPoint: Point;
    isCursorArea: boolean;
    valueTab: TValueTab;
}

// enums
enum Message {
    INITIALIZE = 'INITIALIZE',
    RENDER = 'RENDER',
    UPDATE = 'UPDATE',
    CLEAR = 'CLEAR'
};
enum Color {
    Grey = '#696969',
    Orange = '#edbb99',
    White = '#ffffff',
    Purple = '#9F2B68',
    Blue = '#00a2ed'
}

export {
    Data,
    DefOptions,
    TDefGridOpt,
    Options,
    InputOptions,
    InitSettings,
    TObserver,
    ConfigProps,
    TConfig,
    TController,
    TPointPath,
    TState,
    TValueTab,
    Point,
    TDefSizes,
    ASizes,
    APoints,
    Offset,
    GridOpt,
    DrawingInitProps,
    AreaDrawProps,
    ClientRectType,
    Couples,
    Message,
    Color,
    NotifyFull,
    CustomEventListener,
    ListenerProps,
    PanConfUpd,
    HoverConfUpd
}