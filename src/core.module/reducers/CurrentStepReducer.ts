import { CurrentStepActions, STEP_CHANGE } from "../actions/currentStepActions";

export function currentStepReducer(state: number = 1, action : CurrentStepActions){
    switch(action.type){
        case STEP_CHANGE:{
            return action.payload;
        }
        default:{
            return state;
        }
    }
}