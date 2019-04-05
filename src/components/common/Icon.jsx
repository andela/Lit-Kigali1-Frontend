import React from 'react';
import PropTypes from 'prop-types';

const Icon = (props) => {
  const { className } = props;
  return <i className={className} />;
};

Icon.propTypes = {
  className: PropTypes.string.isRequired,
};

export { Icon };
