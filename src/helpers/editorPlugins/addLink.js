import React from 'react';
import {
  RichUtils,
  KeyBindingUtil,
  EditorState,
} from 'draft-js';
import PropTypes from 'prop-types';

export const linkStrategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null
        && contentState.getEntity(entityKey).getType() === 'LINK'
    );
  }, callback);
};

export const Link = (props) => {
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

const addLinkPlugin = {
  keyBindingFn(event, { getEditorState }) {
    const editorState = getEditorState();
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      return undefined;
    }
    if (KeyBindingUtil.hasCommandModifier(event) && event.which === 75) {
      return 'add-link';
    }
    return undefined;
  },

  handleKeyCommand(command, editorState, { setEditorState }) {
    if (command !== 'add-link') {
      return 'not-handled';
    }
    const link = window.prompt('Enter a link...');
    const selectedText = editorState.getSelection();
    if (!link) {
      setEditorState(RichUtils.toggleLink(editorState, selectedText, null));
      return 'handled';
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity('LINK', 'MUTABLE', {
      url: link,
    });
    const newEditorState = EditorState.push(
      editorState,
      contentWithEntity,
      'create-entity',
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    setEditorState(RichUtils.toggleLink(newEditorState, selectedText, entityKey));
    return 'handled';
  },

  decorators: [
    {
      strategy: linkStrategy,
      component: Link,
    },
  ],
};

export default addLinkPlugin;
