import React, { Component } from 'react';
import Navigation from './Navigation';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkOut, getReservation } from '../actions/index';

import '../css/Reservations.css';


class Reservations extends Component {
    render() {
        // console.log("RESERVATIONS", this.props.reservation);
        if (!this.props.users) {
            return(
            <div> Cannot view without signing in </div>
            );
        }
        let id = Object.keys(this.props.users[0]);
        const cancelOption = this.props.users[0][id].checkedin  ?(
                <div id="information">
                    <h3> Current Reservation </h3>
                    <h6> Name of Shelter : {this.props.reservation.ShelterName} </h6>
                    <h6> Number of People: {this.props.reservation.Capacity} </h6>
                    <Link to = "/mainscreen"
                    className = "btn btn-danger"
                    onClick={() => {
                                this.props.checkOut(this.props.users);
                                this.props.users[0][id].checkedin = false;
                                this.props.history.push('/mainscreen');
                    }}> Cancel Reservations </Link>
                </div>
                ):
            (
                <Link to = "/mainscreen"
                className = "btn btn-primary"> Make Reservations
                </Link>
            );
        const currentlyCheckedIn = this.props.users[0][id].checkedin ? (
            <h3> You are currently checked in </h3>
            ) : (
            <h3> You are not currently checked in </h3>
            );
        return(
            <div>
                <Navigation />
                <div className="row">
                    <div className = "col-sm-4" id= "information">
                        <h1> Profile Information </h1>
                        <h4> Username: {this.props.users[0][id].username} </h4>
                    </div>
                    <div className = "col-sm-8" id ="information">
                        {currentlyCheckedIn}
                        <br/>
                        {cancelOption}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
  return {
    places: state.places,
    users: state.users,
    reservation: state.reservation
  }
}

export default connect(mapStateToProps, { checkOut, getReservation })(Reservations);