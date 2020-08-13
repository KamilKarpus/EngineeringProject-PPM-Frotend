import React from 'react';
import OrdersPage from './page/OrderPage';
import SideMenu from './componets/sideMenu/SideMenu';

const ModuleApp = () =>{
    return(
        <div>
            <div className="flex-container">
            <div className="menu-left">
                <SideMenu/>
            </div>
            <div className="content-container">
                <OrdersPage/>
            </div>
            </div>
        </div>
    )
};

export default ModuleApp;