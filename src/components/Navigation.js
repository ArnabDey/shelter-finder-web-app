import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navigation.css';

class Navigation extends Component {
    render() {
        return(
            <ul>
                <Link to = "/mainscreen" className = "btn"> All Shelters </Link>
                <Link to = "/reservations" className = "btn"> Reservations </Link>
                <Link to = "/" className = "btn"> Sign Out </Link>
            </ul>

        );
    }
}
export default Navigation;