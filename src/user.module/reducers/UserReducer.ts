import { ADD_USER, USER_ADDED, UsersActions, FETCHED_DATA, ERROR, USER_CHANGE_PERMISSIONS, PERMISSION_CHANGED } from "../actions/UsersActions";
import { UsersState } from "../types/User";


const initial = {
    isLoading : false,
    fetchNeeded : false,
    errorCode: 0
}

export function usersReducer(state: UsersState = initial, action : UsersActions){
    switch(action.type){
        case ADD_USER:{
            return{
                ...state,
                isLoading: true,
                fetchNeeded: false,
                erroCode: 0
            }
        }
        case USER_ADDED:{
            return {
                ...state,
                fetchNeeded : true,
                isLoading: false, 
                erroCode: 0
            }
        }
        case FETCHED_DATA:{
            return {
                ...state,
                fetchNeeded: false,
                isLoading: false,
                erroCode: 0
            }
        }
        case ERROR:{
            return {
                fetchNeeded: false,
                isLoding: false,
                errorCode: action.payload
            }
        }
        case USER_CHANGE_PERMISSIONS:{
            return{
                ...state,
                isLoading: true
            }
        }
        case PERMISSION_CHANGED:{
            return{
                ...state,
                isLoading: false
            }
        }
        default:{
            return state;
        }
    }
}