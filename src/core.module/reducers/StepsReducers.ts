import { StepsState } from "../types/Step";
import { StepActions, ADD_STEP, STEP_ADDED, ERROR } from "../actions/StepsAction";

const initialState : StepsState = {
    isLoading : false,
    errorCode: 0,
    isAdded: false,
};

export function stepReducer(state: StepsState = initialState, action : StepActions){
    switch(action.type){
        case ADD_STEP:{
            return {
                ...state,
                isLoading: true
            }
        }
        case STEP_ADDED:{
            return{
                errorCode: 0,
                isAdded: true,
                isLoading: false                
            }
        }
        case ERROR:{
            return{
                isAdded: false,
                errorCode: action.payload,
                isLoading : false
            }
        }
        default:
            return state;
    }
}