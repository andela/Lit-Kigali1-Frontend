import { EditorState } from 'draft-js';
import getToolTip from '../../helpers/getToolTip';

describe('Get getToolTip', () => {
  test('should create a toolTip', () => {
    const toggleMode = jest.fn();
    const highlighted = 'hello world';
    const history = {
      push: jest.fn(),
    };
    const anchorKey = 'gdhh4';
    const editorState = EditorState.createEmpty();
    const {
      newEditorState,
      selectedText,
      entityKey,
    } = getToolTip(editorState, toggleMode, highlighted, history, anchorKey);
    expect(newEditorState).toBeDefined();
    expect(selectedText).toBeDefined();
    expect(entityKey).toEqual('1');
  });
});
