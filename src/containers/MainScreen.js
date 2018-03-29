import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectPlace, getFiltered } from '../actions/index';
import { bindActionCreators } from 'redux';
import _ from 'lodash';



import Navigation from '../components/Navigation';
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
      console.log(this.props.users)
      console.log(this.props.places)
      this.props.getFiltered('');
  }

  renderRows() {
    if (this.props.users && this.props.places) {
      return _.map(this.props.places,(sample) => {
        return(
                <tr key = {sample.ShelterName}
                  onClick={() => {
                    // console.log(Object.keys(this.props.places));
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
        alert("There is no shelter with the value " + valFilter);
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
    if (!this.props.users) {
        return(
          <div> Cannot view without signing in </div>
        );
    }
    if (this.props.users) {
      return (
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
                <h4 id="title"> Select a row for more information and to reserve</h4>
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
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    places: state.places,
    users: state.users
  }
}

export default connect(mapStateToProps, {selectPlace, getFiltered})(MainScreen);