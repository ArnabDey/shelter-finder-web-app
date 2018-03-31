import { GET_RESERVE } from '../actions/index';

export default function(state = null, action) {
    switch(action.type){
        case GET_RESERVE:
            return action.payload;
    }
    return state;
}