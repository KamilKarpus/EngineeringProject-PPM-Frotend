import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { OrderView } from '../../models/OrderView';
import InfoSideMenu from '../../componets/infoSideMenu/InfoSideMenu';
import OrderInfo from '../../componets/orderInfo/OrderInfo';
import LoadingSpinner from '../../../shared/components/Spinner';
import { connect } from 'react-redux';
import { AppState } from '../../reducers';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { fetchOrder } from '../../repositories/thunk-actions/OrderActions-Thunk';

interface StateProps{
  fetchNeeded: boolean;
  isLoading: boolean;
}
interface DispatchProps{
  getOrder(orderId: string) : Promise<OrderView>
}

type props = StateProps & DispatchProps;

const OrderInfoPage : React.FC<props> = (props) =>{
    const [order, setOrder] = React.useState<OrderView>();
    const history = useHistory();
    useEffect(()=>{
        props.getOrder(history.location.state.id)
        .then(p=>{
            setOrder(p);
        })
    },[]);
    useEffect(()=>{
      if(props.fetchNeeded === true){
      props.getOrder(history.location.state.id)
      .then(p=>{
          setOrder(p);
        })
      }
      },[props.fetchNeeded]);
    return( 
      <div className="flex-container">
        <div className="menu-left">
            <InfoSideMenu/>
        </div>
        { order !== undefined ? <OrderInfo order={order as OrderView}/> : <LoadingSpinner message="Trwa ładowanie zamówienia..."/>  }
      </div>
);
}
const mapDispatch = (
  dispatch: ThunkDispatch<AppState, any, AnyAction>
)=> {
  return{
      getOrder: (orderId : string) => (
          dispatch(fetchOrder(orderId))
      )
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
)(OrderInfoPage);

