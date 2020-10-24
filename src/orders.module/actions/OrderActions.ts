import { OrderView } from "../models/OrderView";
import { PackageProgresseDTO } from "../models/PackageProgressDtos";
import { PrintingDTo } from "../models/PrintingDTO";

export const ADD_ORDER = "ADD_ORDER";
export const ORDER_ADDED = "ORDERD_ADDED";
export const ADD_PACKAGE = "ADD_PACKAGE";
export const PACKAGE_ADDED = "PACKAGE_ADDED";
export const FETCHED_DATA = "FETCHED_DATA";
export const ERROR = "ERROR";
export const FETCH_DATA = "FETCH_DATA";
export const FETCHED_ORDER = "FETCHED_ORDER";
export const PRINTING_NOTIFICATION = "PRINTING_NOTIFICATION";
export const PACKAGE_PROGRESS_NOTIFCATION = "PACKAGE_PROGRESS_NOTIFCATION";

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
export interface ErrorAction{
    type: typeof ERROR,
    payload: number;
}
export interface FetchData{
    type: typeof FETCH_DATA
}
export interface FetchedOrderView{
    type: typeof FETCHED_ORDER,
    payload: OrderView
}
export interface PrintingNotificationAction{
    type: typeof PRINTING_NOTIFICATION,
    payload: PrintingDTo
}

export interface PackageProgressAction{
    type: typeof PACKAGE_PROGRESS_NOTIFCATION,
    payload: PackageProgresseDTO
}

export type OrderActions = AddOrderAction | AddedOrderAction 
        | AddPackageAction | PackageCreatedAction | FetchedDataAction
         | ErrorAction | FetchedOrderView | FetchData | PrintingNotificationAction
         | PackageProgressAction;