import { RichUtils } from 'draft-js';

const createHighlightPlugin = () => ({
  customStyleMap: {
    HIGHLIGHT: {
      background: '#ffff00',
    },
  },
  keyBindingFn: (e) => {
    if (e.metaKey && e.key === 'h') {
      return 'highlight';
    }
    return undefined;
  },
  handleKeyCommand: (command, editorState, { setEditorState }) => {
    if (command === 'highlight') {
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'));
      return true;
    }
    return undefined;
  },
});

export default createHighlightPlugin;
