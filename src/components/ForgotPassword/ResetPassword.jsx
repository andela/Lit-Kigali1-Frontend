import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleForgotPasswordForm, submitResetPassword } from '../../redux/actions';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';

export class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      validPassword: true,
      passwordError: 'Password must have at least 6 chacters',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmitButton = this.onSubmitButton.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  onSubmitButton(e) {
    const {
      onSubmit,
      newPassword,
      confirmNewpassword,
      match: { params },
    } = this.props;
    this.setState({ validPassword: true });
    if (newPassword.length < 5 || confirmNewpassword.length < 5) {
      this.setState({
        validPassword: false,
        passwordError: 'Password must have at least 6 chacters',
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
    onSubmit({ ...params, newPassword, confirmNewpassword });
    this.setState({ validPassword: true });
    e.preventDefault();
  }

  handleInputChange(e) {
    this.setState({ validPassword: true });
    const { onInputChange } = this.props;
    onInputChange({ field: e.target.name, value: e.target.value });
  }

  renderErrors() {
    let { errors } = this.props;
    const { message } = this.props;
    const { passwordError, validPassword } = this.state;
    if (!validPassword) return <span>{passwordError}</span>;
    errors = [message, ...errors];
    return errors.map(err => <span key={err}>{err.message || err}</span>);
  }

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

const mapStateToProps = state => ({
  newPassword: state.forgotPassword.newPassword,
  confirmNewpassword: state.forgotPassword.confirmNewpassword,
  email: state.forgotPassword.email,
  message: state.forgotPassword.message,
  errors: state.forgotPassword.errors,
  submitting: state.forgotPassword.submitting,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onInputChange: ({ field, value }) => dispatch(handleForgotPasswordForm({ field, value })),
  onSubmit: (payload) => {
    dispatch(submitResetPassword({ ...payload, ownProps }));
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
