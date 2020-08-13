import { combineReducers, Store, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { connectRouter } from "connected-react-router";
import { History, createBrowserHistory } from 'history';
import { OrderState } from "../types/Order";
import { orderReducer } from "./OrderReducers";



export const history = createBrowserHistory()

export type AppState = {
    orderState : OrderState
}
const rootReducer = (history: History) => combineReducers({
    orderState : orderReducer,
    router: connectRouter(history),
});

export function configureStore(): Store {
    const store = createStore(rootReducer(history), undefined, applyMiddleware(thunk.withExtraArgument(history)));
    return store;
  }