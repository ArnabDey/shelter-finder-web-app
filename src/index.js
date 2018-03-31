import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react';
import 'bootstrap/dist/css/bootstrap.min.css';

import reducers from './reducers';
import Entry from './components/Entry';
import MainScreen from './containers/MainScreen';
import MapShelters from './containers/MapShelters';
import Register from './containers/Register';
import Reservations from './containers/Reservations';
import Reserve from './containers/Reserve';
import SignIn from './containers/SignIn';
import LocationInfo from './containers/LocationInfo';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);


const config = {
  key: 'root',
  storage,
}

let persistR = persistReducer(config, reducers);

let store = createStoreWithMiddleware(persistR);
let persistor = persistStore(store)

ReactDOM.render(
    <Provider store={store}>
    <PersistGate  persistor={persistor}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/mainscreen" component={MainScreen} />
                    <Route path="/mapshelter" component={MapShelters} />
                    <Route path="/reservations" component={Reservations}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/reserve" component={Reserve}/>
                    <Route path="/signin" component={SignIn}/>
                    <Route path="/place" component={LocationInfo}/>
                    <Route path="/" component={Entry}/>
                </Switch>
            </div>
        </BrowserRouter>
    </PersistGate>
    </Provider>
    , document.getElementById('root'));
