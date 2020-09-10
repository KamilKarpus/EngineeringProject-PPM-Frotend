import { ThunkAction } from "redux-thunk";
import { AppState } from "../../reducers";
import { Action } from "redux";
import { ProductionFlowRepository } from "../productionFlowRepository";
import { FLOWS_FETCHED, FETCH_FLOWS, FLOWS_UPDATED } from "../../actions/FlowListActions";
import { HubClient } from "../../../shared/HubClient";
import { FlowShortView } from "../../models/FlowShortView";

export const fetchFlows = (
    pageNumber: number, pageSize : number
): ThunkAction<void, AppState, unknown, Action<any>> => async (dispatch) => {
await dispatch({
    type: FETCH_FLOWS
});
const repository = new ProductionFlowRepository();
await repository.GetFlows(pageNumber, pageSize).then(async p =>{
    await dispatch({
        type: FLOWS_FETCHED,
        payload: p,
    } as const);
});
};

export const subscribeToResource = (
) : ThunkAction<void, AppState, unknown, Action<any>> => async (dispatch) => {
        const client = new HubClient("adminhub");
        client.subscribe<FlowShortView>('flow', (data)=>{
            dispatch({
                type:FLOWS_UPDATED ,
                payload: data
            });
          });
          client.start();
    };