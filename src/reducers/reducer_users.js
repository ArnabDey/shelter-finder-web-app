import {ON_SIGNIN, REGISTER, CURR_USER, CHECK_IN, CHECK_OUT} from '../actions/index';

export default function(state = null, action) {
    switch(action.type){
        case ON_SIGNIN:
            return action.payload;
        case REGISTER:
            return action.payload;
        case CURR_USER:
            return action.payload;
        case CHECK_IN:
            return action.payload;
        case CHECK_OUT:
            return action.payload;
    }
    return state;
}