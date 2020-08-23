import { OrderActions, ADD_ORDER, ORDER_ADDED, ADD_PACKAGE, PACKAGE_ADDED, ERROR } from "../actions/OrderActions";
import { OrderState } from "../types/Order";
const initial = {
    isLoading : false,
    fetchNeeded : false,
    loadingMessage: "",
    errorCode: 0
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
        case ADD_PACKAGE:{
            return{
                ...state,
                isLoading:true
            }
        }
        case PACKAGE_ADDED:{
            return{
                ...state,
                isLoading: false, 
                fetchNeeded: true
            }
        }
        case ERROR:{
            return{
                ...state,
                isLoading: false,
                fetchNeeded: false,
                errorCode: action.payload
            }
        }
        default:{
            return state;
        }
    }
}