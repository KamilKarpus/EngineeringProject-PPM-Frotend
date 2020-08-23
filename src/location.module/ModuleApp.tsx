import React from 'react';
import AddLocationPage from './page/LocationsPage';
import { ErrorMessages } from './ErrorMessage';
import SideMenu from './components/sideMenu/SideMenu';
import './ModuleApp.css'
export const ModuleApp = () =>{
    return(
        <div className="flex-container">
            <div className="menu-left">
                <SideMenu/>
            </div>
            <div className="content-container">
                <AddLocationPage/>
            </div>
        </div>
    )
}