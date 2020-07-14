import { StepsState } from "../types/Step";
import { StepActions, ADD_STEP, STEP_ADDED, ERROR, FETCH_FLOW, FETCH_NEEDED } from "../actions/StepsAction";

const initialState : StepsState = {
    isLoading : false,
    errorCode: 0,
    isAdded: false,
    fetchNeeded: false,
    flowView: {
        id: "",
        name: "",
        requiredDaysToFinish: 0,
        statusName: "",
        statusId: 1,
        steps: []
    }
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
                ...state,
                errorCode: 0,
                isAdded: true,
                isLoading: false                
            }
        }
        case ERROR:{
            return{
                ...state,
                isAdded: false,
                errorCode: action.payload,
                isLoading : false
            }
        }
        case FETCH_FLOW:{
            return{
                ...state,
                flowView: action.payload,
                fetchNeeded: false 
            }
        }
        case FETCH_NEEDED:{
           return{
               ...state,
               fetchNeeded: true,
           }
        }
        default:
            return state;
    }
}