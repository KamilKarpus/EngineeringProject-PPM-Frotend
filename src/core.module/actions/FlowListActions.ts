import { PaginationList } from "../../shared/model/Pagination";
import { FlowShortView } from "../models/FlowShortView";

export const FETCH_FLOWS = "FETCH_FLOWS";
export const FLOWS_FETCHED = "FLOWS_FETCHED";
export const FLOWS_UPDATED = "FLOW_UPDATED";

interface FetchFlowsAction{
    type: typeof FETCH_FLOWS,
}

interface FlowFetchedAction{
    type: typeof FLOWS_FETCHED,
    payload: PaginationList<FlowShortView>
}
interface FlowUpdatedAction{
    type: typeof FLOWS_UPDATED,
    payload: FlowShortView
}

export type Actions = FetchFlowsAction | FlowFetchedAction | FlowUpdatedAction;