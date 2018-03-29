import firebase from 'firebase';
import axios from 'axios';


export const SELECT_PLACE = 'SELECT_PLACE';
export const ON_START = 'ON_START';
export const FILTERED = 'FILTERED';
export const ON_SIGNIN = 'ON_SIGNIN'
export const REGISTER = 'REGISTER';
export const CURR_USER = 'CURR_USER';
export const RESERVE = 'RESERVE';
export const CHECK_IN = 'CHECK_IN';


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
            disptach({
                type: ON_SIGNIN,
                payload: signin
            })
        })
    }
};

export function addUser(values) {
    console.log("adding user to db", values);
    let {username, password} = values;
    let admin = false;
    let checkedin = false;
    let id = Math.round(1 + Math.random() * (100000000000000000000));
    db.ref(`/users/${id}`).set({
        username, password, admin, checkedin
    })
    return {
        type: REGISTER,
        payload: "adding"
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

export function getCurrUser(user) {
    let id = Object.keys(user);
    console.log(user[id]);
    console.log('action', user)
    const arr = [user]
    return {
        type: CURR_USER,
        payload: arr
    }

    // return function(disptach) {
    //     return axios.get('https://shelterfinder-6d316.firebaseio.com/.json')
    //     .then((val) => {
    //         let currUser = {};
    //         currUser[id] = val.data.users[id];
    //         console.log("val",currUser);
    //         disptach({
    //             type: ON_SIGNIN,
    //             payload: currUser
    //         })
    //     })
    // }
};

export function reserveDB(location, num) {
    console.log('Reserving at', location);
    console.log(location);
    return function(disptach) {
        return axios.get('https://shelterfinder-6d316.firebaseio.com/.json')
        .then((val) => {
            let start = val.data.Data;
            // console.log("shelters",start);
            // console.log('keys', Object.keys(start));
            let actId;
            for (let key in Object.keys(start)) {
                // console.log(location.Address);
                let id = Object.keys(start)[key];
                // console.log(start[id]);
                if (location.Address === start[id].Address) {
                    actId = id;
                    console.log(actId);
                }
            }
            return db.ref(`/Data/${actId}`).update({
                'Capacity': (start[actId].Capacity - num)
            }).then(() => {
                return {
                    type: RESERVE,
                    payload: location
                }
            })
        })
    }
}

export function checkIn(user) {
    // let id = Object.keys(user[0])[0];
    let id = Object.keys(user[0]);
    console.log(`Checking in`, Object.keys(user[0])[0]);
    return function(disptach) {
        return db.ref(`/users/${id}`).update({
            'checkedin': true
        }).then(() => {
            return {
                type: CHECK_IN,
                payload: user
            }
        })
    }
}