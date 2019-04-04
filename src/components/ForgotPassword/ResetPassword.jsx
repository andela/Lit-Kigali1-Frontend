import React, { Component } from 'react';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      newPassword: '',
      confirmNewpassword: '',
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { newPassword, confirmNewpassword } = this.state;
    return (
      <section className="main-content middle-content">
        <form className="bg-primary-light centered-form">
          <div className="color-primary to-center">
            <h2>CHANGE YOUR PASSWORD</h2>
          </div>
          <div className="content-padding-h content-margin">
            <div className="input primary content-margin">
              <i className="fa fa-lock" />
              <Input
                name="newPassword"
                value={newPassword}
                onChange={this.handleInput}
                type="password"
                placeholder="New Password"
                classes="bg-primary-light"
              />
            </div>
            <div className="input primary">
              <i className="fa fa-lock" />
              <Input
                name="confirmNewpassword"
                type="password"
                value={confirmNewpassword}
                onChange={this.handleInput}
                placeholder="Confirm New Password"
                classes="bg-primary-light"
              />
            </div>
            <Button classes="primary color-white content-margin-top width-100">
              Change Password
            </Button>
          </div>
        </form>
      </section>
    );
  }
}

export default ResetPassword;
