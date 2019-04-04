import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fb from '../../assets/images/facebook.png';
import twitter from '../../assets/images/twitter.png';
import google from '../../assets/images/google.png';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <form className="bg-primary-light login-form" id="signup" action="articles-create.html">
          <div className="color-primary to-center">
            <h2>LOG IN</h2>
          </div>
          <div className="input primary">
            <i className="fa fa-user" />
            {Input({
              type: 'text',
              classes: 'bg-primary-light',
              placeholder: 'Username / Email',
            })}
          </div>
          <div className="input primary">
            <i className="fa fa-lock" />
            {Input({
              type: 'password',
              classes: 'bg-primary-light',
              placeholder: 'Password',
            })}
          </div>
          <div className="align-right" id="forget-psswd">
            <a href="forgot-password-reset.html">Forget Password?</a>
          </div>
          {Button({ children: 'Log In', type: 'submit', classes: 'primary color-white' })}
          <div className="icon-group">
            <div id="fb">
              <Link to="/">
                <img src={fb} alt="fb-logo" />
              </Link>
            </div>
            <div id="twbs">
              <Link to="/">
                <img src={twitter} alt="twbs-logo" />
              </Link>
            </div>
            <div id="gl">
              <Link to="/">
                <img src={google} alt="gl-logo" />
              </Link>
            </div>
          </div>
          <div className="to-center" id="form-link">
            <span>Not a member?</span>
            <Link to="/">Sign Up</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginComponent;
