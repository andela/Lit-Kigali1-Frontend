import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchConfirmEmail } from '../../redux/actions/signupActions';

export class ConfirmedEmailMessage extends Component {
  state = {
    error: false,
    message: '',
    loading: true,
  };

  componentDidMount() {
    const {
      onEmailVerification,
      match: { params },
    } = this.props;
    onEmailVerification({ ...params });
  }

  render() {
    const { confirmMessage } = this.props;

    return (
      <section className="main-content content-margin">
        <div className="container align-center">
          <p className="color-primary title-2 align-center">{confirmMessage}</p>
        </div>
      </section>
    );
  }
}

ConfirmedEmailMessage.propTypes = {
  confirmMessage: PropTypes.string,
  onEmailVerification: PropTypes.func.isRequired,
};
ConfirmedEmailMessage.defaultProps = {
  confirmMessage: '',
};
export const mapStateToProps = state => ({
  confirmMessage: state.signUp.confirmMessage,
});

export const mapDispatchToProps = dispatch => ({
  onEmailVerification: ({ userId, confirmationCode }) => dispatch(fetchConfirmEmail({ userId, confirmationCode })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmedEmailMessage);
