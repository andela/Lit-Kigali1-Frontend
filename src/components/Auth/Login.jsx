import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import fb from '../../assets/images/facebook.png';
import twitter from '../../assets/images/twitter.png';
import google from '../../assets/images/google.png';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import { loginUser, inputHandler, validateCredentials } from '../../redux/actions';
import SocialLoginIcon from '../SocialLoginIcon';

class LoginComponent extends Component {
  signin = (e) => {
    const {
      credentials: { username, password },
      validate,
      login,
    } = this.props;
    validate({ username, password }).then((res) => {
      if (res.message === 'Ok') {
        login({ username, password });
      }
    });
    e.preventDefault();
  };

  handleInput = (e) => {
    const { handleInput } = this.props;
    handleInput({ field: e.target.name, value: e.target.value });
  };

  handleError = () => {
    const { error, isLoggedIn, history } = this.props;
    if (error.message) {
      return error.message;
    } if (error.data) {
      return error.data.message;
    }
    if (isLoggedIn) {
      history.push('/');
    }
    return '';
  };

  render() {
    const {
      credentials: { username, password },
    } = this.props;
    const { submitting } = this.props;
    return (
      <div>
        <form className="bg-primary-light login-form" id="signup">
          <div className="color-primary to-center">
            <h2>LOG IN</h2>
          </div>
          <div className="form-errors">{this.handleError()}</div>
          <div className="input primary">
            <i className="fa fa-user" />
            <Input
              name="username"
              type="text"
              value={username}
              classes="bg-primary-light"
              placeholder="Username / Email"
              onChange={this.handleInput}
            />
          </div>
          <div className="input primary">
            <i className="fa fa-lock" />
            <Input
              name="password"
              type="password"
              value={password}
              classes="bg-primary-light"
              placeholder="Password"
              onChange={this.handleInput}
            />
          </div>
          <div className="align-right" id="forget-psswd">
            <Link to="/forgot-password">Forget Password?</Link>
          </div>
          <Button
            type="button"
            classes={`primary color-white ${submitting ? 'loading' : ''}`}
            color-white
            onClick={this.signin}
          >
            Log In
          </Button>
          <div className="icon-group">
            <SocialLoginIcon id="fb" href="/#" icon={fb} alt="fb-logo" dataTest={{ div: 'fb-container', a: 'fb-a', img: 'fb-img' }} />
            <SocialLoginIcon id="twbs" href="/#" icon={twitter} alt="twbs-logo" dataTest={{ div: 'twbs-container', a: 'twbs-a', img: 'twbs-img' }} />
            <SocialLoginIcon id="gl" href="/#" icon={google} alt="gl-logo" dataTest={{ div: 'gl-container', a: 'gl-a', img: 'gl-img' }} />
          </div>
          <div className="to-center" id="form-link">
            <span>Not a member?</span>
            <Link to="/#">Sign Up</Link>
          </div>
        </form>
      </div>
    );
  }
}

LoginComponent.propTypes = {
  credentials: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  error: PropTypes.object,
  history: PropTypes.any.isRequired,
  isLoggedIn: PropTypes.bool,
};

LoginComponent.defaultProps = {
  error: {},
  submitting: false,
  isLoggedIn: false,
};
const mapStateToProps = ({
  login: { error, credentials, submitting }, currentUser: { isLoggedIn },
}) => ({
  credentials,
  error,
  submitting,
  isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  handleInput: ({ field, value }) => dispatch(inputHandler({ field, value })),
  validate: ({ username, password }) => dispatch(validateCredentials({ username, password })),
  login: ({ username, password }) => dispatch(loginUser({ username, password })),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginComponent);
