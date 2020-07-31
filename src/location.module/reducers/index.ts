import { combineReducers, Store, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { connectRouter } from "connected-react-router";
import { History, createBrowserHistory } from 'history';
import { LocationState } from "../types/LocationState";
import { locationReducer } from "./LocationReducers";



export const history = createBrowserHistory()

export type AppState = {
    Location : LocationState
}

const rootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    Location: locationReducer
});

export function configureStore(): Store {
    const store = createStore(rootReducer(history), undefined, applyMiddleware(thunk.withExtraArgument(history)));
    return store;
  }