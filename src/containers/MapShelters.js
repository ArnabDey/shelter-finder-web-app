import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import GoogleMapReact, {Marker} from 'google-map-react';


import _ from 'lodash';
import '../css/MapShelters.css';


class MapShelters extends Component {
    constructor(props) {
        super(props);
    }
    addMarkers(map, maps) {
        if (this.props && this.props.places) {
            return _.map(this.props.places,(sample) => {
                let lat = parseFloat(sample["Latitude "]);
                let long = parseFloat(sample["Longitude "]);
                let coordinates = { lat: lat, lng: long};

                let marker = new maps.Marker({
                    position: coordinates,
                    map,
                    title: 'Map'
                });
                let infoWindow = new maps.InfoWindow({
                    content: "<strong>" + sample.ShelterName + "</strong>" + "<br>"
                    + sample.Address + "<br/> Capacity: " + sample.Capacity
                    // sample.ShelterName + "\n" + sample.Address
                })
                marker.addListener('click', () => {
                    infoWindow.open(map, marker)
                })

            })
        }
    }
    window() {
        console.log("here")
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
            zoom: 12,
            center: { lat: 33.753746, lng: -84.386330}
        }
        return(
            <div>
            <Link to = "/mainscreen"
                className = "btn btn-primary"
                id = "entryButton">
                Back to List </Link>
          <div className = "mapImage" style={{height: '600px', width: '600px'}}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCo9EKyo6UAag1kLNl3n5dKhDWcCTScXCI' }}
                defaultCenter={mapOptions.center}
                defaultZoom={mapOptions.zoom}
                id = "shelterMap"
                onGoogleApiLoaded={({map, maps}) => this.addMarkers(map, maps)}
                clickableIcons={true}
            ></GoogleMapReact>

            </div>
            <h1 id="title"> Shelters Displayed </h1>
            <ul id="data">
                <h6> {this.displayLocations()} </h6>
            </ul>
            </div>
)}}
function mapStateToProps(state) {
  return {
    places: state.places
  }
}

export default connect(mapStateToProps)(MapShelters);