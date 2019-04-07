import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmail } from 'validator';
import {
  handleForgotPasswordForm,
  submitForgotPassword,
} from '../../redux/actions/forgotPasswordActions';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';

export class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      validEmail: true,
      emailError: 'Email is not valid',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmitButton = this.onSubmitButton.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  onSubmitButton() {
    const { onSubmit, email, history } = this.props;
    this.setState({ validEmail: true });
    if (!isEmail(email)) {
      this.setState({ validEmail: false });
      return;
    }
    onSubmit({ email }).then((res) => {
      if (res.status === 201) {
        history.push('/forgot-password-message');
      }
    });
  }

  handleInputChange(e) {
    this.setState({ validEmail: true });
    const { onInputChange } = this.props;
    onInputChange({ field: e.target.name, value: e.target.value });
  }

  renderErrors() {
    let { errors } = this.props;
    const { message } = this.props;
    errors = [message, ...errors];
    return errors.map(err => <span key={err}>{err.message || err}</span>);
  }

  render() {
    const { email, submitting } = this.props;
    const { emailError, validEmail } = this.state;
    return (
      <section className="main-content middle-content">
        <form className="bg-primary-light centered-form margin-content">
          <div className="color-primary to-center">
            <h2>RESET YOUR PASSWORD</h2>
          </div>
          <div className="content-padding-h">
            <div className="form-errors">{this.renderErrors()}</div>
            <div className="content-margin-bottom">
              <div className="input primary">
                <i className="fa fa-at" />
                <Input
                  name="email"
                  type="text"
                  value={email}
                  placeholder="Enter Your Email"
                  onChange={this.handleInputChange}
                />
              </div>
              {validEmail ? '' : <div className="form-error">{emailError}</div>}
            </div>

            <Button
              classes={`primary color-white content-margin width-100 ${
                submitting ? 'loading' : ''
              }`}
              type="button"
              onClick={this.onSubmitButton}
            >
              Reset Password
            </Button>
          </div>
        </form>
      </section>
    );
  }
}

export const mapStateToProps = ({
  forgotPassword: {
    email, message, errors, submitting,
  },
}) => ({
  email,
  message,
  errors,
  submitting,
});

export const mapDispatchToProps = dispatch => ({
  onInputChange: ({ field, value }) => dispatch(handleForgotPasswordForm({ field, value })),
  onSubmit: ({ email }) => dispatch(submitForgotPassword({ email })),
});

ForgotPassword.propTypes = {
  email: PropTypes.string,
  message: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.array,
  submitting: PropTypes.bool,
  history: PropTypes.any.isRequired,
};

ForgotPassword.defaultProps = {
  email: '',
  message: '',
  errors: [],
  submitting: false,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPassword);
