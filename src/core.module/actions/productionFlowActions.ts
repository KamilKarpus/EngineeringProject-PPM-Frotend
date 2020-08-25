import { Dispatch } from "redux";
import { ProductionFlowRepository } from "../repositories/productionFlowRepository";
import { AddNewFlow } from "../models/AddNewFlow";

export const ADD_PRODUCTION_FLOW = "ADD_PRODUCTION_FLOW";
export const PRODUCTION_FLOW_CREATED = "PRODUCTION_FLOW_CREATED";
export const MOVED_TO_THE_NEXT_PAGE = "MOVE_TO_THE_NEXT_PAGE";
export const ERROR_FLOW_ACTION = "ERROR_FLOW_ACTION";

export interface AddProductionFlowAction{
    type: typeof ADD_PRODUCTION_FLOW;
    payload: string;
}
export interface ProductionFlowCreated{
    type: typeof PRODUCTION_FLOW_CREATED,
    payload: string;
}
export interface MovedToTheNextPageAction{
    type: typeof MOVED_TO_THE_NEXT_PAGE,
}
export interface ErrorFlowAction{
    type: typeof ERROR_FLOW_ACTION,
    payload: number
}
export type Actions = AddProductionFlowAction | ProductionFlowCreated | MovedToTheNextPageAction | ErrorFlowAction;