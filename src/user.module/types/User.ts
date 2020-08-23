import { PaginationList } from "../../shared/model/Pagination";
import UserShortModel from "../models/UserShortModel";

export interface UsersState{
    isLoading : boolean,
    fetchNeeded : boolean,
    errorCode : number,
}