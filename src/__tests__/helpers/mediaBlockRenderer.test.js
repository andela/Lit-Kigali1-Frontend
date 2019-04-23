import React from 'react';
import { mediaBlockRenderer, Media } from '../../helpers/editorPlugins/mediaBlockRenderer';
import Video from '../../components/Video/Video';
import Image from '../../components/Image/Image';

describe('MediaBlockRender', () => {
  test('should return component and editable property', () => {
    const block = {
      getType: () => 'atomic',
    };
    const { component, editable } = mediaBlockRenderer(block);
    expect(component).toBeDefined();
    expect(editable).toBeFalsy();
  });
  test('should return null', () => {
    const block = {
      getType: () => '',
    };
    const res = mediaBlockRenderer(block);
    expect(res).toEqual(null);
  });
});

describe('Media', () => {
  test('should return an image component ', () => {
    const props = {
      contentState: {
        getEntity: () => ({
          getData: () => ({ src: 'image/hello.jpg' }),
          getType: () => 'image',
        }),
      },
      block: {
        getEntityAt: index => index,
      },
    };
    const media = Media(props);
    expect(media).toEqual(<Image classes="article-img" src="image/hello.jpg" />);
  });
  test('should return a video component ', () => {
    const props = {
      contentState: {
        getEntity: () => ({
          getData: () => ({ src: 'image/hello.mp4' }),
          getType: () => 'video',
        }),
      },
      block: {
        getEntityAt: index => index,
      },
    };
    const media = Media(props);
    expect(media).toEqual(<Video classes="width-100" src="image/hello.mp4" />);
  });
  test('should return a video component ', () => {
    const props = {
      contentState: {
        getEntity: () => ({
          getData: () => ({ src: 'image/hello.mp4' }),
          getType: () => 'audio',
        }),
      },
      block: {
        getEntityAt: index => index,
      },
    };
    const media = Media(props);
    expect(media).toBeUndefined();
  });
});
