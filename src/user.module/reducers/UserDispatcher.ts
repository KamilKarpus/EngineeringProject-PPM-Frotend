import { Dispatch } from "redux";
import { addUser, FETCHED_DATA } from "../actions/UsersActions";
import UserRepository from "../repositories/UserRepository";
import { PaginationList } from "../../shared/model/Pagination";
import UserShortModel from "../models/UserShortModel";
import { FETCH_NEEDED } from "../../core.module/actions/StepsAction";

export class UserDispatcher {
    
    private readonly dispatch: Dispatch<any>;
    private readonly repository: UserRepository;
    constructor(dispatch: Dispatch<any>, repository : UserRepository){
        this.dispatch = dispatch; 
        this.repository = repository;
    }

    addNewUser = (login: string, password: string, firstName: string, lastName: string,
        jobPosition: string) =>{
        this.dispatch(addUser(login, password, firstName, lastName, jobPosition));
    }
    getUserList = async (pageNumber : number, pageSize : number) : Promise<PaginationList<UserShortModel>>=>{
       const users = await this.repository.GetList(pageNumber, pageSize);
       await this.dispatch({type: FETCHED_DATA});
       return users;

    } 
}