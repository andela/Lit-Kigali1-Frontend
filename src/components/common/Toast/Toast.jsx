import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class Toast extends Component {
  state = {
    active: true,
  };

  componentWillReceiveProps(props) {
    this.setState({ active: props.show });
    setTimeout(() => {
      this.setState({ active: false });
    }, 6200);
    return true;
  }

  render() {
    const icons = {
      success: 'fa-check',
      warning: 'fa-exclamation-triangle',
      error: 'fa-exclamation',
    };

    const { type, message, show } = this.props;
    const { active } = this.state;
    return (
      <div className={`toast ${type} ${show && active ? 'show' : ''}`}>
        <div className="icon">
          <i className={`fa ${icons[type]}`} />
        </div>
        <div className="description">{message}</div>
      </div>
    );
  }
}

Toast.propTypes = {
  show: PropTypes.bool,
  type: PropTypes.string,
  message: PropTypes.string,
};

Toast.defaultProps = {
  show: false,
  type: 'success',
  message: 'Success',
};

export default Toast;
