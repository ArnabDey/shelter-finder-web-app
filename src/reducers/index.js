import { combineReducers } from 'redux';
import placesReducer from './reducer_places';
import usersReducer from './reducer_users';
import reserveReducer from './reducer_reservation';
import { reducer as formReducer } from 'redux-form';


const rootReducer = combineReducers({
    reservation: reserveReducer,
    places: placesReducer,
    users: usersReducer,
    form: formReducer

});

export default rootReducer;