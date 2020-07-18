import { StepsState } from "../types/Step";
import { StepActions, ADD_STEP, STEP_ADDED, ERROR, FETCH_FLOW, FETCH_NEEDED, STEP_MODIFIED_ERROR, LOADING } from "../actions/StepsAction";

const initialState : StepsState = {
    isLoading : false,
    errorCode: 0,
    isAdded: false,
    fetchNeeded: false,
    errorCodeMain: 0,
    loadingMessage: "",
    flowView: {
        id: "",
        name: "",
        isValid: false,
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
                isAdded: false,
                flowView: action.payload,
                fetchNeeded: false,
                isLoading: false
            }
        }
        case FETCH_NEEDED:{
           return{
               ...state,
               errorCodeMain: 0,
               fetchNeeded: true,
               loadingMessage: action.message
           }
        }
        case STEP_MODIFIED_ERROR:{
            return{
                ...state,
                errorCodeMain: action.payload,
                isLoading: false,
            }
        }
        case LOADING:{
            return{
                ...state,
                isLoading: true,
                loadingMessage: action.message
            }
        }
        default:
            return state;
    }
}