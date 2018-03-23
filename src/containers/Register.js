import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../css/Register.css';

class Register extends Component {
    onRegister = (event) => {
        this.props.onRouteChange('mainScreen');
    }
    onCancel = (event) => {
        this.props.onRouteChange('');
    }
  render() {
    return (
      <div>
        <form id="registerForm">
            <div id="contentRegisterForm">
                <h1 id="registerContent"> Register </h1>
                <label id="registerContent"> Username </label>
                <input id="registerContent" type="text"></input>
                <label id="registerContent"> Password </label>
                <input id="registerContent" type="text"></input>
                <div>
                    <Link to = "/mainscreen" className = "btn btn-primary" id = "entryButton"> Sign In </Link>
                    <Link to = "/" className = "btn btn-primary" id = "entryButton"> Cancel </Link>
                </div>
            </div>
        </form>
      </div>
    );
  }
}

export default Register;
