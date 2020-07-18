import React from 'react';
import { Provider } from "react-redux";
import { configureStore } from './reducers';
import AddFlow from './componets/addFlow/AddFlow';
import { Route, BrowserRouter as Router } from "react-router-dom";
import AddSteps from './componets/addSteps/AddSteps';
import { ErrorMessages } from './ErrorMessage';
import './coreModule.css';
import StepList from './componets/stepList/StepsListComponent';
import StepSummary from './componets/stepSummary/StepSummary';

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
        <Route path="/flow" exact component={AddFlow} />
        <Route path="/flow/:id/steps" component={AddSteps} />
        <Route path="/flow/:id/summary" component={StepSummary}/>
      </div>
    </div>
    </Router>
  </Provider>
  );
};
export default CoreModule;


