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

export type UsersActions = AddUserAction | AddedUserAction | FetchedData;