import { AddOrder } from "../../models/AddOrder";
import { Action } from "redux";
import { AppState } from "../../reducers";
import { ThunkAction } from "redux-thunk";
import { OrdersRepository } from "../OrdersRepository";
import { ADD_ORDER, ORDER_ADDED, FETCHED_DATA, ADD_PACKAGE, PACKAGE_ADDED } from "../../actions/OrderActions";
import { OrderShortView } from "../../models/OrderShortView";
import { PaginationList } from "../../../shared/model/Pagination";
import { OrderView } from "../../models/OrderView";
import { AddPackage } from "../../models/AddPackage";


export const addOrderAsync = (
    order: AddOrder
  ): ThunkAction<void, AppState, unknown, Action<any>> => async (dispatch, getState) => {
    const repository = new OrdersRepository();
    await dispatch({
        type: ADD_ORDER,
    })
    await repository.Add(order)
        .then(async p=>{
            await dispatch({
                type: ORDER_ADDED,
                payload: p.id
            });
        });
    };
        
    
export const fetchOrdersList = (
        pageSize : number, pageNumber : number
    ) : ThunkAction<Promise<PaginationList<OrderShortView>>, AppState, unknown, Action<any>> => async (dispatch, getState) : Promise<PaginationList<OrderShortView>> =>{
            const repository = new OrdersRepository();    
            const result = await repository.GetOrders(pageNumber, pageSize);
            dispatch({type : FETCHED_DATA});
            return result;
    }

export const fetchOrder = (
        orderId: string
    ) : ThunkAction<Promise<OrderView>, AppState, unknown, Action<any>> => async (dispatch, getState) : Promise<OrderView> =>{
            const repository = new OrdersRepository();    
            const result = await repository.GetOrder(orderId);
            dispatch({type : FETCHED_DATA});
            return result;
    }

export const addPackageAsync = (
        flowId: string,weight: number,height: number,width: number, orderId : string
      ): ThunkAction<void, AppState, unknown, Action<any>> => async (dispatch, getState) => {
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
        };

   