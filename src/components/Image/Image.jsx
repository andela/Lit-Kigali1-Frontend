import React from 'react';
import PropTypes from 'prop-types';

const Image = (props) => {
  const { src, classes } = props;

  return <img src={src} alt="" className={classes} />;
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
};

export default Image;
