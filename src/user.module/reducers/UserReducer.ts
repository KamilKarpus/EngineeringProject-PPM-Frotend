import { ADD_USER, USER_ADDED, UsersActions, FETCHED_DATA } from "../actions/UsersActions";
import { UsersState } from "../types/User";


const initial = {
    isLoading : false,
    fetchNeeded : false,
}

export function usersReducer(state: UsersState = initial, action : UsersActions){
    switch(action.type){
        case ADD_USER:{
            return{
                isLoading: true,
                fetchNeeded: false,
            }
        }
        case USER_ADDED:{
            return {
                fetchNeeded : true,
                isLoading: false, 
            }
        }
        case FETCHED_DATA:{
            return {
                fetchNeeded: false,
                isLoading: false
            }
        }
        default:{
            return state;
        }
    }
}