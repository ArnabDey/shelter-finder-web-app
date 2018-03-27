import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { Link } from 'react-router-dom';

import '../css/LocationInfo.css';

import Navigation from '../components/Navigation';

class Reserve extends Component {
    reserve(value) {
        console.log(value.numBeds)
        if (isNaN(value.numBeds)) {
            console.log("Not a valid number");
        } else if (parseInt(value.numBeds) > this.props.place[0].Capacity) {
            console.log(`This reservation of ${value.numBeds} cannot be made because it exceeds the limit of ${this.props.place[0].Capacity} people`);
        } else {
            console.log('Reserving',parseInt(value.numBeds));
            console.log('User reserving', this.props.users);
        }
    }
    render() {
        if (!this.props.place) {
            return(
                <div>
                    <div>Waiting for location to get selected </div>
                </div>
                );
        }
        const { handleSubmit } = this.props;
        return(
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
                        onSubmit={handleSubmit(this.reserve.bind(this))}>
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
    )
    }
}

function mapStateToProps(state){
    return {
        place: state.places,
        users: state.users
    }
}

export default reduxForm({
  form: 'reserve'
}) (connect(mapStateToProps)(Reserve))