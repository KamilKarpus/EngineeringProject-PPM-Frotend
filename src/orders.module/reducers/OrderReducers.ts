import { OrderActions, ADD_ORDER, ORDER_ADDED, ADD_PACKAGE, PACKAGE_ADDED, ERROR, FETCHED_ORDER, FETCH_DATA, PRINTING_NOTIFICATION, PACKAGE_PROGRESS_NOTIFCATION } from "../actions/OrderActions";
import { OrderState } from "../types/Order";
import { FaTruckMonster } from "react-icons/fa";
const initial = {
    isLoading : false,
    fetchNeeded : false,
    loadingMessage: "",
    errorCode: 0,
    orderView: {
        id: "",
        companyName: "",
        orderedDate: new Date(0,0,0),
        deliveryDate: new Date(0,0,0),
        statusId: 0,
        statusName: "",
        description: "",
        orderNumber: 0,
        orderYear: 0,
        packages: []
    }
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
        case FETCHED_ORDER:{
            return{
                ...state, 
                isLoading: false,
                fetchNeeded: false,
                errorCode: 0,
                orderView: action.payload
            }
        }
        case FETCH_DATA:{
            return{
                ...state,
                isLoading: true
            }
        }
        case PRINTING_NOTIFICATION:{
            let packageIndex = state.orderView.packages.findIndex(p=>p.packageId === action.payload.packageId);
            let newView = {...state.orderView};
            if(packageIndex > 0){
                newView.packages[packageIndex].printingUrl = action.payload.fileUrl;
            }
            return{
                ...state,
                orderView: newView
            }
        }
        case PACKAGE_PROGRESS_NOTIFCATION:{
            let packageIndex = state.orderView.packages.findIndex(p=>p.packageId === action.payload.packageId);
            let newView = {...state.orderView};
            if(packageIndex > 0){
                newView.packages[packageIndex].progress = action.payload.progress;
            }
            return{
                ...state,
                orderView : newView
            }
        }
        default:{
            return state;
        }
    }
}