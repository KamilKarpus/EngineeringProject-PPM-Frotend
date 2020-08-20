import { AddUser } from "../models/AddUserModule";
import { ResponseId } from "../models/ResponseId";
import UserShortModel from "../models/UserShortModel";
import { PaginationList } from "../../shared/model/Pagination";

export interface IUserRepository{
    Add(user : AddUser) : Promise<ResponseId>;
    GetList(pageNumber : number, pageSize : number) : Promise<PaginationList<UserShortModel>>;
}