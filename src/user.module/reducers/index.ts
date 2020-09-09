import { combineReducers, Store, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { connectRouter } from "connected-react-router";
import { History, createBrowserHistory } from 'history';
import { UsersState } from "../types/User";
import { usersReducer } from "./UserReducer";
import UserRepository from "../repositories/UserRepository";
import AuthClient from "../../shared/AuthClient";


export const history = createBrowserHistory()


const httpClient = new AuthClient();
const userRepository = new UserRepository(httpClient);

export type AppState = {
    users: UsersState
}
const rootReducer = (history: History) => combineReducers({
    users : usersReducer,
    router: connectRouter(history),
});

export function configureStore(): Store {
    const store = createStore(rootReducer(history), undefined, applyMiddleware(thunk.withExtraArgument(userRepository)));
    return store;
  }