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
}

type Options = {
    backgroundColor?: string;
    color?: string;
}

type InitSettings = {
    data: Data,
    options?: Options
}

type Point = {
    pointX: number;
    pointY: number;
}
// areas types
type GridOpt = {
    absoluteValues: number[];
    absValueInOnePixel: number;
    absOffsetY: number;
    verticalLinesCount: number;
    horizontalLinesCount: number;
    verticalStep: number;
    horizontalStep: number;
}
type AreaDrawProps = {
    basePoint: Point;
    width: number;
    height: number;
    gridOpt: GridOpt;
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
    InitSettings,
    Point,
    GridOpt,
    AreaDrawProps,
    Couples,
    Color
}