import React from 'react';
import PropTypes from 'prop-types';

const Tag = ({
  children, classes, onClick,
}) => (
  <span className={`tag ${classes}`} onClick={onClick} role="presentation">
    {children}
  </span>
);

Tag.propTypes = {
  children: PropTypes.any.isRequired,
  classes: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Tag.defaultProps = {
  classes: '',
};

export default Tag;
