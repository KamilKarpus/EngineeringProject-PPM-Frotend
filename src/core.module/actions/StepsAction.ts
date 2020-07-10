import { LocationView } from "../models/LocationView";
import { Dispatch } from "redux";
import { LocationsRepository } from "../repositories/LocationRepository";
export const LOCATIONS_RESPOSNE = "LOCATIONS_RESPONSE";
export interface LocationResponseAction {
    type: typeof LOCATIONS_RESPOSNE
    payload: LocationView[];
}
export const getLocations = (locationName : string) => async (
    dispatch: Dispatch
) => {
    const repository = new LocationsRepository();
    const result = await repository.GetLocations(locationName);
    
}


export type StepActions = LocationResponseAction;