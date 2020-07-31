import { Dispatch } from "redux";
import { LocationRepository } from "../repositories/LocationRepository";
import { AddNewLocation } from "../models/AddNewLocation";

export const ADDING_LOCATION = "ADDING_LOCATION";
export const LOCATION_ADDED = "LOCATION_ADDED";
export const ERROR_WHEHN_ADDING = "ERROR_WHEN_ADDING";

export interface AddingLocationAction {
    type: typeof ADDING_LOCATION;
}
export interface LocationAddedAction{
    type: typeof LOCATION_ADDED;
    payload: string;
}
export interface ErrorWhenAddingAction{
    type: typeof ERROR_WHEHN_ADDING;
    payload: number;
}

export const addLocation = (name: string, type: number, handleQR: boolean, description: string,
    height: number, width: number, shortName: string) => async (
    dispatch: Dispatch
    ) => {
    await dispatch({
        type: ADDING_LOCATION
    });
    const repository = new LocationRepository();
    await repository.Add(new AddNewLocation(name, type, handleQR, description, height, width, shortName))
    .then(async result =>{
        await dispatch({
            type: LOCATION_ADDED,
            payload: result.id
            })
        }).catch(async error=>{
            await dispatch({
                type: ERROR_WHEHN_ADDING,
                payload: error.errorCode
            })
        })
    };


export type AddLocationActions =  AddingLocationAction | LocationAddedAction | ErrorWhenAddingAction; 