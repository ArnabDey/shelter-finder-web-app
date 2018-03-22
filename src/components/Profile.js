import React, { Component } from 'react';
import Navigation from './Navigation';
import '../css/Profile.css';

class Register extends Component {
  render() {
    return (
      <div>
      <Navigation />
        <br/>
        <br/>
            <div id="profileView">
                <label id="registerContent"> First Name </label>
                <label id="registerContent"> Last Name </label>
                <label id="registerContent"> Email </label>
                <label id="registerContent"> Username </label>
                <label id="registerContent"> Password </label>
            </div>

      </div>
    );
  }
}

export default Register;
