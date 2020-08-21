import { AddLocationActions, ADDING_LOCATION, LOCATION_ADDED, ERROR_WHEHN_ADDING, FETCHED_DATA } from "../actions/LocationsAction";
import { LocationState } from "../types/LocationState";

const initial : LocationState = {
    isLoading : false,
    locationId: "",
    errorCode: 0,
    fetchNedeed: false,
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
                locationId: action.payload,
                fetchNedeed: true,
            }
        }
        case ERROR_WHEHN_ADDING:{
            return{
                ...state,
                isLoading: false,
                errorCode: action.payload
            }
        }
        case FETCHED_DATA:{
            return{
                ...state,
                isLoading: false,
                fetchNedeed: false,
            }
        }
        default:
            return state;
    }
}