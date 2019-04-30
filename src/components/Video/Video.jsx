import React from 'react';
import PropTypes from 'prop-types';

const Video = (props) => {
  const { src, classes } = props;
  return (
    <video controls src={src} className={classes}>
      <track kind="captions" />
    </video>
  );
};
Video.propTypes = {
  src: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
};

export default Video;