import React from 'react';
import PropTypes from 'prop-types';
import Login from './Login';

const AuthComponent = (props) => {
  const { history } = props;
  return (
    <div className="main-content middle-content">
      <div id="card">
        <Login history={history} />
      </div>
    </div>
  );
};
AuthComponent.propTypes = {
  history: PropTypes.any.isRequired,
};

export default AuthComponent;
