import { FlowShortView } from "../models/FlowShortView";
import { PaginationList } from "../../shared/model/Pagination";

export interface FLowListState{
    flows: PaginationList<FlowShortView>
    isLoading: boolean;
}