import firebase from 'firebase';
import axios from 'axios';


export const SELECT_PLACE = 'SELECT_PLACE';
export const ON_START = 'ON_START';
export const FILTERED = 'FILTERED';
export const ON_SIGNIN = 'ON_SIGNIN';

const config = {
    apiKey: "AIzaSyBOZISgkveD5SXntkJ3oCRn_e7jo-Wp9pM",
    authDomain: "shelterfinder-6d316.firebaseapp.com",
    databaseURL: "https://shelterfinder-6d316.firebaseio.com",
    projectId: "shelterfinder-6d316",
    storageBucket: "shelterfinder-6d316.appspot.com",
    messagingSenderId: "291949242486"
};

const data = firebase.initializeApp(config);
const db = data.database();

export function selectPlace(place) {
    const arr = [place]
    return {
        type: SELECT_PLACE,
        payload: arr
    }
};
export function getData() {
    return function(disptach) {
        return axios.get('https://shelterfinder-6d316.firebaseio.com/.json')
        .then((val) => {
            let start = val.data.Data;
            disptach({
                type: ON_START,
                payload: start
            })
        })
    }
};

export function getUsers() {
    return function(disptach) {
        return axios.get('https://shelterfinder-6d316.firebaseio.com/.json')
        .then((val) => {
            let signin = val.data.users;
            console.log(signin);
            disptach({
                type: ON_SIGNIN,
                payload: signin
            })
        })
    }
};

export function getFiltered(vals) {
    if (vals === '' || Object.keys(vals).length === 0) {
        return getData();
    }
    return {
        type: FILTERED,
        payload: vals
    }
};