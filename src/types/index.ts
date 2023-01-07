import { Observable } from '../utils';

// types
type Dataset = {
    data: Array<string> | [];
}

type Data = {
    datasets: Array<Dataset>;
    labels: Array<string> | [];
}

type DefOptions = {
    backgroundColor: string;
    color: string;
    horizontalScrolling: false;
}

type Options = {
    backgroundColor: string;
    color: string;
    horizontalScrolling: {labelsStep: number} | false;
}
type InputOptions = {
    backgroundColor?: string;
    color?: string;
    horizontalScrolling?: {labelsStep: number};
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
    areasPoint: APoints
}
type HoverConfUpd = {
    cursorPoint: Point;
    isCursorArea: boolean;
}

// enums
enum Message {
    INITIALIZE = 'INITIALIZE',
    RENDER = 'RENDER',
    UPDATE = 'UPDATE',
    CLEAR = 'CLEAR'
};
enum Color {
    Grey = '#34495e',
    Orange = '#edbb99'
}

export {
    Data,
    DefOptions,
    Options,
    InputOptions,
    InitSettings,
    TObserver,
    ConfigProps,
    TConfig,
    TController,
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