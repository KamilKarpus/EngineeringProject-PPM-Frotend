import { Dispatch } from "redux";
import { OrdersRepository } from "../repositories/OrdersRepository";
import { AddOrder } from "../models/AddOrder";

export const ADD_ORDER = "ADD_ORDER";
export const ORDER_ADDED = "ORDERD_ADDED";

export interface AddOrderAction{
    type: typeof ADD_ORDER
    message: string
}

export interface AddedOrderAction{
    type: typeof ORDER_ADDED,
    payload: string
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
export type OrderActions = AddOrderAction | AddedOrderAction;