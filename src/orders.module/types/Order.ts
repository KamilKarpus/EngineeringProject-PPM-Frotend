import { OrderView } from "../models/OrderView";


export interface OrderState{
    isLoading : boolean;
    fetchNeeded : boolean,
    loadingMessage: string;
    errorCode: number;
    orderView : OrderView;
}