import { Observable } from '../utils';
import { TObserver, IConfig } from '../types';
declare class Controller {
    observable: Observable;
    constructor();
    add(area: TObserver): void;
    initialize(config: IConfig): void;
    render(): void;
    update(config: IConfig): void;
    clear(): void;
}
export default Controller;
