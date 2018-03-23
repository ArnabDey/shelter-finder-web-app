import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import _ from 'lodash';
import '../css/MapShelters.css';


class MapShelters extends Component {
    displayLocations() {
        return _.map(this.props.places,(sample) => {
            return (<li key={sample.ShelterName}>
                {sample.ShelterName}</li>)
        })
    }
    render() {
        return(
            <div>
            <Link to = "/mainscreen"
                className = "btn btn-primary"
                id = "entryButton">
                Back to List </Link>
            <h1 id="title"> Shelters Displayed </h1>
            <ul id="data">
                <h6> {this.displayLocations()} </h6>
            </ul>
            </div>
            )
    }
}
function mapStateToProps(state) {
  return {
    places: state.places
  }
}

export default connect(mapStateToProps)(MapShelters);