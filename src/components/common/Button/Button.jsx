import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children, type, classes, onClick, disabled,
}) => (
  <button disabled={disabled} type={type} className={`button ${classes}`} onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  disabled: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.any.isRequired,
  classes: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  disabled: '',
  type: 'button',
  classes: '',
  onClick: () => 'button',
};

export default Button;
