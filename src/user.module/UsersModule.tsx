import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './reducers';
import ModuleApp from './ModuleApp';

const store = configureStore();
const UsersModule = () =>{
    return(
    <Provider store={store}>
        <ModuleApp/>
    </Provider>
    );
}

export default UsersModule;