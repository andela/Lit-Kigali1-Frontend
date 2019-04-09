import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { isEmail } from 'validator';
import { handleSignUpForm, submitSignUp } from '../../redux/actions';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import fb from '../../assets/images/facebook.png';
import twitter from '../../assets/images/twitter.png';
import google from '../../assets/images/google.png';

export class SignUp extends Component {
  state = {
    validEmail: true,
    emailError: 'Email is not valid',
    validPassword: true,
    passwordError: 'Password must have at least 6 characters',
    validUsername: true,
    usernameError: 'username is not allowed to be empty',
  };

  onSubmitButton = () => {
    const {
      onSubmit, email, username, password,
    } = this.props;
    this.setState({ validEmail: true, validPassword: true, validUsername: true });

    if (username.length < 1) {
      this.setState({
        validUsername: false,
        usernameError: 'username is not allowed to be empty',
      });
      return;
    }

    if (!isEmail(email)) {
      this.setState({ validEmail: false });
      return;
    }
    if (password.length < 5) {
      this.setState({
        validPassword: false,
        passwordError: 'Password must have at least 6 characters',
      });
      return;
    }

    onSubmit({ email, password, username });
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

  render() {
    const {
      username, password, email, submitting,
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
      <div className="main-content middle-content">
        <div id="card">
          <form
            className="bg-primary-light login-form"
            id="signup"
            action="articles-create.html"
            ref={this.card}
          >
            <div className="color-primary to-center">
              <h2>SIGN UP</h2>
            </div>
            <div className="form-errors">{this.renderErrors()}</div>
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
              {validUsername ? '' : <div className="form-error">{usernameError}</div>}
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
              {validEmail ? '' : <div className="form-error">{emailError}</div>}
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
            </div>
            {validPassword ? '' : <div className="form-error">{passwordError}</div>}
            <Button
              classes={`primary color-white content-margin width-100 ${
                submitting ? 'loading' : ''
              }`}
              type="button"
              onClick={this.onSubmitButton}
            >
              Sign Up
            </Button>
            <div className="icon-group">
              <div id="fb">
                  <img src={fb} alt="fb-logo" />
              </div>
              <div id="twbs">
                  <img src={twitter} alt="twbs-logo" />
              </div>
              <div id="gl">
                  <img src={google} alt="gl-logo" />
              </div>
            </div>
            <div className="to-center" id="form-link">
              <span>Already a member?</span>
              <a to="/login">Sign In</a>
            </div>
          </form>
        </div>
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
