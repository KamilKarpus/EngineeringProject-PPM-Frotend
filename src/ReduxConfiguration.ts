import { AuthState } from "./authGuard/redux/AuthState";
import { authReducer } from "./authGuard/redux/Reducer";
import { Store, combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { History, createBrowserHistory } from 'history';


export const history = createBrowserHistory();

export type AppState = {
    auth: AuthState,

}
const rootReducer = (history: History) => combineReducers({
    auth: authReducer,
    
});

export function configureStore(): Store {
    const store = createStore(rootReducer(history), undefined, applyMiddleware(thunk));
    return store;
  }