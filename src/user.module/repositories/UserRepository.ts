import { HttpClient } from "../../shared/HttpClient";
import { Environment } from "../../environment";
import { PaginationList } from "../../shared/model/Pagination";
import UserShortModel from "../models/UserShortModel";
import { AddUser } from "../models/AddUserModule";
import { ResponseId } from "../models/ResponseId";
import { IUserRepository } from "./IUserRepository";
import { UserView } from "../models/UserView";
import { PermissionModel } from "../models/PermissionModel";
import AuthClient from "../../shared/AuthClient";

export default class UserRepository implements IUserRepository{
    private apiUrl : string = `${Environment.apiUrl}/api/users`;
    private httpClient : AuthClient

    constructor(httpClient : AuthClient) {
        this.httpClient = httpClient;
    }

    async GetList(pageNumber : number, pageSize : number) : Promise<PaginationList<UserShortModel>>{
        return await this.httpClient.Get<PaginationList<UserShortModel>>(this.apiUrl + `?PageNumber=${pageNumber}&PageSize=${pageSize}`);
    }
    async Add(user : AddUser) : Promise<ResponseId>{
        return this.httpClient.Post<AddUser, ResponseId>(this.apiUrl, user);
    } 
    async GetUser(id: string) : Promise<UserView>{
        return this.httpClient.Get<UserView>(this.apiUrl+`/`+id);
    }
    async UpdatePermissions(userId: string, permissions : PermissionModel) : Promise<void>{
        return this.httpClient.Put<PermissionModel>(`${this.apiUrl}/${userId}/permissions`, permissions);
    }
} 

