import { Environment } from "../../environment";
import { HttpClient } from "../../shared/HttpClient";
import { ResponseId } from "../models/ResponseId";
import { AddOrder } from "../models/AddOrder";
import { OrderShortView } from "../models/OrderShortView";
import { PaginationList } from "../../shared/model/Pagination";
import { OrderView } from "../models/OrderView";

export class OrdersRepository{

    private apiUrl : string = `${Environment.apiUrl}/orders`;
    private httpClient : HttpClient = new HttpClient();

    async Add(order : AddOrder) : Promise<ResponseId>{
        return this.httpClient.Post<AddOrder, ResponseId>(this.apiUrl, order);
    } 
    async GetOrders(pageNumber : number, pageSize : number) : Promise<PaginationList<OrderShortView>>{
        return await this.httpClient.Get<PaginationList<OrderShortView>>(this.apiUrl + `?PageNumber=${pageNumber}&PageSize=${pageSize}`);
    }
    async GetOrder(orderId : string) : Promise<OrderView>{
        return await this.httpClient.Get<OrderView>(this.apiUrl + `/${orderId}`);
    }
    
}