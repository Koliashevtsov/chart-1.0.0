import { Observable } from '../utils';
import { TObserver, TConfig } from '../types';
declare class Controller {
    observable: Observable;
    constructor();
    add(area: TObserver): void;
    initialize(config: TConfig): void;
    render(): void;
    update(config: TConfig): void;
    clear(): void;
}
export default Controller;
