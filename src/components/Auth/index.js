import React from 'react';
import PropTypes from 'prop-types';
import SignUp from './SignUp';
import Login from './Login';

class AuthComponent extends React.Component {
  state = {
    flip: 'flip-login',
  };

  flip = (e) => {
    this.setState({ flip: e.target.id });
    e.preventDefault();
  };

  render() {
    const { history } = this.props;
    const { flip } = this.state;
    return (
      <div className="main-content middle-content">
        <div id="card" className={flip !== 'flip-login' ? 'flip' : 'flipBack'}>
          <SignUp data-name="signup" history={history} onFlip={this.flip} />
          <Login data-name="login" history={history} onFlip={this.flip} />
        </div>
      </div>
    );
  }
}
AuthComponent.propTypes = {
  history: PropTypes.any.isRequired,
};

export default AuthComponent;
