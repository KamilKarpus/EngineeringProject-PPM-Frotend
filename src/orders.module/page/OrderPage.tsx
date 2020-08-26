import React, { useEffect } from 'react';
import { OrderShortView } from '../models/OrderShortView';
import { PaginationList } from '../../shared/model/Pagination';
import { Table } from 'reactstrap';
import { isNullOrUndefined } from 'util';
import PagePagination from '../../shared/components/paginations/Pagination';
import { connect } from 'react-redux';
import { AppState } from '../reducers';
import SideMenu from '../componets/sideMenu/SideMenu';
import { useHistory } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { fetchOrdersList } from '../repositories/thunk-actions/OrderActions-Thunk';
import OrderList from '../componets/orderList/OrderList';
import LoadingSpinner from '../../shared/components/Spinner';
interface StateProps{
    fetchNeeded: boolean;
    isLoading: boolean;
}
interface DispatchProps{
    getOrders(pageNumber : number , pageSize : number) : Promise<PaginationList<OrderShortView>>
}

type props = StateProps & DispatchProps;


const OrdersPage :React.FC<props> = (props) =>{
    const history = useHistory();
    const [currentPage, setPage] = React.useState<number>(1);
    const [pagination, setPagination] = React.useState<number[]>();
    const   [orders, setOrderList] = React.useState<PaginationList<OrderShortView>>();
    useEffect(()=>{
        props.getOrders(1, 10)
        .then(result => {
            setOrderList(result);
            setPage(1);
            generatePagination(result);
        });
    },[]);

    useEffect(()=>{
        if(props.fetchNeeded === true){
        props.getOrders(currentPage, 10)
        .then(result => {
            setOrderList(result);
            setPage(currentPage);
            generatePagination(result);
        });
    }
    },[props.fetchNeeded]);

    const generatePagination = (result : PaginationList<OrderShortView>) => {
        let pagginationElements = [];
        if(!isNullOrUndefined(result)){
        for(let i = 0;i<result!.totalPages;i++){
                pagginationElements.push(i+1);
            }
            setPagination(pagginationElements);
        }
 
    }
    const loadPage = (page: number) =>{
        if(page >= 1 && page <= orders!.totalPages) 
        {
        props.getOrders(page, 10)
        .then(result => {
            setOrderList(result);
            setPage(page);
            generatePagination(result);
        });
        }
    }

    const navigateToOrder = (orderId : string)=>{
        history.push(`/orders/${orderId}/`, {id: orderId});
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
        <div className="content-container">
        {
        orders !== undefined ?
        <OrderList list={orders as PaginationList<OrderShortView>}
                       pagination = {pagination as number[]}
                       loadNext = {loadNext}
                       loadPrevious = {loadPrevious}
                       loadPage = {loadPage}
                       navigateToOrder={navigateToOrder} /> : <LoadingSpinner message="Trwa ładowanie listy zamówień..."/>
        }
        </div>
        </div>    
    )
}
const mapDispatch = (
    dispatch: ThunkDispatch<AppState, any, AnyAction>
)=> {
    return{
        getOrders: (pageNumber : number , pageSize : number) => (
            dispatch(fetchOrdersList(pageSize, pageNumber)))

  }
}
  const mapStateToProps = (store: AppState) => {
    return {
        isLoading: store.orderState.isLoading,
        fetchNeeded: store.orderState.fetchNeeded
    };
  };
export default connect(
    mapStateToProps,
    mapDispatch
  )(OrdersPage);

