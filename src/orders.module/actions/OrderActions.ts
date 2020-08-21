export const ADD_ORDER = "ADD_ORDER";
export const ORDER_ADDED = "ORDERD_ADDED";
export const ADD_PACKAGE = "ADD_PACKAGE";
export const PACKAGE_ADDED = "PACKAGE_ADDED";
export const FETCHED_DATA = "FETCHED_DATA";

export interface AddOrderAction{
    type: typeof ADD_ORDER
    message: string
}

export interface AddedOrderAction{
    type: typeof ORDER_ADDED,
    payload: string
}

export interface AddPackageAction{
    type: typeof ADD_PACKAGE
}

export interface PackageCreatedAction{
    type: typeof PACKAGE_ADDED
}
export interface FetchedDataAction{
    type: typeof FETCHED_DATA;
}


export type OrderActions = AddOrderAction | AddedOrderAction | AddPackageAction | PackageCreatedAction | FetchedDataAction;