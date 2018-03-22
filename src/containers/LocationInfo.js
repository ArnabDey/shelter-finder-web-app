import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/LocationInfo.css';

import Navigation from '../components/Navigation';


class LocationInfo extends Component {
    render() {
        if (!this.props.place) {
            return(
                <div> Waiting for location to get selected </div>
                );
        }
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
                    <div>
                        <Link to = "/reserve"
                        className = "btn btn-primary"
                        id = "entryButton"> Reserve
                        </Link>
                        <Link to = "/mainscreen"
                        className = "btn btn-danger"
                        id = "entryButton"> Cancel
                        </Link>
                    </div>
                </div>
            </div>
    )
    }
}

function mapStateToProps(state){
    return {
        place: state.places
    }
}

export default connect(mapStateToProps)(LocationInfo)