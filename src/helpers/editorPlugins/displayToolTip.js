import {
  RichUtils,
  KeyBindingUtil,
} from 'draft-js';
import getToolTip from '../getToolTip';
import CommentToolTip from '../../components/Comment/CommentToolTip';

export const toolTipStrategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null
          && contentState.getEntity(entityKey).getType() === 'TOOLTIP'
    );
  }, callback);
};

const addToolTip = {
  keyBindingFn(event, { getEditorState }) {
    const editorState = getEditorState();
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      return undefined;
    }
    if (KeyBindingUtil.hasCommandModifier(event) && event.which === 77) {
      return 'add-tool-tip';
    }
    return undefined;
  },

  handleKeyCommand(command, editorState, { setEditorState }) {
    if (command !== 'add-tool-tip') {
      return 'not-handled';
    }
    const { newEditorState, selectedText, entityKey } = getToolTip(editorState);
    setEditorState(RichUtils.toggleLink(newEditorState, selectedText, entityKey));
    return 'handled';
  },

  decorators: [
    {
      strategy: toolTipStrategy,
      component: CommentToolTip,
    },
  ],
};

export default addToolTip;
