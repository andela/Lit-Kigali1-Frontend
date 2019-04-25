import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmail } from 'validator';
import { handleSignUpForm, submitSignUp, socialAuth } from '../../redux/actions';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import fb from '../../assets/images/facebook.png';
import twitter from '../../assets/images/twitter.png';
import google from '../../assets/images/google.png';
import SocialLoginIcon from '../SocialLoginIcon';

export class SignUp extends Component {
  state = {
    validEmail: true,
    emailError: 'Invalid email',
    validPassword: true,
    passwordError: 'Minimum 6 characters',
    validUsername: true,
    usernameError: 'Required',
  };

  onSubmitButton = () => {
    const {
      onSubmit, email, username, password, history,
    } = this.props;
    this.setState({ validEmail: true, validPassword: true, validUsername: true });

    if (username.length < 1) {
      this.setState({
        validUsername: false,
        usernameError: 'Required',
      });
      return;
    }
    if (email.length < 1) {
      this.setState({
        validEmail: false,
        emailError: 'Required',
      });
      return;
    }
    if (!isEmail(email)) {
      this.setState({
        validEmail: false,
        emailError: 'Invalid email',
      });
      return;
    }

    if (password.length < 1) {
      this.setState({
        validPassword: false,
        passwordError: 'Required',
      });
      return;
    }
    if (password.length < 6) {
      this.setState({
        validPassword: false,
        passwordError: 'Minimum 6 characters',
      });
      return;
    }

    onSubmit({ email, password, username }).then((res) => {
      if (res.status === 201) {
        history.push('/home');
      }
    });
  };

  handleInputChange = (e) => {
    const { onInputChange } = this.props;
    onInputChange({ field: e.target.name, value: e.target.value });
  };

  renderErrors = () => {
    let { errors } = this.props;
    const { message } = this.props;
    errors = [message, ...errors];
    return errors.map(err => <span key={err}>{err.message || err}</span>);
  };

  socialAuthLogin = (provider) => {
    const { submitting, socialAuth } = this.props;

    if (!submitting) socialAuth(provider);
  };

  render() {
    const {
      username, password, email, submitting, onFlip,
    } = this.props;
    const {
      emailError,
      validEmail,
      validPassword,
      passwordError,
      validUsername,
      usernameError,
    } = this.state;
    return (
      <div>
        <form className="bg-primary-light login-form" id="signup">
          <div className="color-primary to-center">
            <h2>SIGN UP</h2>
          </div>
          <div className="form-errors" data-test="form-errors">
            {this.renderErrors()}
          </div>
          <div className="input primary">
            <i className="fa fa-user" />
            <Input
              name="username"
              type="text"
              placeholder="Username"
              classes="bg-primary-light"
              value={username}
              onChange={this.handleInputChange}
            />
            {validUsername ? '' : <div className="errors">{usernameError}</div>}
          </div>
          <div className="input primary">
            <i className="fa fa-at" />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              classes="bg-primary-light"
              value={email}
              onChange={this.handleInputChange}
            />
            {validEmail ? '' : <div className="errors">{emailError}</div>}
          </div>
          <div className="input primary">
            <i className="fa fa-lock" />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              classes="bg-primary-light"
              value={password}
              onChange={this.handleInputChange}
            />
            {validPassword ? '' : <div className="errors">{passwordError}</div>}
          </div>
          <Button
            classes={`primary color-white ${submitting ? 'loading' : ''}`}
            type="button"
            onClick={this.onSubmitButton}
          >
            Sign Up
          </Button>
          <div className="icon-group">
            <SocialLoginIcon
              id="fb"
              onClick={() => {
                this.socialAuthLogin('facebook');
              }}
              icon={fb}
              alt="fb-logo"
              dataTest={{ div: 'fb-container', a: 'fb-a', img: 'fb-img' }}
            />
            <SocialLoginIcon
              id="twbs"
              onClick={() => {
                this.socialAuthLogin('twitter');
              }}
              icon={twitter}
              alt="twbs-logo"
              dataTest={{ div: 'twbs-container', a: 'twbs-a', img: 'twbs-img' }}
            />
            <SocialLoginIcon
              id="gl"
              onClick={() => {
                this.socialAuthLogin('google');
              }}
              icon={google}
              alt="gl-logo"
              dataTest={{ div: 'gl-container', a: 'gl-a', img: 'gl-img' }}
            />
          </div>
          <div className="to-center" id="form-link">
            <span>Already a member?</span>
            <a href="#login" id="flip-signup" onClick={onFlip}>
              Sign In
            </a>
          </div>
        </form>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  username: state.signUp.username,
  email: state.signUp.email,
  password: state.signUp.password,
  message: state.signUp.message,
  errors: state.signUp.errors,
  submitting: state.signUp.submitting,
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onInputChange: ({ field, value }) => dispatch(handleSignUpForm({ field, value })),
  onSubmit: ({ username, email, password }) => dispatch(
    submitSignUp({
      username,
      email,
      password,
      ownProps,
    }),
  ),
  socialAuth: provider => dispatch(socialAuth(provider)),
});

SignUp.propTypes = {
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  message: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  errors: PropTypes.array,
  submitting: PropTypes.bool,
  history: PropTypes.any.isRequired,
  socialAuth: PropTypes.func,
  onFlip: PropTypes.func,
};

SignUp.defaultProps = {
  message: '',
  errors: [],
  submitting: false,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
