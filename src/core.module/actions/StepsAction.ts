import { Dispatch } from "redux";
import { ProductionFlowRepository } from "../repositories/productionFlowRepository";
import { AddNewStep } from "../models/AddNewStep";
import { FlowView } from "../models/FlowView";
export const ADD_STEP = "ADD_STEPS";
export const STEP_ADDED = "STEP_ADDED";
export const ERROR = "ERROR";
export const FETCH_FLOW = "FETCH_FLOW";
export const FETCH_NEEDED = "FETCH_NEEDED";
export interface AddStepAction {
    type: typeof ADD_STEP
}
export interface StepAddedAction{
    type: typeof STEP_ADDED
}
export interface ErrorAction{
    type: typeof ERROR,
    payload: number
}
export interface FetchFlow{
    type: typeof FETCH_FLOW,
    payload: FlowView
}
export interface NeedToFetchAction{
    type: typeof FETCH_NEEDED
}
export const addStep = (name: string, days: number, locationId: string, percentage: number, flowId : string) => async (
    dispatch: Dispatch
    ) => {
    await dispatch({
        type: ADD_STEP
    });
    const repository = new ProductionFlowRepository();
    await repository.AddStep(flowId, new AddNewStep(name, days, locationId, percentage)).then(async ()=>{
        await dispatch({
            type: STEP_ADDED
        }as const)
        await dispatch({
            type: FETCH_NEEDED
        }as const)}).catch(async error  =>{
        await dispatch({
            type: ERROR,
            payload:  error.errorCode
        });
    });
}
export const getFlow = (id: string) => async (
    dispatch : Dispatch
) => {
    const repository = new ProductionFlowRepository();
    await repository.GetFlow(id).then(async p =>{
        await dispatch({
            type: FETCH_FLOW,
            payload: p,
        } as const);
    });
}


export type StepActions = AddStepAction | StepAddedAction | ErrorAction | FetchFlow | NeedToFetchAction;