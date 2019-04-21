import React from 'react';
import Image from '../../components/Image/Image';
import Video from '../../components/Video/Video';


export const Media = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();

  let media;

  if (type === 'image') {
    media = <Image src={src} classes="article-img" />;
    return media;
  }

  if (type === 'video') {
    media = <Video src={src} classes="article-video" />;
    return media;
  }
  return media;
};

export const mediaBlockRenderer = (block) => {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    };
  }
  return null;
};
