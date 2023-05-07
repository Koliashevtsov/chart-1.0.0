import { Drawing } from '../../drawing';
import { TObserver, IConfig } from '../../types';
export declare class WhiteArea implements TObserver {
    id: string;
    drawing: Drawing;
    constructor();
    private _draw;
    clear(): void;
    initialize(config: IConfig): void;
    render(): void;
    update(config: IConfig): void;
    private _createDrawing;
}
