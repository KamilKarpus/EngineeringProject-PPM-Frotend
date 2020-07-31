import { AddLocationActions, ADDING_LOCATION, LOCATION_ADDED, ERROR_WHEHN_ADDING } from "../actions/LocationsAction";
import { LocationState } from "../types/LocationState";

const initial : LocationState = {
    isLoading : false,
    locationId: "",
    errorCode: 0
};

export function locationReducer(state: LocationState = initial, action: AddLocationActions){
    switch(action.type){
        case ADDING_LOCATION:{
            return {
                ...state,
                isLoading: true
            }
        }
        case LOCATION_ADDED:{
            return {
                ...state,
                errorCode:0,
                isLoading: false,
                locationId: action.payload
            }
        }
        case ERROR_WHEHN_ADDING:{
            return{
                ...state,
                isLoading: false,
                errorCode: action.payload
            }
        }
        default:
            return state;
    }
}