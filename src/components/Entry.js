import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Entry.css';

import 'react-bootstrap';

class Entry extends Component {
  render() {
    return (
      <div className="redirectpage">
            <h1 id="title"> Homeless Shelter Finder </h1>
            <div id="buttonControl">
              <Link to = "/register" className = "btn btn-primary" id = "entryButton"> Register </Link>
              <Link to = "/signIn" className = "btn btn-primary" id = "entryButton"> Sign In </Link>
            </div>
      </div>
    );
  }
}

export default Entry;
