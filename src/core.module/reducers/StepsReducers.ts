import { StepsState } from "../types/Step";
import { StepActions, LOCATIONS_RESPOSNE } from "../actions/StepsAction";

const initialState : StepsState = {
    locations : []
};

export function stepReducer(state: StepsState = initialState, action : StepActions){
    switch(action.type){
        case LOCATIONS_RESPOSNE:{
            return {
                locations: action.payload
            }
        }
        default:
            return state;
    }
}