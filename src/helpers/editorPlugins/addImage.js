import React from 'react';
import PropTypes from 'prop-types';

export const imageStrategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null
        && contentState.getEntity(entityKey).getType() === 'IMAGE'
    );
  }, callback);
};

export const Image = (props) => {
  const { contentState, entityKey, children } = props;
  const { src } = contentState.getEntity(entityKey).getData();
  return (
    <img
      alt={children}
      src={src}
    />
  );
};
Image.propTypes = {
  contentState: PropTypes.any.isRequired,
  entityKey: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
};

const addImagePlugin = {
  decorators: [
    {
      strategy: imageStrategy,
      component: Image,
    },
  ],
};

export default addImagePlugin;
