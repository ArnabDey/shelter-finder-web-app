import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrUser, getUsers, addUser } from '../actions';

import '../css/SignIn.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.createUser = this.createUser.bind(this);
  }
  componentWillMount() {
    this.props.getUsers();
  }
  signIn(value) {
    const users = this.props.users;
    let actId;
    for (let id in users) {
      if (users[id]['username'] === value.username) {
          actId = id;
      }
    }
    if (actId) {
        alert("This username is already taken");
    } else {
        this.createUser(value);
    }
  }
  createUser(value) {
    this.props.addUser(value);
    const users = this.props.users;
    let findId;
    this.props.history.push('/signin');
  }
  render() {
    const { handleSubmit } = this.props;
    return (
    <div >
      <form
        id="signInForm"
        onSubmit={handleSubmit(this.signIn.bind(this))}>
        <h1> Register </h1>
        <h5> Enter username and password to register </h5>
        <div className="contentForm">
          <label> Username </label>
          <Field
            label="Username"
            name="username"
            type="text"
            component="input"
            id="signInContent"
            required
          />
          <label> Password </label>
          <Field
            label="Password"
            name="password"
            component="input"
            type="password"
            id="signInContent2"
            required
          />
          <div>
            <button
              type= "submit"
              className="btn btn-primary"
              >Register</button>
            <Link to = "/" className = "btn btn-primary" id = "entryButton"> Cancel </Link>
          </div>
        </div>
      </form>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  }
}

export default  reduxForm({
  form: 'signIn'
}) (
connect(mapStateToProps, { getCurrUser, getUsers, addUser })(Register));