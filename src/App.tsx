import React from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import CoreModule from './core.module/CoreModule';
import LocationModule from './location.module/LocationModule';
import OrdersModule from './orders.module/OrdersModule';
import AppNavbar from './shared/components/appNavBar/AppNavBar';
import UsersModule from './user.module/UsersModule';


const App = () => {
  return (
    <Router>
      <AppNavbar/>
      <Route Route path="/flow" exact component={CoreModule} />
      <Route Route path="/locations" exact component={LocationModule}/>
      <Route Route path="/orders" exact component={OrdersModule}/>
      <Route Route path="/users" exact component={UsersModule}/>
    </Router>
  );
};

export default App;
