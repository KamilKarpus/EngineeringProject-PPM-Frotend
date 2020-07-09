import { ProductionFlow } from "../types/productionFlow";
import { Actions, PRODUCTION_FLOW_CREATED,ADD_PRODUCTION_FLOW, MOVED_TO_THE_NEXT_PAGE, ERROR_FLOW_ACTION } from "../actions/productionFlowActions"

const initialState : ProductionFlow = {
    isLoading: false,
    id: "",
    name: "",
    moveToTheNextPage: false,
    errorCode: 0
}

export function productionFlowReducer(state : ProductionFlow = initialState, action : Actions) {
    switch(action.type){
        case ADD_PRODUCTION_FLOW:
             return {
                isLoading: true,
                id: "",
                name: action.payload,
                moveToTheNextPage: false
            }
        case PRODUCTION_FLOW_CREATED:
            return{
                isLoading: false,
                id: action.payload,
                name: state.name,
                moveToTheNextPage: true
            };
        case MOVED_TO_THE_NEXT_PAGE:
            return {
                ...state,
                moveToTheNextPage: false
            };
        case ERROR_FLOW_ACTION:{
            return {
                ...state,
                errorCode: action.payload
            }
        }
        default:
            return state;
    }
}