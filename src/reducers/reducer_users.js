import {ON_SIGNIN, REGISTER, CURR_USER} from '../actions/index';

export default function(state = null, action) {
    switch(action.type){
        case ON_SIGNIN:
            return action.payload;
        case REGISTER:
            return action.payload;
        case CURR_USER:
            return action.payload;
    }
    return state;
}