import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkOut } from '../actions/index';
import { bindActionCreators } from 'redux';

import '../css/Reservations.css';


class Reservations extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (!this.props.users) {
            return(
            <div> Cannot view without signing in </div>
            );
        }
        console.log(this.props.users);
        let id = Object.keys(this.props.users[0]);
        const cancelOption = this.props.users[0][id].checkedin  ?(
                <Link to = "/mainscreen"
                className = "btn btn-danger"
                onClick={() => {
                            console.log('deleting Reservations', this.props.users[0][id]);
                            this.props.checkOut(this.props.users);
                            this.props.users[0][id].checkedin = false;
                }}> Cancel Reservations </Link> ):
            (
                <Link to = "/mainscreen"
                className = "btn btn-primary"> Make Reservations
                </Link>
            );
        return(
            <div>
                <Navigation />
                <div id="information">
                    <h1> Reservations </h1>
                    <h4> Username: {this.props.users[0][id].username} </h4>
                    <h4> Checked In: {this.props.users[0][id].checkedin.toString()} </h4>
                    {cancelOption}
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

export default connect(mapStateToProps, { checkOut })(Reservations);