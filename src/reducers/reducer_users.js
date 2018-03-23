import {ON_SIGNIN} from '../actions/index';

export default function(state = null, action) {
    switch(action.type){
        case ON_SIGNIN:
            return action.payload;
    }
    return state;
}