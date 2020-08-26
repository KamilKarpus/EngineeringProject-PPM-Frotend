export const ADD_USER = "ADD_USER";
export const USER_ADDED = "USER_ADDED";
export const FETCHED_DATA = "FETCHTED_DATA";
export const ERROR = "ERROR";
export const USER_CHANGE_PERMISSIONS = "USER_CHANGE_PERMISSIONS";
export const PERMISSION_CHANGED = "PERMISSION_CHANGED";

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
export interface ErrorAction{
    type: typeof ERROR,
    payload: number
}
export interface UserChangePermissionAction{
    type: typeof USER_CHANGE_PERMISSIONS;
}
export interface PermissionChangedAction{
    type: typeof PERMISSION_CHANGED;
}
export type UsersActions = AddUserAction | AddedUserAction | FetchedData | ErrorAction | UserChangePermissionAction | 
PermissionChangedAction;