import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { reserveDB, checkIn } from '../actions';

import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

import '../css/LocationInfo.css';

import Navigation from './Navigation';

class Reserve extends Component {
    reserveSubmit(value) {
        if (isNaN(value.numBeds)) {

        } else if (parseInt(value.numBeds, 10) > this.props.place[0].Capacity) {
            alert("not possible")
            // console.log(`This reservation of ${value.numBeds} cannot be made because it exceeds the limit of ${this.props.place[0].Capacity} people`);
        } else {
            this.props.reserveDB(this.props.place[0], parseInt(value.numBeds, 10), this.props.users);
            this.props.checkIn(this.props.users);
            let id = Object.keys(this.props.users[0]);
            this.props.users[0][id].checkedin = true;
            this.props.place[0].ShelterName = this.props.place[0].ShelterName - value.numBeds;
            this.props.history.push('/mainscreen');
            // console.log("after check in",this.props.place[0]);
        }
    }
    render() {
        if (!this.props.users) {
            return(
               <DocumentTitle title="Reserve">
                <div> Cannot view without signing in </div>
                </DocumentTitle>
            );
        }else if (!this.props.place) {
            return(
                <DocumentTitle title="Reserve">
                <div>
                    <div>Waiting for location to get selected </div>
                </div>
                </DocumentTitle>
                );
        } else if (this.props.reservation) {
            return(
                <DocumentTitle title="Reserve">
                <div>
                    <div>Cannot have multiple reservations </div>
                    <Link to = "/mainscreen" className = "btn btn-danger" id = "entryButton"> Go Back </Link>
                </div>
                </DocumentTitle>
                );
        }
        const { handleSubmit } = this.props;
        return(
            <DocumentTitle title="Reserve">
            <div>
                <Navigation />
                <div id = "information">
                    Name: {this.props.place[0].ShelterName}
                    <br/>
                    Capacity: {this.props.place[0].Capacity}
                    <br/>
                    Restrictions: {this.props.place[0].Restrictions}
                    <br/>
                    Address: {this.props.place[0].Address}
                    <br/>
                    Phone Number: {this.props.place[0].PhoneNumber}
                    <br/>
                    Special Notes: {this.props.place[0]['Specia Notes']}
                    <br/>
                    <form
                        id="reserve"
                        onSubmit={handleSubmit(this.reserveSubmit.bind(this))}>
                        <div>
                        <br/><br/>
                        <label> Number of Beds: </label>
                        <Field
                            label="numBeds"
                            name="numBeds"
                            component="input"
                            type="text"
                            id="numBeds"
                            required
                        />
                        </div>
                        <div>
                        </div>
                        <br/>
                        <div>
                            <button
                            type= "submit"
                            className="btn btn-primary"
                            >Make Reservation</button>
                            <Link to = "/mainscreen" className = "btn btn-danger" id = "entryButton"> Cancel </Link>
                        </div>
                    </form>
                </div>
            </div>
        </DocumentTitle>
    )
    }
}

function mapStateToProps(state){
    return {
        place: state.places,
        users: state.users,
        reservation: state.reservation
    }
}

export default reduxForm({
  form: 'reserve'
}) (connect(mapStateToProps, {reserveDB, checkIn})(Reserve))