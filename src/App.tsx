import React from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import CoreModule from './core.module/CoreModule';
import LocationModule from './location.module/LocationModule';


const App = () => {
  return (
    <Router>
      <Route Route path="/flow" exact component={CoreModule} />
      <Route Route path="/locations" exact component={LocationModule}/>
    </Router>
  );
};

export default App;
