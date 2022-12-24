enum Message {
    INITIALIZE = 'INITIALIZE',
    RENDER = 'RENDER',
    UPDATE = 'UPDATE'
};

type Shape = {
    id: string;
    update: () => void,
    render: () => void,
    draw: () => void
}

type ShapeObserver = Shape

export class Observable {
    observers: Array<ShapeObserver>

    constructor(){
        this.observers = []
    }

    subscribe(observer: ShapeObserver){
        this.observers.push(observer)
    }

    unsubscribe(id: string){
        this.observers.find(observer => observer.id === id)
    }

    notify(message: Message){
        switch(message){
            case 'UPDATE':
                this.observers.forEach(observer => observer.update());
                break;
            case 'RENDER':
                this.observers.forEach(observer => observer.render());
                break;
            default: 
                return
        }
    }
}