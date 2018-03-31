import {SELECT_PLACE, ON_START, FILTERED, ON_SIGNIN, RESERVE, LOG_OUT} from '../actions/index';

export default function(state = null, action) {
    switch(action.type){
        case FILTERED:
            return action.payload;
        case SELECT_PLACE:
            return action.payload;
        case ON_START:
            return action.payload;
        case ON_SIGNIN:
            return action.payload;
        case RESERVE:
            return action.payload;
        case LOG_OUT:
            state = undefined;
            return undefined;
        default:
    }
    return state;
}