import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrUser, getUsers } from '../actions';
import DocumentTitle from 'react-document-title';


import '../css/SignIn.css';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.error = this.error.bind(this);
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
      if (users[actId]['password'] === value.password) {
          let currUser = {};
          currUser[actId] = users[actId];
          this.props.getCurrUser(currUser);
          this.props.history.push('/mainscreen');
      } else {
        alert("Invalid username or password")
        return false;
      }

    } else {
      this.error();
      alert("Invalid username or password");
      return false;
    }
  }
  error() {
    console.log("error")
    return(
        <h1> Invalid Username or Password </h1>
      )
  }
  render() {
    const { handleSubmit } = this.props;
    return (
    <DocumentTitle title = "Sign In">
    <div >
      <form
        id="signInForm"
        onSubmit={handleSubmit(this.signIn.bind(this))}>
        <h1> Sign In </h1>
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
              >Sign In</button>
            <Link to = "/" className = "btn btn-primary" id = "entryButton"> Cancel </Link>
          </div>
        </div>
      </form>
    </div>
    </DocumentTitle>
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
connect(mapStateToProps, { getCurrUser, getUsers })(SignIn));