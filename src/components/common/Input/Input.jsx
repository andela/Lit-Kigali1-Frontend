import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  type,
  classes,
  onChange,
  placeholder,
  value,
  name,
  dataTest,
}) => (
  <input
    name={name}
    type={type}
    value={value}
    className={classes}
    onChange={onChange}
    placeholder={placeholder}
    data-test={dataTest}
  />
);

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  classes: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  dataTest: PropTypes.string,
};

Input.defaultProps = {
  name: '',
  type: 'text',
  classes: 'input',
  placeholder: '',
  value: '',
  dataTest: '',
};

export default Input;
