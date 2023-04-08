import { Observable } from '../utils';

// types
type Dataset = {
    data: string[];
}

type ExtendedDataset =  {
    data: string[];
    color: string;
    name: string;
}

type Data = {
    datasets: Dataset[] | ExtendedDataset[];
    labels: string[];
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
    name: string;
    value: string;
    label: string;
}
type TState = {
    pointsPath: Array<TPointPath>
}
type DefOptions = {
    styles: TStyles;
}
type TDefGridOpt = {
    yScale: number;
}

type Options = {
    styles: TStyles;
}
type InputOptions = {
    styles?: {
        chart?: TStyle;
        grid?: TStyle;
        labels?: TStyle;
        values?: TStyle;
        boundary?: TStyle;
        cursor?: TStyle;
    };
}
type HorizontalScrollingInputProp = {
    scrolling: number
}
type DateTimeLabelsInputProp = {
    startDate: string;
    finishDate: string;
}
type InputPlugin = {
    id: string;
    prop: HorizontalScrollingInputProp | DateTimeLabelsInputProp;
}

type InitSettings = {
    data: Data;
    options?: InputOptions;
    plugins?: InputPlugin[];
}
type TObserver = {
    id: string;
    initialize: (config: IConfig) => void;
    update: (config: IConfig) => void;
    render: () => void;
    clear: () => void;
}
type TController = {
    observable: Observable;
    add: (area: TObserver) => void;
    initialize: (config: IConfig) => void;
    render: () => void;
    update: (config: IConfig) => void;
    clear: () => void;
}
type TooltipTab = {
    title: string | null;
    width: number;
    height: number;
}
type TTooltips = {
    name: TooltipTab,
    value: TooltipTab,
    label: TooltipTab
}
type NotifyFull = {
    message: Message;
    config: IConfig;
}
type CoreProps = {
    ctx: CanvasRenderingContext2D;
    data: Data;
    inputOptions: InputOptions;
    inputPlugins: InputPlugin[]
};
type ConfigProps = {
    ctx: CanvasRenderingContext2D;
    data: Data;
    inputOptions: InputOptions;
};
type IPluginProps = HorizontalScrollingInputProp | DateTimeLabelsInputProp; 

interface IPlugin {
    id: string;
    props: IPluginProps;
    config: IConfig;
    eventHandler?: CustomEventHandler | null
    init: (props: IPluginProps, config: IConfig) => void;
    getConfig: () => IConfig;
}
interface IPlugins {
    registeredPlugins: IPlugin[]
    config: IConfig;
    getConfig: () => IConfig
}
type PrivateConfig = {
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
}
interface IConfig {
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
    update: (updater: HoverConfUpd | HorScrolPlugUpd) => void;
    initialize: (props: ConfigProps) => void;
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
    nameTabWidth: number;
    nameTabHeight: number;
    valueTabWidth: number;
    valueTabHeight: number;
    labelTabWidth: number;
    labelTabHeight: number;
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
    tooltips: TTooltips;
}
type AreaDrawProps = {
    basePoint: Point;
}

type Couples = {
    from: Point;
    to: Point;
}
type CustomEventHandler = {
    initialize: (props: InitHandlerProps) => void;
    bindEvents: () => void;
    unbindEvents: () => void;
}
type InitHandlerProps = {
    controller: TController;
    config: IConfig;
}
type HoverConfUpd = {
    cursorPoint: Point;
    isCursorArea: boolean;
    tooltips: TTooltips;
}
type HorScrolPlugUpd = {
    offset: Offset;
    areasPoints: APoints;
    data?: Data;
    areasSizes?: ASizes;
    gridOpt?: GridOpt
}

type HorScrolPlugOptions = {
    originalConfig: IConfig;
    labelsStep: number;
    labelsOffset: number;
}

// enums
enum Message {
    INITIALIZE = 'INITIALIZE',
    RENDER = 'RENDER',
    UPDATE = 'UPDATE',
    CLEAR = 'CLEAR'
}
enum Color {
    Grey = '#696969',
    Orange = '#edbb99',
    White = '#ffffff',
    Purple = '#9F2B68',
    Blue = '#00a2ed'
}

export {
    Dataset,
    ExtendedDataset,
    Data,
    DefOptions,
    TDefGridOpt,
    Options,
    InputOptions,
    InputPlugin,
    HorizontalScrollingInputProp,
    DateTimeLabelsInputProp,
    InitSettings,
    TObserver,
    CoreProps,
    ConfigProps,
    PrivateConfig,
    IConfig,
    TController,
    IPlugins,
    IPlugin,
    IPluginProps,
    TPointPath,
    TState,
    TTooltips,
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
    CustomEventHandler,
    InitHandlerProps,
    HoverConfUpd,
    HorScrolPlugUpd,
    HorScrolPlugOptions
}