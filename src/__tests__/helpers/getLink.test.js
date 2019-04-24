import { EditorState } from 'draft-js';
import getLink from '../../helpers/getLink';
import { urlValue } from '../../__mocks__/dummyData';

describe('Get Link', () => {
  test('should create a link', () => {
    const editorState = EditorState.createEmpty();
    const {
      newEditorState,
      selectedText,
      entityKey,
    } = getLink(editorState, urlValue);
    expect(newEditorState).toBeDefined();
    expect(selectedText).toBeDefined();
    expect(entityKey).toEqual('1');
  });

  test('should not create a link', () => {
    const editorState = EditorState.createEmpty();
    const {
      newEditorState,
      selectedText,
      entityKey,
    } = getLink(editorState);
    expect(newEditorState).toBeDefined();
    expect(selectedText).toBeDefined();
    expect(entityKey).toEqual(null);
  });
});
