import React, { useEffect } from 'react';
import { OrderShortView } from '../models/OrderShortView';
import { PaginationList } from '../../shared/model/Pagination';
import { Table } from 'reactstrap';
import { OrdersRepository } from '../repositories/OrdersRepository';
import { isNullOrUndefined } from 'util';
import PagePagination from '../../shared/components/paginations/Pagination';
import { OrderState } from '../types/Order';
import { useSelector } from 'react-redux';
import { AppState } from '../reducers';
const initial : PaginationList<OrderShortView> ={
    currentPage: 0,
    totalPages: 0,
    pageSize: 0,
    totalCount: 0,
    items: [],
    hasPrevious: false,
    hasNext: false,
}

const OrdersPage = () =>{
    const repository = new OrdersRepository();
    const [currentPage, setPage] = React.useState<number>(1);
    const [pagination, setPagination] = React.useState<number[]>();
    const   [orders, setOrderList] = React.useState<PaginationList<OrderShortView>>(initial);
    const state: OrderState = useSelector((state: AppState) => state.orderState);
    useEffect(()=>{
        repository.GetOrders(1, 10)
        .then(result => {
            setOrderList(initial);
            setOrderList(result);
            setPage(1);
            generatePagination(result);
        });
    },[]);

    useEffect(()=>{
        if(state.fetchNeeded === true){
        repository.GetOrders(currentPage, 10)
        .then(result => {
            setOrderList(initial);
            setOrderList(result);
            setPage(currentPage);
            generatePagination(result);
        });
    }
    },[state.fetchNeeded]);

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
        repository.GetOrders(page, 10)
        .then(result => {
            setOrderList(initial);
            setOrderList(result);
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
        <div className="list">
            <Table>
                <thead>
                    <tr>
                        <th>Nazwa Firmy</th>
                        <th>Numer Zamówienia</th>
                        <th>Opis</th>
                    </tr>
                </thead>
                {orders?.items.map(order =>(
                    <tr key={order.companyName}>
                        <td scope="row">
                            {order.companyName}
                        </td>
                        <td scope="row">
                            {order.orderNumber}/{order.orderYear}
                        </td>
                        <td>
                            {order.description}
                        </td>
                    </tr>
                    
                ))}
            </Table>
            <div className="d-flex justify-content-center">
                <PagePagination loadPage={loadPage} loadPrevious={loadPrevious} loadNext={loadNext} totalPage={orders.totalCount}
                activePage = {orders.currentPage} paginations={pagination as number[]}  />
            </div>
        </div>
    )
}

export default OrdersPage;