import { Dispatch } from "redux";
import UserRepository from "../repositories/UserRepository";
import { AddUser } from "../models/AddUserModule";


export const ADD_USER = "ADD_USER";
export const USER_ADDED = "USER_ADDED";
export const FETCHED_DATA = "FETCHTED_DATA";


export interface AddUserAction{
    type: typeof ADD_USER
    message: string
}

export interface AddedUserAction{
    type: typeof USER_ADDED,
    payload: string
}
export interface FetchedData{
    type: typeof FETCHED_DATA,
    payload: string
}

const repository = new UserRepository();

export const addUser = (login: string, password: string, firstName: string, lastName: string,
 jobPosition: string) => async (
    dispatch : Dispatch
) => {
    await dispatch({
        type: ADD_USER,
    })
    await repository.Add(new AddUser(login, password, firstName, lastName, jobPosition))
        .then(async p=>{
            await dispatch({
                type: USER_ADDED,
                payload: p.id
            });
        });
    };
export type UsersActions = AddUserAction | AddedUserAction | FetchedData;