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
    verticalLinesCount: number;
    horizontalLinesCount: number;
    verticalStep: number;
    horizontalStep: number;
}
type ChartAreaDrawProps = {
    basePoint: Point;
    width: number;
    height: number;
    gridOpt: GridOpt
}
type LabelsAreaDrawProps = {
    basePoint: Point;
    width: number;
    height: number;
    gridOpt: GridOpt;
    labels: Array<string>;
}
type ValuesAreaDrawProps = {
    basePoint: Point;
    width: number;
    height: number;
    gridOpt: GridOpt;
    datasets: Array<Dataset>
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
    ChartAreaDrawProps,
    LabelsAreaDrawProps,
    ValuesAreaDrawProps,
    Couples,
    Color
}