import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children, type, classes, onClick,
}) => (
  <button type={type} className={`button ${classes}`} onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.string.isRequired,
  classes: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  classes: '',
  onClick: () => '',
};

export default Button;
