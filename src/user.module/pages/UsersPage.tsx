import React, { useEffect } from 'react';
import SideMenu from '../components/sideMenu/SideMenu';
import UserShortModel from '../models/UserShortModel';
import { PaginationList } from '../../shared/model/Pagination';
import { isNullOrUndefined } from 'util';
import UserList from '../components/userList/UserList';
import LoadingSpinner from '../../shared/components/Spinner';
import { AppState } from '../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { fetchUserList } from '../repositories/thunk-actions/UserActions';
import { connect } from 'react-redux';
import EditUserPermissions from '../components/editUserPermissions/EditUserPermissions';

interface StateProps {
    isLoading : boolean;
    fetchNeeded : boolean;
}

interface DispatchProps {
    getUserList(pageNumber : number , pageSize : number) : Promise<PaginationList<UserShortModel>>
}


type Props = DispatchProps & StateProps;


const UsersPage = (props : Props) =>{
    const [isOpen, setOpen] = React.useState(false);
    const [userId, setUserId] = React.useState("");
    const [currentPage, setPage] = React.useState<number>(1);
    const [pagination, setPagination] = React.useState<number[]>();
    const [users, setUsers] = React.useState<PaginationList<UserShortModel>>();
    useEffect(()=>{
        props.getUserList(1, 10)
        .then(result => {
            setUsers(result);
            setPage(1);
            generatePagination(result);
        });
    },[]);

    const closePopup = ()=> setOpen(false);
    const openPopup = () => setOpen(true); 

    useEffect(()=>{
        if(props.fetchNeeded === true){
            props.getUserList(1, 10)
            .then(result => {
                setUsers(result);
                setPage(1);
                generatePagination(result);
            });
        }
    },[props.fetchNeeded]);

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
        props.getUserList(page, 10)
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
    const editUserPermissions = (id: string) : void=>{
        setUserId(id);
        openPopup();
    }
    return(
        <div className="flex-container">
            {
                isOpen && <EditUserPermissions isOpen={isOpen}
                            closePopup = {closePopup} userId={userId}
                            />
            }
        <div className="menu-left">
            <SideMenu/>
        </div>
            {users !== undefined ?            
            <UserList list={users as PaginationList<UserShortModel>}
                       pagination = {pagination as number[]}
                       loadNext = {loadNext}
                       loadPrevious = {loadPrevious}
                       loadPage = {loadPage}
                       editPermissions = {editUserPermissions} /> : <LoadingSpinner message="Trwa ładowanie listy użytkowników..."/> }
                    
        </div>    
    );
}
const mapDispatch = (
    dispatch: ThunkDispatch<AppState, any, AnyAction>
)=> {
    return{
        getUserList: (pageNumber : number , pageSize : number) => (
            dispatch(fetchUserList(pageSize, pageNumber)))

  }
}
  const mapStateToProps = (store: AppState) => {
    return {
        isLoading: store.users.isLoading,
        fetchNeeded: store.users.fetchNeeded
    };
  };
export default connect(
    mapStateToProps,
    mapDispatch
  )(UsersPage);

