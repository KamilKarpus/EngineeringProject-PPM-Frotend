import { ADD_USER, USER_ADDED, UsersActions, FETCHED_DATA } from "../actions/UsersActions";
import { UsersState } from "../types/User";


const initial = {
    isLoading : false,
    fetchNeeded : false,
    users: {
        currentPage: 0,
        totalPages: 0,
        pageSize: 0,
        totalCount: 0,
        items: [],
        hasPrevious: false,
        hasNext: false,
    }
}

export function usersReducer(state: UsersState = initial, action : UsersActions){
    switch(action.type){
        case ADD_USER:{
            return{
                ...state,
                isLoading: true,
                fetchNeeded: false,
            
            }
        }
        case USER_ADDED:{
            return {
                ...state,
                fetchNeeded : true,
                isLoading: false, 
            }
        }
        case FETCHED_DATA:{
            return {
                ...state,
                fetchNeeded: false,
                isLoading: false
            }
        }
        default:{
            return state;
        }
    }
}