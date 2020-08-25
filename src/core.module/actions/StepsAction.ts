import { Dispatch } from "redux";
import { ProductionFlowRepository } from "../repositories/productionFlowRepository";
import { AddNewStep } from "../models/AddNewStep";
import { FlowView } from "../models/FlowView";
import { ChangeStepPostion } from "../models/ChangeStepPostion";
export const ADD_STEP = "ADD_STEPS";
export const STEP_ADDED = "STEP_ADDED";
export const ERROR = "ERROR";
export const FETCH_FLOW = "FETCH_FLOW";
export const FETCH_NEEDED = "FETCH_NEEDED";
export const STEP_MODIFIED_ERROR = "STEP_MODIFIED";
export const LOADING = "LOADING";
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
    type: typeof FETCH_NEEDED,
    message: "Trwa wczytywanie danych na temat przepływu produkcji..."
}
export interface StepModifiedAction{
    type: typeof STEP_MODIFIED_ERROR,
    payload: number
}
export interface LoadingAction{
    type: typeof LOADING,
    message: string
}
export type StepActions = AddStepAction | StepAddedAction | ErrorAction | FetchFlow | NeedToFetchAction | StepModifiedAction | LoadingAction;