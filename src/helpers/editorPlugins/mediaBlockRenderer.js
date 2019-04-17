import React from 'react';
import PropTypes from 'prop-types';

const Image = (props) => {
  const { src, className } = props;
  if (src) {
    return <img src={src} alt="" className={className} />;
  }
  return null;
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

const Media = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();

  let media;

  if (type === 'image') {
    media = <Image src={src} className="article-image" />;
  }

  return media;
};

export const mediaBlockRenderer = (block) => {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
      props: {
        foo: 'bar',
      },
    };
  }
  return null;
};
