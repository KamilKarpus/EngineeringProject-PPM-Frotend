import React from 'react';
import './styles.css';
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import { configureStore } from './reducers';
import { StepList } from './componets/stepList/StepsListComponent';
import AddFlow from './componets/addFlow/AddFlow';
import { Route, BrowserRouter as Router } from "react-router-dom";
import AddSteps from './componets/addSteps/AddSteps';
import { ErrorMessages } from './ErrorMessage';

const store = configureStore();
const CoreModule = () => {
  ErrorMessages.Initialize();
  return (
    <Provider store={store}>
    <Router>
    <div className="flex-container">
      <div className="steps">
        <StepList/>
      </div>
      <div className="content-container">
        <div>
        <Route path="/flow" exact component={AddFlow} />
        <Route path="/flow/:id/steps" component={AddSteps} />
        </div>
      </div>
    </div>
    </Router>
  </Provider>
  );
};
export default CoreModule;


