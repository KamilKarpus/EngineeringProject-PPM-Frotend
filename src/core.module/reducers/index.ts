import { createBrowserHistory, History } from "history";
import { ProductionFlow } from "../types/productionFlow";
import { StepsState } from "../types/Step";
import { combineReducers, Store, createStore, applyMiddleware } from "redux";
import { productionFlowReducer } from "./productionFlowReducers";
import { stepReducer } from "./StepsReducers";
import { currentStepReducer } from "./CurrentStepReducer";
import { moduleReducer } from "./moduleReducer";
import { connectRouter } from "connected-react-router";
import thunk from "redux-thunk";

export const history = createBrowserHistory();

export type AppState = {
    productionFlow : ProductionFlow;
    stepsState : StepsState;
    currentStep : number;
    menu: number;
}
const rootReducer = (history: History) => combineReducers({
    productionFlow : productionFlowReducer,
    stepsState : stepReducer,
    currentStep : currentStepReducer,
    menu: moduleReducer,
    router: connectRouter(history)
    
});

export function configureStore(): Store {
    const store = createStore(rootReducer(history), undefined, applyMiddleware(thunk));
    return store;
  }