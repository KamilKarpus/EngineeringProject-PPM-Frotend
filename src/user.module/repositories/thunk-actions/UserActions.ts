import { AddUser } from "../../models/AddUserModule";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../../reducers";
import { Action } from "redux";
import { ADD_USER, USER_ADDED, FETCHED_DATA } from "../../actions/UsersActions";
import { IUserRepository } from "../IUserRepository";
import UserShortModel from "../../models/UserShortModel";
import { PaginationList } from "../../../shared/model/Pagination";

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
         })
  }
  
export const fetchUserList = (
    pageSize : number, pageNumber : number
) : ThunkAction<Promise<PaginationList<UserShortModel>>, AppState, unknown, Action<any>> => async (dispatch, getState, repository) : Promise<PaginationList<UserShortModel>> =>{
        const result = await (repository as IUserRepository).GetList(pageNumber, pageSize);
        dispatch({type : FETCHED_DATA});
        return result;
}