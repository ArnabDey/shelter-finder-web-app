import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'


import reducers from './reducers';
import Entry from './components/Entry';
import MainScreen from './containers/MainScreen';
import Profile from './components/Profile';
import Register from './components/Register';
import Reserve from './containers/Reserve';
import SignIn from './containers/SignIn';
import LocationInfo from './containers/LocationInfo';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);


ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/profile" component={Profile} />
                <Route path="/mainscreen" component={MainScreen} />
                <Route path="/register" component={Register}/>
                <Route path="/reserve" component={Reserve}/>
                <Route path="/signin" component={SignIn}/>
                <Route path="/place" component={LocationInfo}/>
                <Route path="/" component={Entry}/>
            </Switch>
        </div>
    </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
