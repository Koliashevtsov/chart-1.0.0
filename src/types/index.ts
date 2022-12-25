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
    initialize: () => void;
    update: () => void;
    render: () => void;
    draw: () => void;
}
type TConfig = {
    ctx: CanvasRenderingContext2D;
    data: Data;
    options: Options;
    basePoint: Point;
    clientRect: ClientRectType;
    areasSizes: ASizes;
    areasPoints: APoints;
    gridOpt: GridOpt;
    offset: Offset;
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
type AreaDimentions = {
    width: number;
    height: number;
}
type ASizes = {
    chart: AreaDimentions;
    labels: AreaDimentions;
    values: AreaDimentions;
}
type APoints = {
    chart: Point;
    labels: Point;
    values: Point;
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
    options: Options
}
type AreaDrawProps = {
    basePoint: Point;
}

type Couples = {
    from: Point;
    to: Point;
}

// enums
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
    TConfig,
    Point,
    ASizes,
    APoints,
    Offset,
    GridOpt,
    DrawingInitProps,
    AreaDrawProps,
    ClientRectType,
    Couples,
    Color
}