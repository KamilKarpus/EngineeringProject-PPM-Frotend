import { ThunkAction } from "redux-thunk";
import { LocationView } from "../../models/LocationView";
import { AppState } from "../../reducers";
import { Action } from "redux";
import { LocationsRepository } from "../LocationRepository";


export const fetchLocations = (
    name: string
) : ThunkAction<Promise<LocationView[]>, AppState, unknown, Action<any>> => async () : Promise<LocationView[]> =>{
        const repository = new LocationsRepository();    
        const result = await repository.GetLocations(name);
        return result;
}