import { Dispatch } from "redux";
import { ProductionFlowRepository } from "../repositories/productionFlowRepository";
import { AddNewStep } from "../models/AddNewStep";
export const ADD_STEP = "ADD_STEPS";
export const STEP_ADDED = "STEP_ADDED";
export const ERROR = "ERROR";
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
export const addStep = (name: string, days: number, locationId: string, percentage: number, flowId : string) => async (
    dispatch: Dispatch
    ) => {
    await dispatch({
        type: ADD_STEP
    });
    const repository = new ProductionFlowRepository();
    await repository.AddStep(flowId, new AddNewStep(name, days, locationId, percentage)).then(()=>
        dispatch({
            type: STEP_ADDED
        }as const)).catch(async error  =>{
        await dispatch({
            type: ERROR,
            payload:  error.errorCode
        });
    });
}


export type StepActions = AddStepAction | StepAddedAction | ErrorAction;