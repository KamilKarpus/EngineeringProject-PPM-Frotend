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
import { fetchOrder, subscribeToOrdersResource, subscribeToResource } from '../../repositories/thunk-actions/OrderActions-Thunk';
import { requestPackagePrinting } from '../../repositories/thunk-actions/PrintingActions-Thunk';

interface StateProps{
  fetchNeeded: boolean;
  isLoading: boolean;
  orderView: OrderView;
}
interface DispatchProps{
  getOrder(orderId: string) : void;
  subscribeToResource(orderId :string) : void;
  requestPrinting(packageId: string): void;
  subscribeToPackageResource(orderId: string) : void;
}

type props = StateProps & DispatchProps;

const OrderInfoPage : React.FC<props> = (props) =>{
    const history = useHistory();
    useEffect(()=>{
        props.subscribeToResource(history.location.state.id);
        props.getOrder(history.location.state.id);
        props.subscribeToPackageResource(history.location.state.id);
    },[]);
    useEffect(()=>{
      if(props.fetchNeeded === true){
      props.getOrder(history.location.state.id);
      }
      },[props.fetchNeeded]);
    return( 
      <div className="flex-container">
        <div className="menu-left">
            <InfoSideMenu/>
        </div>
        { !props.isLoading ? <OrderInfo order={props.orderView} requestPrinting={props.requestPrinting}/> : <LoadingSpinner message="Trwa ładowanie zamówienia..."/>  }
      </div>
);
}
const mapDispatch = (
  dispatch: ThunkDispatch<AppState, any, AnyAction>
)=> {
  return{
      getOrder: (orderId : string) => (
          dispatch(fetchOrder(orderId))
      ),
      subscribeToResource: (orderId: string)=>(
        dispatch(subscribeToResource(orderId))
      ),
      requestPrinting: (packageId: string)=>(
        dispatch(requestPackagePrinting(packageId))
      ),
      subscribeToPackageResource :(orderId : string)=>(
        dispatch(subscribeToOrdersResource(orderId))
      )
  }
}
const mapStateToProps = (store: AppState) => {
  return {
      isLoading: store.orderState.isLoading,
      fetchNeeded: store.orderState.fetchNeeded,
      orderView: store.orderState.orderView
  };
};
export default connect(
  mapStateToProps,
  mapDispatch
)(OrderInfoPage);

