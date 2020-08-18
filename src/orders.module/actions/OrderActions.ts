import { Dispatch } from "redux";
import { OrdersRepository } from "../repositories/OrdersRepository";
import { AddOrder } from "../models/AddOrder";
import { AddPackage } from "../models/AddPackage";

export const ADD_ORDER = "ADD_ORDER";
export const ORDER_ADDED = "ORDERD_ADDED";
export const ADD_PACKAGE = "ADD_PACKAGE";
export const PACKAGE_ADDED = "PACKAGE_ADDED";

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

export const addOrder = (companyName : string, deliveryDate : Date, description : string) => async (
    dispatch : Dispatch
) => {
    const repository = new OrdersRepository();
    await dispatch({
        type: ADD_ORDER,
        message: "Trwa tworzenie nowego zamówienia.."
    })
    await repository.Add(new AddOrder(companyName, deliveryDate, description))
        .then(async p=>{
            await dispatch({
                type: ORDER_ADDED,
                payload: p.id
            });
        });
    };

export const addPackageRequest = (flowId: string,weight: number,height: number,width: number, orderId : string) => async(
    dispatch: Dispatch
) =>{
    const repository = new OrdersRepository();
    await dispatch({
        type: ADD_PACKAGE
    });
    await repository.AddPackage(orderId, new AddPackage(flowId, weight, height, width))
        .then(async p=>{
            await dispatch({
                type: PACKAGE_ADDED
            });
        })
}
export type OrderActions = AddOrderAction | AddedOrderAction | AddPackageAction | PackageCreatedAction;