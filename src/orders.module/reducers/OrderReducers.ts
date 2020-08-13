import { OrderActions, ADD_ORDER, ORDER_ADDED } from "../actions/OrderActions";
import { OrderState } from "../types/Order";
const initial = {
    isLoading : false,
    fetchNeeded : false,
    loadingMessage: ""   
}

export function orderReducer(state: OrderState = initial, action : OrderActions){
    switch(action.type){
        case ADD_ORDER:{
            return{
                isLoading: true,
                loadingMessage: action.message
            }
        }
        case ORDER_ADDED:{
            return {
                fetchNeeded : true,
                isLoading: false, 
            }
        }
        default:{
            return state;
        }
    }
}