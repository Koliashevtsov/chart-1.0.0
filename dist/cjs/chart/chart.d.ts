import { InitSettings } from '../types';
import Core from '../core';
type ChartConstructor = {
    context: CanvasRenderingContext2D;
};
declare class Chart {
    ctx: CanvasRenderingContext2D;
    core: Core;
    constructor({ context }: ChartConstructor);
    init(settings: InitSettings): void;
    destroy(): void;
}
export default Chart;
