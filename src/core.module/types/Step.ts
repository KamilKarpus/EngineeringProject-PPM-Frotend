
import { FlowView } from "../models/FlowView";

export interface StepsState{
    isLoading : boolean;
    errorCode: number;
    isAdded : boolean;
    flowView : FlowView,
    fetchNeeded : boolean,
}