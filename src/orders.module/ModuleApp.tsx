import React from 'react';
import OrdersPage from './page/OrderPage';
import { Route, BrowserRouter as Router } from "react-router-dom";
import OrderInfoPage from './page/orderInfo/OrderInfoPage';
const ModuleApp = () =>{
    return(
        <Router>
        <div>
            <Route path="/orders" exact component={OrdersPage} />
            <Route path="/orders/:id" exact component={OrderInfoPage} />
        </div>
        </Router>
    )
};

export default ModuleApp;