import { combineReducers } from 'redux';
import placesReducer from './reducer_places';

const rootReducer = combineReducers({
    places: placesReducer
});

export default rootReducer;