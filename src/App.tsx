import React from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import CoreModule from './core.module/CoreModule';
import LocationModule from './location.module/LocationModule';
import OrdersModule from './orders.module/OrdersModule';
import AppNavbar from './shared/components/appNavBar/AppNavBar';
import UsersModule from './user.module/UsersModule';
import { Provider } from 'react-redux';
import { configureStore } from './ReduxConfiguration';
import HomePage from './homePage/HomePage';
import AuthRoute from './authGuard/AuthRouter';
import { View, EditFlow, EditLocation, ManageUsers } from './user.module/models/PermissionService';
import LoginPage from './loginPage/LoginPage';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <AppNavbar/>
      <AuthRoute Route path="/" exact component={HomePage} permission={View}/>
      <AuthRoute Route path="/flow" exact component={CoreModule} permission={EditFlow} />
      <AuthRoute Route path="/locations" exact component={LocationModule} permission={EditLocation}/>
      <AuthRoute Route path="/orders" exact component={OrdersModule} permission={View}/>
      <AuthRoute Route path="/users" exact component={UsersModule} permission={ManageUsers}/>
      <Route Route path="/login" exact component={LoginPage} />
    </Router>
    </Provider>
  );
};

export default App;
