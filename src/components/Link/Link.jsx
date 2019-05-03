import React from 'react';
import PropTypes from 'prop-types';

const Link = (props) => {
  const { contentState, entityKey, children } = props;
  const { url } = contentState.getEntity(entityKey).getData();
  return (
    <a
      className="article-link"
      href={url}
      rel="noopener noreferrer"
      target="_blank"
      aria-label={url}
    >
      {children}
    </a>
  );
};
Link.propTypes = {
  contentState: PropTypes.any.isRequired,
  entityKey: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
};

export default Link;
