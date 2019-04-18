import React, { Component } from 'react';
import PropTypes from 'prop-types';
import error404 from '../../../assets/images/error-404.png';
import error500 from '../../../assets/images/error-500.png';

class ErrorPage extends Component {
  state = {
    errors: {
      404: {
        image: error404,
        title: 'NOT FOUND',
        text: "It's not you, it's us. We are fixing it",
        button: 'Go Back',
        url: '',
      },
      500: {
        image: error500,
        title: 'ERROR',
        text: "We are afraid this page doesn't exist",
        button: 'Try Again',
        url: '',
      },
    },
  };

  naviageTo = () => {
    const { history, type } = this.props;
    switch (type) {
      case '404':
        history.goBack();
        break;
      case '500':
        window.location.reload();
        break;
      default:
        window.location.reload();
        break;
    }
  };

  renderNavigationButton = () => {
    const { type } = this.props;
    const { errors } = this.state;
    return (
      <button className="button primary" onClick={this.naviageTo}>
        {errors[type || 404].button}
      </button>
    );
  };

  render() {
    const { type } = this.props;
    const { errors } = this.state;
    return (
      <div className="error-container">
        <div className="error-block">
          <div className="error-image-container">
            <img className="error-image" src={errors[type || 404].image} alt="Error logo" />
          </div>
          <div className="error-content">
            <h1 className="error-code">{type}</h1>
            <h3 className="error-title">{errors[type || 404].title}</h3>
            <p className="error-text">{errors[type || 404].text}</p>
            {this.renderNavigationButton()}
          </div>
        </div>
      </div>
    );
  }
}

ErrorPage.propTypes = {
  type: PropTypes.string,
  history: PropTypes.object,
};

ErrorPage.defaultProps = {
  type: '404',
  history: {},
};

export default ErrorPage;
