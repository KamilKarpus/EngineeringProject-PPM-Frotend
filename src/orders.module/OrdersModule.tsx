import React from 'react';
import { Provider } from 'react-redux';
import  ModuleApp  from './ModuleApp';
import { configureStore } from './reducers';
const store = configureStore();

const OrdersModule = () =>{
    return(
    <Provider store={store}>
        <ModuleApp/>
    </Provider>
    );
}

export default OrdersModule;