import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Login from './Login';

class AuthComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { history } = this.props;
    return (
      <div className="main-content middle-content">
        <div id="card">
          <Login history={history} />
        </div>
      </div>
    );
  }
}

AuthComponent.propTypes = {
  history: PropTypes.any.isRequired,
};

export default AuthComponent;
