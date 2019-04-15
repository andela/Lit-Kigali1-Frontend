import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetchAPI from '../../helpers/fetchAPI';

export class ConfirmedEmailMessage extends Component {
  state = {
    error: false,
    message: '',
    loading: true,
  };

  componentDidMount() {
    const {
      match: {
        params: { userId, confirmationCode },
      },
    } = this.props;

    fetchAPI(`/users/${userId}/confirm_email/${confirmationCode}`, {
      method: 'GET',
    })
      .then(({ message }) => {
        this.setState({ message });
      })
      .catch(({ message }) => {
        this.setState({ message, error: true });
      });
  }

  render() {
    const { message } = this.state;
    return (
      <section className="main-content content-margin">
        <div className="container align-center">
          <p className="color-primary title-2 align-center">{message}</p>
        </div>
      </section>
    );
  }
}

ConfirmedEmailMessage.propTypes = {
  match: PropTypes.any,
};

export default ConfirmedEmailMessage;
