import { AddOrder } from "../../models/AddOrder";
import { Action } from "redux";
import { AppState } from "../../reducers";
import { ThunkAction } from "redux-thunk";
import { OrdersRepository } from "../OrdersRepository";
import { ADD_ORDER, ORDER_ADDED, FETCHED_DATA, ADD_PACKAGE, PACKAGE_ADDED, FETCHED_ORDER, FETCH_DATA, PRINTING_NOTIFICATION } from "../../actions/OrderActions";
import { OrderShortView } from "../../models/OrderShortView";
import { PaginationList } from "../../../shared/model/Pagination";
import { AddPackage } from "../../models/AddPackage";
import { HubClient } from "../../../shared/HubClient";
import { PrintingDTo } from "../../models/PrintingDTO";


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
    ) : ThunkAction<void, AppState, unknown, Action<any>> => async (dispatch, getState) =>{
            const repository = new OrdersRepository();    
            await dispatch(
                {
                    type: FETCH_DATA
                }
            );
            const result = await repository.GetOrder(orderId);
            dispatch(
                {
                    type : FETCHED_ORDER,
                    payload: result
                }
            );

    }

export const addPackageAsync = (
        flowId: string,weight: number,height: number,width: number, orderId : string, length: number
      ): ThunkAction<void, AppState, unknown, Action<any>> => async (dispatch, getState) => {
        const repository = new OrdersRepository();
        await dispatch({
            type: ADD_PACKAGE
        });
        await repository.AddPackage(orderId, new AddPackage(flowId, weight, height, width, length))
            .then(async p=>{
                await dispatch({
                    type: PACKAGE_ADDED
                });
            })
        };

export const subscribeToResource = (
    orderId: string
) : ThunkAction<void, AppState, unknown, Action<any>> => async (dispatch) => {
        const client = new HubClient("printingHub");
        client.subscribe<PrintingDTo>('printingStatus', (data)=>{
            dispatch({
                type: PRINTING_NOTIFICATION,
                payload: data
            });
          });
        client.joinGroup(orderId);
    };