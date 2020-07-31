import { combineReducers, Store, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { connectRouter } from "connected-react-router";
import { ProductionFlow } from "../types/productionFlow";
import { productionFlowReducer } from "./productionFlowReducers";
import { History, createBrowserHistory } from 'history';
import { StepsState } from "../types/Step";
import { stepReducer } from "./StepsReducers";
import { currentStepReducer } from "./CurrentStepReducer";
import { moduleReducer } from "./moduleReducer";
import { MenuState } from "../types/MenuState";



export const history = createBrowserHistory()

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
    const store = createStore(rootReducer(history), undefined, applyMiddleware(thunk.withExtraArgument(history)));
    return store;
  }