import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { ADD_STEP, STEP_ADDED, FETCH_NEEDED, ERROR, FETCH_FLOW, LOADING, STEP_MODIFIED_ERROR } from "../../actions/StepsAction";
import { ProductionFlowRepository } from "../productionFlowRepository";
import { AddNewStep } from "../../models/AddNewStep";
import { ADD_PRODUCTION_FLOW, PRODUCTION_FLOW_CREATED, ERROR_FLOW_ACTION } from "../../actions/productionFlowActions";
import { AddNewFlow } from "../../models/AddNewFlow";
import { PaginationList } from "../../../shared/model/Pagination";
import { FlowShortView } from "../../models/FlowShortView";
import { ChangeStepPostion } from "../../models/ChangeStepPostion";
import { AppState } from "../../../ReduxConfiguration";

export const addStepAsync = (
    name: string, days: number, locationId: string, percentage: number, flowId : string
  ): ThunkAction<void, AppState, unknown, Action<any>> => async (dispatch) => {
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
    };

export const fetchFlow = (
            id: string
    ): ThunkAction<void, AppState, unknown, Action<any>> => async (dispatch) => {
        const repository = new ProductionFlowRepository();
        await repository.GetFlow(id).then(async p =>{
            await dispatch({
                type: FETCH_FLOW,
                payload: p,
            } as const);
        });
    };

export const finishFlow = (
        flowId : string
): ThunkAction<void, AppState, unknown, Action<any>> => async (dispatch) => {
    await dispatch({
        type: LOADING,
        message: "Trwa zmiana status procesu produkcji..."
    });
    const repository = new ProductionFlowRepository();
    await repository.FinishFlow(flowId)
        .then(async p=>{
        await dispatch({
            type: FETCH_NEEDED
        })
    }).catch(async error =>{
            await dispatch({
                type: STEP_MODIFIED_ERROR,
                payload:  error.errorCode
            })
        })
};

export const addProductionFlowAsync = (
    productionFlow : string
  ): ThunkAction<void, AppState, unknown, Action<any>> => async (dispatch) => {
    dispatch({
        type: ADD_PRODUCTION_FLOW,
        payload: productionFlow
    });
    const repository = new ProductionFlowRepository();
    repository.Add(new AddNewFlow(productionFlow)).then(result => dispatch({
        type: PRODUCTION_FLOW_CREATED,
        payload: result.id
    } as const))
    .catch(error =>{
        dispatch({
            type: ERROR_FLOW_ACTION,
            payload:  error.errorCode
        })
    });
    };



export const changePositionAsync = (
        flowId : string, stepId: string, stepNumber: number
      ): ThunkAction<void, AppState, unknown, Action<any>> => async (dispatch) => {
        const repository = new ProductionFlowRepository();
        await dispatch({type: LOADING, message: "Trwa aktualizacji pozycji etapów..."});
        await repository.ChangeStepPostion(flowId, new ChangeStepPostion(stepId, stepNumber))
            .then(async p=>{
                await dispatch({
                    type: FETCH_NEEDED
                }as const)
            }).catch(async error  =>{
                await dispatch({
                    type: STEP_MODIFIED_ERROR,
                    payload:  error.errorCode
                })
            });
        };
