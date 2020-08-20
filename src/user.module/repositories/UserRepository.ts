import { HttpClient } from "../../shared/HttpClient";
import { Environment } from "../../environment";
import { PaginationList } from "../../shared/model/Pagination";
import UserShortModel from "../models/UserShortModel";
import { AddUser } from "../models/AddUserModule";
import { ResponseId } from "../models/ResponseId";

export default class UserRepository{
    private apiUrl : string = `${Environment.apiUrl}/users`;
    private httpClient : HttpClient = new HttpClient();

    async GetList(pageNumber : number, pageSize : number) : Promise<PaginationList<UserShortModel>>{
        return await this.httpClient.Get<PaginationList<UserShortModel>>(this.apiUrl + `?PageNumber=${pageNumber}&PageSize=${pageSize}`);
    }
    async Add(user : AddUser) : Promise<ResponseId>{
        return this.httpClient.Post<AddUser, ResponseId>(this.apiUrl, user);
    } 
} 