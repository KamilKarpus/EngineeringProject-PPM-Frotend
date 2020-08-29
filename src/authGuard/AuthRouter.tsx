import { Redirect, Route } from "react-router-dom";
import React, { useState } from "react";

import { AppState } from "../ReduxConfiguration";
import { useSelector } from "react-redux";

const AuthRoute = ({component, permission, ...rest}: any) => {
    const { permissions } = useSelector((state: AppState) => state.auth);
    const hasRights = ()=>{
        const right = permissions.find(p=> permission === p);
        return right ? true : false;
    }
    const routeComponent = (props: any) => (
            hasRights()
            ? React.createElement(component, props)
            : <Redirect to={{pathname: '/login'}}/>
    );
    return <Route {...rest} render={routeComponent}/>;
};
export default AuthRoute;