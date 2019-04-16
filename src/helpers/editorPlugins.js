import { RichUtils } from 'draft-js';

export default () => ({
  customStyleMap: {
    HIGHLIGHT: {
      background: '#0000000d',
    },
  },
  keyBindingFn: (e) => {
    if (e.metaKey && e.key === 'h') {
      return 'highlight';
    }
    return '';
  },
  handleKeyCommand: (command, editorState, { setEditorState }) => {
    if (command === 'highlight') {
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'));
      return true;
    }
    return '';
  },
});
