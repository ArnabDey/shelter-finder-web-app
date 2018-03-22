import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../css/SignIn.css';

class SignIn extends Component {
  signIn() {
    console.log("here checking")
  }
  render() {
    return (
      <div>
        <form id="signInForm" onSubmit={this.signIn}>
            <div id="contentForm">
              <h1 id="signInContent"> Sign In </h1>
              <label id="signInContent"> Username </label>
              <input id="signInContent" type="text" required></input>
              <label id="signInContent"> Password </label>
              <input id="signInContent" type="text"></input>
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

export default SignIn;
