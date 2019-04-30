import { EditorState } from 'draft-js';
import addLinkPlugin from '../../../helpers/editorPlugins/addLink';


describe('addLinkPlugin', () => {
  const editorState = EditorState.createEmpty();
  const setEditorState = jest.fn();
  test('should not handle key command', () => {
    const command = 'not-add-link';
    const { handleKeyCommand } = addLinkPlugin;
    expect(handleKeyCommand(command, editorState, { setEditorState })).toEqual('not-handled');
  });
  test('should handle key command', () => {
    const { handleKeyCommand } = addLinkPlugin;
    const command = 'add-link';
    expect(handleKeyCommand(command, editorState, { setEditorState })).toEqual('handled');
  });

  test('should return undefined', () => {
    const { keyBindingFn } = addLinkPlugin;
    const event = {
      which: 75,
    };
    const getEditorState = () => {
      const getSelection = () => {
        const isCollapsed = () => false;
        return {
          isCollapsed,
        };
      };
      return {
        getSelection,
      };
    };
    const addLink = keyBindingFn(event, { getEditorState });
    expect(addLink).toEqual(undefined);
  });
  test('should return undefined', () => {
    const { keyBindingFn } = addLinkPlugin;
    const event = {
      which: 75,
    };
    const getEditorState = () => {
      const getSelection = () => {
        const isCollapsed = () => true;
        return {
          isCollapsed,
        };
      };
      return {
        getSelection,
      };
    };
    const addLink = keyBindingFn(event, { getEditorState });
    expect(addLink).toEqual(undefined);
  });
});
