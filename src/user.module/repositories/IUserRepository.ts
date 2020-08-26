import { AddUser } from "../models/AddUserModule";
import { ResponseId } from "../models/ResponseId";
import UserShortModel from "../models/UserShortModel";
import { PaginationList } from "../../shared/model/Pagination";
import { UserView } from "../models/UserView";
import { PermissionModel } from "../models/PermissionModel";

export interface IUserRepository{
    Add(user : AddUser) : Promise<ResponseId>;
    GetList(pageNumber : number, pageSize : number) : Promise<PaginationList<UserShortModel>>;
    GetUser(id: string) : Promise<UserView>;
    UpdatePermissions(userId: string, permissions : PermissionModel) : Promise<void>;
}