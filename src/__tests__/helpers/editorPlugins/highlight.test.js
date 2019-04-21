import { EditorState } from 'draft-js';
import highlight from '../../../helpers/editorPlugins/highlight';

const res = highlight();
describe('Highlight text', () => {
  test('should return highlight property equal to yellow', () => {
    const { customStyleMap: { HIGHLIGHT: { background } } } = res;
    expect(background).toEqual('#ffff00');
  });

  test('should return undefined for key binding function', () => {
    const e = {};
    const res1 = res.keyBindingFn(e);
    expect(res1).toBeUndefined();
  });

  test('should return highlight for key binding function', () => {
    const e = {
      metaKey: true,
      key: 'h',
    };
    const res1 = res.keyBindingFn(e);
    expect(res1).toEqual('highlight');
  });

  test('should return undefined for handleKeyCommand(', () => {
    const command = '';
    const editorState = EditorState.createEmpty();
    const setEditorState = '';
    const res1 = res.handleKeyCommand(command, editorState, { setEditorState });
    expect(res1).toBeUndefined();
  });

  test('should return undefined for handleKeyCommand(', () => {
    const command = 'highlight';
    const editorState = EditorState.createEmpty();
    const setEditorState = jest.fn();
    const res1 = res.handleKeyCommand(command, editorState, { setEditorState });
    expect(res1).toBeTruthy();
  });
});
