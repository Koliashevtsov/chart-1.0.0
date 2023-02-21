import { Drawing } from '../../drawing/drawing';
import { TObserver, TConfig } from '../../types';
export declare class LabelsArea implements TObserver {
    id: string;
    drawing: Drawing;
    constructor();
    private _draw;
    clear(): void;
    initialize(config: TConfig): void;
    render(): void;
    update(config: TConfig): void;
    private _createDrawing;
}
