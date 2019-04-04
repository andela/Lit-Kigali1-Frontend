import React, { Component } from 'react';
import Login from './Login';

class AuthComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="main-content middle-content">
        <div id="card">
          <Login />
        </div>
      </div>
    );
  }
}

export default AuthComponent;
