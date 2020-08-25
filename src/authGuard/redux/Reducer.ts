import { AuthState } from "./AuthState";
import { AuthActions, REQUEST_LOGIN, LOGGED_IN, ERROR, LOGOUT } from "./Actions";
import { TokenManager } from "../TokenMenager";
const initial : AuthState = {
    isLoading: false,
    userEmail: "",
    token: "",
    permissions: []
}
export function authReducer(state: AuthState = initial, action : AuthActions){
    const manager = new TokenManager();
    const user = manager.getUserData();
    state.userEmail = user.userEmail;
    state.token = user.token;
    state.permissions = user.permissions;
    switch(action.type){
       case REQUEST_LOGIN:{
           return {
               ...state,
               isLoading: true,
           }
       }
       case LOGGED_IN:{
           return{
               ...state,
               isLoading: false,
               userEmail: action.payload.userEmail,
               token: action.payload.token,
               permissions: action.payload.permissions
           }
       }
       case ERROR:{
           return{
               ...state,
               isLoading: false,
           }
       }
       case LOGOUT:{
            manager.clear();
            return{
               ...state,
               userEmail: "",
               token: "",
               permissions: []
            }
       }
        default:{
            return state;
        }
    }
}