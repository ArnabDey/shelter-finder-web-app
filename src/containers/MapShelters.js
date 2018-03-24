import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Map from 'react-js-google-maps';


import _ from 'lodash';
import '../css/MapShelters.css';


class MapShelters extends Component {
    constructor(props) {
        super(props);
    }
    getMaps() {
        console.log("working");
        if (this.props && this.props.places) {
            console.log("checking", this.props.places);
            return _.map(this.props.places,(sample) => {
                let lat = parseFloat(sample["Latitude "]);
                let long = parseFloat(sample["Longitude "]);
                let coordinates = { lat: lat, lng: long};
                console.log(coordinates)
                let marker = new window.google.maps.Marker({
                    position: coordinates,
                    map: window.gmaps['shelterMap'].gmap
                });
                console.log(sample)
                console.log(coordinates)
            })
        }
    }
    displayLocations() {
        if (this.props) {
            return _.map(this.props.places,(sample) => {
                return (<li key={sample.ShelterName}>
                    {sample.ShelterName}</li>)
            })
        }
    }
    render() {
        const mapOptions = {
            zoom: 10,
            center: { lat: 33.753746, lng: -84.386330}
        }
        return(
            <div>
            <Link to = "/mainscreen"
                className = "btn btn-primary"
                id = "entryButton">
                Back to List </Link>
            <div id="mapImage">
            <Map
            id="shelterMap"
            apiKey="AIzaSyCo9EKyo6UAag1kLNl3n5dKhDWcCTScXCI"
            mapOptions={mapOptions}
            style={{ width: 600, height: 480 }}
            onload={this.getMaps()}
            />
            </div>
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