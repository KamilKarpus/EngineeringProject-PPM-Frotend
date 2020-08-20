import React, { useEffect } from 'react';
import SideMenu from '../components/sideMenu/SideMenu';
import UserRepository from '../repositories/UserRepository';
import UserShortModel from '../models/UserShortModel';
import { PaginationList } from '../../shared/model/Pagination';
import { isNullOrUndefined } from 'util';
import UserList from '../components/userList/UserList';
import LoadingSpinner from '../../shared/components/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { UsersState } from '../types/User';
import { AppState } from '../reducers';
import { UserDispatcher } from '../reducers/UserDispatcher';

const UsersPage = () =>{
    const repository = new UserRepository();
    const dispatch = useDispatch();
    const dispatcher = new UserDispatcher(dispatch, repository);
    const [currentPage, setPage] = React.useState<number>(1);
    const [pagination, setPagination] = React.useState<number[]>();
    const [users, setUsers] = React.useState<PaginationList<UserShortModel>>();
    const state: UsersState = useSelector((state: AppState) => state.users);
    useEffect(()=>{
        dispatcher.getUserList(1, 10)
        .then(result => {
            setUsers(result);
            setPage(1);
            generatePagination(result);
        });
    },[]);

    useEffect(()=>{
        if(state.fetchNeeded === true){
            dispatcher.getUserList(1, 10)
            .then(result => {
                setUsers(result);
                setPage(1);
                generatePagination(result);
            });
        }
    },[state.fetchNeeded]);

    const generatePagination = (result : PaginationList<UserShortModel>) => {
        let pagginationElements = [];
        if(!isNullOrUndefined(result)){
        for(let i = 0;i<result!.totalPages;i++){
                pagginationElements.push(i+1);
            }
            setPagination(pagginationElements);
        }
 
    }
    const loadPage = (page: number) =>{
        if(page >= 1 && page <= users!.totalPages) 
        {
        dispatcher.getUserList(1, 10)
        .then(result => {
            setUsers(result);
            setPage(page);
            generatePagination(result);
        });
        }
    }

    const loadNext = ()=>{
        loadPage(currentPage + 1)
    }
    const loadPrevious = ()=>{
        loadPage(currentPage - 1);
    }
    return(
        <div className="flex-container">
        <div className="menu-left">
            <SideMenu/>
        </div>
            {users !== undefined ?            
            <UserList list={users as PaginationList<UserShortModel>}
                       pagination = {pagination as number[]}
                       loadNext = {loadNext}
                       loadPrevious = {loadPrevious}
                       loadPage = {loadPage} /> : <LoadingSpinner message="Trwa ładowanie listy użytkowników..."/> }
                    
        </div>    
    );
}

export default UsersPage;