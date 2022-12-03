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
    pointX: number,
    pointY: number
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
    Couples,
    Color
}