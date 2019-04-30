import {
  RichUtils,
  KeyBindingUtil,
} from 'draft-js';
import getLink from '../getLink';
import Link from '../../components/Link/Link';

export const linkStrategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null
        && contentState.getEntity(entityKey).getType() === 'LINK'
    );
  }, callback);
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
    const { newEditorState, selectedText, entityKey } = getLink(editorState);
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
