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
export const CHECK_OUT = 'CHECK_OUT';
export const GET_RESERVE = 'GET_RESERVE';


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

};

export function reserveDB(location, num, users) {
    console.log('Reserving at', location);
    console.log(location);
    return function(disptach) {
        return axios.get('https://shelterfinder-6d316.firebaseio.com/.json')
        .then((val) => {
            let start = val.data.Data;
            let actId;
            for (let key in Object.keys(start)) {
                let id = Object.keys(start)[key];
                if (location.Address === start[id].Address) {
                    actId = id;
                    console.log(actId);
                }
            }
            let id = Object.keys(users[0]);
            let name = users[0][id].username;
            db.ref(`/Reservations/${name}`).update({
                'ShelterName': start[actId].ShelterName,'Capacity': num.toString()
            })
            return db.ref(`/Data/${actId}`).update({
                'Capacity': (start[actId].Capacity - num).toString()
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


// export function getReservation() {
//     return function(disptach) {
//         return axios.get('https://shelterfinder-6d316.firebaseio.com/.json')
//         .then((val) => {
//             let res = val.data.Reservations
//             ;
//             disptach({
//                 type: GET_RESERVE,
//                 payload: signin
//             })
//         })
//     }
// };



export function getReservation(user) {
    return function(disptach) {
        return axios.get('https://shelterfinder-6d316.firebaseio.com/.json')
        .then((val) => {
                let reservations = val.data.Reservations;
                let id = Object.keys(user[0]);
                let actId = Object.keys(user[0])[0];
                console.log('reservations', reservations[user[0][actId].username]);
                console.log('reservations a', GET_RESERVE);
                disptach ({
                    type: GET_RESERVE,
                    payload: reservations[user[0][actId].username]
                })
        })
    }
}

export function checkOut(user) {
    let id = Object.keys(user[0]);
    let actId = Object.keys(user[0])[0];
    console.log(`Checking out`,user[0][actId].username);
    return function(disptach) {
        return axios.get('https://shelterfinder-6d316.firebaseio.com/.json')
        .then((val) => {
            let shelterData = val.data.Data;
            let reservations = val.data.Reservations;
            let id = Object.keys(user[0]);
            let name = reservations[user[0][actId].username].ShelterName;
            let num = reservations[user[0][actId].username].Capacity;
            let actIdShelter;
            for (let key in Object.keys(shelterData)) {
                let shelterId = Object.keys(shelterData)[key];
                if (name === shelterData[shelterId].ShelterName) {
                    actIdShelter = shelterId;
                }
            }
            let updatedCapcity = parseInt(num) + parseInt(shelterData[actIdShelter].Capacity);
            console.log("updatedCapcity", updatedCapcity);
            db.ref(`/Data/${actIdShelter}`).update({
                'Capacity': updatedCapcity.toString()
            })
            return db.ref(`/users/${id}`).update({
                'checkedin': false
            }).then(() => {
                return {
                    type: CHECK_OUT,
                    payload: user
                }
            })
        })
    }

}