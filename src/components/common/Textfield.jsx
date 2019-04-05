import React from 'react';
import PropTypes from 'prop-types';

const TextField = (props) => {
  const {
    name, type, placeholder, value, className, id,
  } = props;
  return (
    <input
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      className={className}
      value={value}
    />
  );
};

TextField.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string.isRequired,
  value: PropTypes.string,
};

TextField.defaultProps = {
  id: 'input',
  placeholder: 'Text here',
  value: 'None',
};

export { TextField };
