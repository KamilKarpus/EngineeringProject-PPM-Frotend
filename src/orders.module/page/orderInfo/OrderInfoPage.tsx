import React, { useEffect } from 'react';
import { OrdersRepository } from '../../repositories/OrdersRepository';
import { useHistory } from 'react-router-dom';
import { OrderView } from '../../models/OrderView';
import InfoSideMenu from '../../componets/infoSideMenu/InfoSideMenu';
import { OrderState } from '../../types/Order';
import { AppState } from '../../reducers';
import { useSelector } from 'react-redux';
import OrderInfo from '../../componets/orderInfo/OrderInfo';

const OrderInfoPage = () =>{
    const state: OrderState = useSelector((state: AppState) => state.orderState);
    const [order, setOrder] = React.useState<OrderView>();
    const repository = new OrdersRepository();
    const history = useHistory();
    console.log(order);
    useEffect(()=>{
        repository.GetOrder(history.location.state.id)
        .then(p=>{
            setOrder(p);
        })
    },[]);
    useEffect(()=>{
      if(state.fetchNeeded === true){
      repository.GetOrder(history.location.state.id)
      .then(p=>{
          setOrder(p);
        })
      }
      },[state.fetchNeeded]);
    return( 
      <div className="flex-container">
        <div className="menu-left">
            <InfoSideMenu/>
        </div>
        { order !== undefined ? <OrderInfo order={order as OrderView}/> : ""  }
      </div>
);
}
export default OrderInfoPage;