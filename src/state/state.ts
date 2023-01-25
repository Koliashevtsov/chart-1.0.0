// state storing chart's points path with additional data
import { TPointPath, TState } from '../types';


const state = () => {
    const initialPointsPath: Array<TPointPath> = []

    let state: TState = {
        pointsPath: initialPointsPath,
    }

    return {
        getState(){
            return state
        },
        setState(updater: object){
            state = { ...state, ...updater }
        }
    }
}

export default state();