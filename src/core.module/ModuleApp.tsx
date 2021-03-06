import React from 'react';
import AddFlow from './componets/addFlow/AddFlow';
import { Route, BrowserRouter as Router } from "react-router-dom";
import AddSteps from './componets/addSteps/AddSteps';
import './coreModule.css';
import StepList from './componets/stepList/StepsListComponent';
import StepSummary from './componets/stepSummary/StepSummary';
import { useSelector } from 'react-redux';
import SideMenu from './componets/menu/MenuComponent';
import FlowList from './componets/flowList/flowListComponent';
import { AppState } from './reducers';

const ModuleApp = () =>{
    const menu: number = useSelector((state: AppState) => state.menu);
    return(
    <Router>
    <div className="flex-container">
      <div className="steps">
        {menu == 1 &&  <StepList/>}
        {menu == 2 && <SideMenu/>}
      </div>
      <div className="content-container">
        <Route path="/flowadd" exact component={AddFlow} />
        <Route path="/flowadd/:id/steps" component={AddSteps} />
        <Route path="/flowadd/:id/summary" component={StepSummary}/>
        <Route path="/flow" component={FlowList} />
      </div>
    </div>
    </Router>);
}

export default ModuleApp;