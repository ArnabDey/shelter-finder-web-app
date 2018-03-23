import {SELECT_PLACE, ON_START, FILTERED, ON_SIGNIN} from '../actions/index';

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
    }
    return state;
}