import { ThunkAction } from "redux-thunk";
import { FlowView } from "../../models/FlowView";
import { AppState } from "../../reducers";
import { Action } from "redux";
import { FlowRepository } from "../FlowRepository";

export const fetchFlows = (
    name: string
) : ThunkAction<Promise<FlowView[]>, AppState, unknown, Action<any>> => async () : Promise<FlowView[]> =>{
        const repository = new FlowRepository();    
        const result = await repository.GetFlow(name);
        return result;
}