export const ADDING_LOCATION = "ADDING_LOCATION";
export const LOCATION_ADDED = "LOCATION_ADDED";
export const ERROR_WHEHN_ADDING = "ERROR_WHEN_ADDING";
export const FETCHED_DATA = "FETCHED_DATA";
export interface AddingLocationAction {
    type: typeof ADDING_LOCATION;
}
export interface LocationAddedAction{
    type: typeof LOCATION_ADDED;
    payload: string;
}
export interface ErrorWhenAddingAction{
    type: typeof ERROR_WHEHN_ADDING;
    payload: number;
}
export interface FetchedDataAction{
    type: typeof FETCHED_DATA;
}

export type AddLocationActions =  AddingLocationAction | LocationAddedAction | ErrorWhenAddingAction | FetchedDataAction; 