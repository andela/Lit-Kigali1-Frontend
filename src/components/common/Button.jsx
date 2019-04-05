import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const {
    label, className, disable, onClick,
  } = props;
  return (
    <button type="submit" onClick={onClick} className={className} disabled={disable}>
      {label}
    </button>
  );
};

const propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disable: PropTypes.bool,
  className: PropTypes.string.isRequired,
};
const defaultProps = {
  disable: false,
};
Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
export { Button };
