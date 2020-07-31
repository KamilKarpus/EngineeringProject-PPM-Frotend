import React from 'react';
import AddLocationPage from './page/LocationsPage';
import { ErrorMessages } from './ErrorMessage';

export const ModuleApp = () =>{
    ErrorMessages.Initialize();
    return(
        <div>
            <AddLocationPage/>
        </div>
    )
}