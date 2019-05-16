import { EditorState } from 'draft-js';
import styleHighlighter from '../../helpers/styleHiglightedText';

describe('Get styleHighlighter', () => {
  test('should create a styleHighlighter', () => {
    const articleSlug = 'hello world';
    const anchorKey = 'gdhh4';
    const editorState = EditorState.createEmpty();
    const comment = {
    };
    const {
      newEditorState,
      selectedText,
      entityKey,
    } = styleHighlighter(editorState, anchorKey, comment, articleSlug);
    expect(newEditorState).toBeDefined();
    expect(selectedText).toBeDefined();
    expect(entityKey).toEqual('1');
  });
});
