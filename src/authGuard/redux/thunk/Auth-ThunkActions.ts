import { AuthState } from "../AuthState";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { REQUEST_LOGIN, LOGGED_IN, ERROR } from "../Actions";
import { AuthService } from "../../AuthService";
import { TokenManager } from "../../TokenMenager";


export const getCredientials = (
    userEmail: string, password: string
  ): ThunkAction<void, AuthState, unknown, Action<any>> => async (dispatch) => {
       await dispatch({
           type: REQUEST_LOGIN
       });
       const service = new AuthService();
       const manager = new TokenManager();
       await service.getCredential(userEmail, password).then(async credential=>{
           manager.saveToken(credential.access_token, credential.refresh_token);
           await dispatch({
                type: LOGGED_IN,
                payload: manager.getUserData()
           });
       }).catch(async err=>{
           await dispatch({
               type: ERROR
           })
       })
  }