import React from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";
import UsersPage from './pages/UsersPage';

const ModuleApp = () =>{
    return(
        <Router>
            <Route path="/users" exact component={UsersPage} />
        </Router>
    )
};

export default ModuleApp;