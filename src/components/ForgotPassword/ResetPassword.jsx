import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  handleForgotPasswordForm,
  submitResetPassword,
} from '../../redux/actions/forgotPasswordActions';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';

export class ResetPassword extends Component {
  state = {
    validPassword: true,
    passwordError: 'Password must have at least 6 characters',
  };

  onSubmitButton = () => {
    const {
      onSubmit,
      newPassword,
      confirmNewpassword,
      match: { params },
      history,
    } = this.props;
    this.setState({ validPassword: true });
    if (newPassword.length < 5 || confirmNewpassword.length < 5) {
      this.setState({
        validPassword: false,
        passwordError: 'Password must have at least 6 characters',
      });
      return;
    }

    if (newPassword !== confirmNewpassword) {
      this.setState({
        validPassword: false,
        passwordError: "Password don't match",
      });
      return;
    }
    onSubmit({ ...params, newPassword, confirmNewpassword }).then((res) => {
      if (res.status === 200) {
        history.push('/login');
      }
    });
    this.setState({ validPassword: true });
  };

  handleInputChange = (e) => {
    this.setState({ validPassword: true });
    const { onInputChange } = this.props;
    onInputChange({ field: e.target.name, value: e.target.value });
  };

  renderErrors = () => {
    let { errors } = this.props;
    const { message } = this.props;
    const { passwordError, validPassword } = this.state;
    if (!validPassword) return <span>{passwordError}</span>;
    errors = [message, ...errors];
    return errors.map(err => <span key={err}>{err.message || err}</span>);
  };

  render() {
    const { newPassword, confirmNewpassword, submitting } = this.props;
    return (
      <section className="main-content middle-content">
        <form className="bg-primary-light centered-form margin-content">
          <div className="color-primary to-center">
            <h2>CHANGE YOUR PASSWORD</h2>
          </div>
          <div className="content-padding-h">
            <div className="form-errors">{this.renderErrors()}</div>
            <div className="content-margin-bottom">
              <div className="input primary">
                <i className="fa fa-lock" />
                <Input
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  placeholder="New Password"
                  onChange={this.handleInputChange}
                  classes="bg-primary-light"
                />
              </div>
              <div className="mb-20" />
              <div className="input primary">
                <i className="fa fa-lock" />
                <Input
                  name="confirmNewpassword"
                  type="password"
                  value={confirmNewpassword}
                  placeholder="Confirm New Password"
                  onChange={this.handleInputChange}
                  classes="bg-primary-light"
                />
              </div>
            </div>

            <Button
              classes={`primary color-white content-margin width-100 ${
                submitting ? 'loading' : ''
              }`}
              type="button"
              onClick={this.onSubmitButton}
            >
              Change Password
            </Button>
          </div>
        </form>
      </section>
    );
  }
}

export const mapStateToProps = ({
  forgotPassword: {
    newPassword, confirmNewpassword, email, message, errors, submitting,
  },
}) => ({
  newPassword,
  confirmNewpassword,
  email,
  message,
  errors,
  submitting,
});

export const mapDispatchToProps = dispatch => ({
  onInputChange: ({ field, value }) => dispatch(handleForgotPasswordForm({ field, value })),
  onSubmit: (payload) => {
    dispatch(submitResetPassword(payload));
  },
});

ResetPassword.propTypes = {
  newPassword: PropTypes.string,
  confirmNewpassword: PropTypes.string,
  message: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.array,
  match: PropTypes.any,
  submitting: PropTypes.bool,
  history: PropTypes.any.isRequired,
};
ResetPassword.defaultProps = {
  newPassword: '',
  confirmNewpassword: '',
  message: '',
  errors: [],
  match: { params: {} },
  submitting: false,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPassword);
