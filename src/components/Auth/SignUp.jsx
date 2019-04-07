import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { handleSignUpForm, submitSignUp } from '../../redux/actions';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import fb from '../../assets/images/facebook.png';
import twitter from '../../assets/images/twitter.png';
import google from '../../assets/images/google.png';

class SignUp extends Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmitButton = this.onSubmitButton.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  onSubmitButton() {
    const {
      onSubmit, email, username, password,
    } = this.props;
    onSubmit({ email, password, username });
  }

  handleInputChange(e) {
    const { onInputChange } = this.props;
    onInputChange({ field: e.target.name, value: e.target.value });
  }

  renderErrors() {
    let { errors } = this.props;
    const { message } = this.props;
    errors = [message, ...errors];
    return errors.map(err => <span key={err}>{err.message || err}</span>);
  }

  // flip() {
  //   this.card.current.style.display = 'none';
  // }

  render() {
    const {
      username, password, email, submitting,
    } = this.props;
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
                <Link to="##">
                  <img src={fb} alt="fb-logo" />
                </Link>
              </div>
              <div id="twbs">
                <Link to="##">
                  <img src={twitter} alt="twbs-logo" />
                </Link>
              </div>
              <div id="gl">
                <Link to="##">
                  <img src={google} alt="gl-logo" />
                </Link>
              </div>
            </div>
            <div className="to-center" id="form-link">
              <span>Already a member?</span>
              <NavLink to="/login">Sign In</NavLink>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.signUp.username,
  email: state.signUp.email,
  password: state.signUp.password,
  message: state.signUp.message,
  errors: state.signUp.errors,
  submitting: state.signUp.submitting,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
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
