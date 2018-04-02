import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';
import '../css/Entry.css';

import 'react-bootstrap';

class Entry extends Component {
  render() {
    return (
      <DocumentTitle title ="Homeless Shelter Finder">
      <div className="redirectpage">
            <h1 id="titleEntry"> Homeless Shelter Finder </h1>
            <div id="buttonControl">
              <Link to = "/register" className = "btn btn-primary" id = "entryButton"> Register </Link>
              <Link to = "/signIn" className = "btn btn-primary" id = "entryButton"> Sign In </Link>
            </div>
      </div>
      </DocumentTitle>
    );
  }
}

export default Entry;
