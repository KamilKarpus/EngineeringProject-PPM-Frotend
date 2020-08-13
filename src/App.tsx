import React from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import CoreModule from './core.module/CoreModule';
import LocationModule from './location.module/LocationModule';
import OrdersModule from './orders.module/OrdersModule';


const App = () => {
  return (
    <Router>
      <Route Route path="/flow" exact component={CoreModule} />
      <Route Route path="/locations" exact component={LocationModule}/>
      <Route Route path="/orders" exact component={OrdersModule}/>
    </Router>
  );
};

export default App;
