import { ThunkAction } from "redux-thunk";
import { AppState } from "../../reducers";
import { Action } from "redux";
import { ADDING_LOCATION, LOCATION_ADDED, ERROR_WHEHN_ADDING, FETCHED_DATA } from "../../actions/LocationsAction";
import { LocationRepository } from "../LocationRepository";
import { AddNewLocation } from "../../models/AddNewLocation";
import { LocationView } from "../../models/LocationView";
import { PaginationList } from "../../../shared/model/Pagination";

export const addLocation = (
    name: string, type: number, handleQR: boolean, description: string,
        height: number, width: number, shortName: string, length : number
  ): ThunkAction<void, AppState, unknown, Action<any>> => async (dispatch) => {
    await dispatch({
        type: ADDING_LOCATION
    });
    const repository = new LocationRepository();
    await repository.Add(new AddNewLocation(name, type, handleQR, description, height, width, shortName, length))
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



export const fetchLocationList= (
        pageSize : number, pageNumber : number
    ) : ThunkAction<Promise<PaginationList<LocationView>>, AppState, unknown, Action<any>> => async (dispatch, getState) : Promise<PaginationList<LocationView>> =>{
            const repository = new LocationRepository();    
            const result = await repository.GetLocations(pageNumber, pageSize);
            dispatch({type : FETCHED_DATA});
            return result;
    }

  