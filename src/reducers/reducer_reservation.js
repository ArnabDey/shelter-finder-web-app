import { GET_RESERVE, LOG_OUT } from '../actions/index';

export default function(state = null, action) {
    switch(action.type){
        case GET_RESERVE:
            return action.payload;
        case LOG_OUT:
            state = undefined;
            return undefined;
        default:
    }
    return state;
}