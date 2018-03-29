import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectPlace, getFiltered } from '../actions/index';
import { bindActionCreators } from 'redux';

import '../css/Reservations.css';


class Reservations extends Component {
    render() {
        if (!this.props.users) {
            return(
            <div> Cannot view without signing in </div>
            );
        }
        let id = Object.keys(this.props.users[0]);
        return(
            <div>
                <Navigation />
                <div id="information">
                    <h1> Reservations </h1>
                    <h4> Username: {this.props.users[0][id].username} </h4>
                    <h4> Checked In: {this.props.users[0][id].checkedin.toString()} </h4>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
  return {
    places: state.places,
    users: state.users
  }
}

export default connect(mapStateToProps)(Reservations);