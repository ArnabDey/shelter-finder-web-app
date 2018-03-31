import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectPlace, getFiltered, getReservation } from '../actions/index';
import DocumentTitle from 'react-document-title';
import _ from 'lodash';


import Navigation from './Navigation';
import '../css/MainScreen.css';

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        filter: ''
    };
    this.beginFiltering = this.beginFiltering.bind(this);
  }

  componentWillMount() {
      this.props.getFiltered('');
      if (this.props.users && Object.keys(this.props.users).length === 1) {
            this.props.getReservation(this.props.users);
        }
  }

  renderRows() {
    if (this.props.users && this.props.places) {
      return _.map(this.props.places,(sample) => {
        return(
                <tr key = {sample.ShelterName}
                  className = "rowShelter"
                  onClick={() => {
                      this.props.selectPlace(sample)
                      this.props.history.push('/place/');
                    }
                  }>
                    <td>{sample.ShelterName}</td>
                    <td>{sample.Capacity}</td>
                    <td>{sample.Restrictions}</td>
                    <td>{sample.Address}</td>
                </tr>
          )
        })
      }
}

  beginFiltering(event) {
    if (event.target.value === ''
      || Object.keys(event.target.value).length === 0) {
      this.props.getFiltered(event.target.value);
    }
    this.setState({filter: event.target.value});
    const valFilter = event.target.value;
    this.filtering(valFilter);
  }
  filtering(valFilter) {
      let data = this.props.places;
      const filtered = {};
      for (let key in data) {
          if (valFilter.toLowerCase() === 'men'
              || valFilter.toLowerCase() === 'male') {
              for (let names in data[key]) {
                  if (data[key][names].toLowerCase() === 'men') {
                      filtered[key] = data[key];
                  }
              }
          } else if (valFilter.toLowerCase() === 'women'
              || valFilter.toLowerCase() === 'female') {
              for (let names in data[key]) {
                  if (data[key][names].toLowerCase() === 'women') {
                      filtered[key] = data[key];
                  }
              }
          } else {
              for (let names in data[key]) {
                  if (data[key][names].toLowerCase().includes(valFilter.toLowerCase())) {
                      filtered[key] = data[key];
                  }
              }
          }
      }
      if (Object.keys(filtered).length === 0) {
        alert("There is no shelter with the value \"" + valFilter + "\"");
      }
      this.props.getFiltered(filtered);
      this.renderRows();
  }

  clear() {
    let search = document.getElementById("search");
    search.value = '';
    this.props.getFiltered('');
  }

  render() {
    if (!this.props.users ||
      Object.keys(this.props.users).length !== 1) {
        return(
          <DocumentTitle title ="Shelters">
            <div> Cannot view without signing in </div>
          </DocumentTitle>
        );
    }
    if (this.props.users) {
      return (
        <DocumentTitle title ="Shelters">
        <div>
          <Navigation/>
          <div id="titleSearch">
            <h1 id="title"> All Locations </h1>
            <div className ="searching">
              <input
                id="search"
                onChange={this.beginFiltering}
                placeholder="Filter the shelters"/>
              <button onClick={() => {
                    let search = document.getElementById("search");
                    search.value = '';
                    this.props.getFiltered('');
              }}>Clear</button>
            </div>
            <br />
            <div className = "mapView">
                <h4 id="title"> Click a row for more information and to reserve</h4>
                <Link to = "/mapshelter"
                  className = "btn btn-primary"
                  id = "entryButton"> Map View </Link>
            </div>
            <table id="mainTable">
                <thead>
                  <tr>
                      <th>Shelter Name</th>
                      <th>Capacity</th>
                      <th>Restrictions</th>
                      <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderRows()}
                </tbody>
            </table>
          </div>
        </div>
        </DocumentTitle>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    places: state.places,
    users: state.users,
    reservation: state.reservation
  }
}

export default connect(mapStateToProps, {selectPlace, getFiltered, getReservation})(MainScreen);