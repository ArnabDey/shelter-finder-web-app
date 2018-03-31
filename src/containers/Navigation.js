import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../actions/index';
import '../css/Navigation.css';

class Navigation extends Component {
    signOut() {
        this.props.logOut();
    }
    render() {
        return(
            <ul>
                <Link to = "/mainscreen" className = "btn"> All Shelters </Link>
                <Link to = "/reservations" className = "btn"> Reservations </Link>
                <Link to = "/" className = "btn" onClick={this.signOut}> Sign Out </Link>
            </ul>

        );
    }
}
export default connect(null, {logOut})(Navigation);