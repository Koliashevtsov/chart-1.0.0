import Controller from '../controller';

type Shape = {
    id: string;
    update: () => void,
    render: () => void,
    draw: () => void
}

class Core {
    controller: Controller;

    constructor(){
        this.controller = new Controller()
    }
    

    register(shape: Shape){
        this.controller.add(shape);
    }

    _initialize(){
        this.controller.initialize();
    }

    _render(){
        this.controller.render();
    }

    run(){
        this._initialize();
        this._render();
    }

}

export default Core;