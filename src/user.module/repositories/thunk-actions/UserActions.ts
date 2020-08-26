import { AddUser } from "../../models/AddUserModule";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../../reducers";
import { Action } from "redux";
import { ADD_USER, USER_ADDED, FETCHED_DATA, USER_CHANGE_PERMISSIONS, PERMISSION_CHANGED } from "../../actions/UsersActions";
import { IUserRepository } from "../IUserRepository";
import UserShortModel from "../../models/UserShortModel";
import { PaginationList } from "../../../shared/model/Pagination";
import { ERROR } from "../../../core.module/actions/StepsAction";
import { UserView } from "../../models/UserView";
import PermissionView from "../../components/editUserPermissions/PermissionView";
import { PermissionConvertService } from "../../models/PermissionService";

export const addUserAsync = (
    user: AddUser
  ): ThunkAction<void, AppState, unknown, Action<any>> => async (dispatch, getState, repository) => {
        await dispatch({
          type: ADD_USER,
         });
        await (repository as IUserRepository).Add(user)
         .then(async p=>{
            await dispatch({
                        type: USER_ADDED,
                        payload: p.id
                    });
         }).catch(async error=>{
            await dispatch({
              type: ERROR,
              payload: error.errorCode            
            })
         });
  }
  
export const fetchUserList = (
    pageSize : number, pageNumber : number
) : ThunkAction<Promise<PaginationList<UserShortModel>>, AppState, unknown, Action<any>> => async (dispatch, getState, repository) : Promise<PaginationList<UserShortModel>> =>{
        const result = await (repository as IUserRepository).GetList(pageNumber, pageSize);
        dispatch({type : FETCHED_DATA});
        return result;
}

export const fetchUserById = (
    userId: string
) : ThunkAction<Promise<UserView>, AppState, unknown, Action<any>> => async (dispatch, getState, repository) : Promise<UserView> =>{
    const result = await (repository as IUserRepository).GetUser(userId);
    return result;
}

export const updateUserPermissions = (
  userId: string, permissionView : PermissionView
) : ThunkAction<void, AppState, unknown, Action<any>> => async (dispatch, getState, repository) =>{
  const convert = new PermissionConvertService(permissionView);
  const permissions = convert.convert();
  await dispatch({
    type: USER_CHANGE_PERMISSIONS
  })
  const result = await (repository as IUserRepository).UpdatePermissions(userId, permissions);
  await dispatch({
    type: PERMISSION_CHANGED
  })
  return result;
}