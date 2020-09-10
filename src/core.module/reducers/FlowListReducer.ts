import { FLowListState } from "../types/FlowListState";
import { Actions, FETCH_FLOWS, FLOWS_FETCHED, FLOWS_UPDATED } from "../actions/FlowListActions";

const initialState : FLowListState = {
    flows: {
        currentPage: 0,
        totalPages: 0,
        pageSize: 0,
        totalCount: 0,
        items: [],
        hasPrevious: false,
        hasNext: false
    },
    isLoading: false
}

export function productionFlowsReducer(state : FLowListState = initialState, action : Actions) {
    switch(action.type){
        case FETCH_FLOWS:{
            return {
                ...state,
                isLoading: true,
            }
        }
        case FLOWS_FETCHED:{
            return{
                isLoading: false,
                flows: action.payload
            }
        }
        case FLOWS_UPDATED:{
            var flows = {...state.flows};
            var flowIndex = flows.items.findIndex(p=>p.id == action.payload.id);
            if(flowIndex > 0){
                flows.items[flowIndex] = action.payload
                state.flows = flows;
            }
            return {
                ...state,
                flows: flows
            }
        }
        default:
            return state;
    }
}