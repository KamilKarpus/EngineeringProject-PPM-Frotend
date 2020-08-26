import React from 'react';
import { Table } from 'reactstrap';
import PagePagination from '../../../shared/components/paginations/Pagination';
import { PaginationList } from '../../../shared/model/Pagination';
import { OrderShortView } from '../../models/OrderShortView';
type Props = {
    list : PaginationList<OrderShortView>,
    loadPage(number : number) : void,
    loadPrevious() : void,
    loadNext() : void,
    pagination : number[],
    navigateToOrder(id: string) : void
}
const OrderList : React.FC<Props> =(props) =>{
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
                    {props.list.items.map(order =>(
                        <tr key={order.id} onClick={()=>{props.navigateToOrder(order.id)}}>
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
                    <PagePagination loadPage={props.loadPage} loadPrevious={props.loadPrevious} loadNext={props.loadNext} totalPage={props.list.totalCount}
                    activePage = {props.list.currentPage} paginations={props.pagination as number[]}  />
                </div>
            </div>
    )
}
export default OrderList;