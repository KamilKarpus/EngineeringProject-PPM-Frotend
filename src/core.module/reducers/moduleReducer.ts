import { Actions, MENU_CHANGE } from "../actions/moduleActions";


export function moduleReducer(state : number = 1, action : Actions) {
    switch(action.type){
        case MENU_CHANGE:{
            return action.payload;
        }
        default:{
            return state;
        }
    }

}