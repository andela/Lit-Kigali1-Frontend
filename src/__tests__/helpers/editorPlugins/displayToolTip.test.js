import { EditorState, KeyBindingUtil } from 'draft-js';
import addToolTip, { toolTipStrategy } from '../../../helpers/editorPlugins/displayToolTip';

describe('addLinkPlugin', () => {
  const editorState = EditorState.createEmpty();
  const setEditorState = jest.fn();

  test('should not handle key command', () => {
    const command = 'not-add-tool-tip';
    const { handleKeyCommand } = addToolTip;
    expect(handleKeyCommand(command, editorState, { setEditorState })).toEqual('not-handled');
  });

  test('should handle key command', () => {
    const { handleKeyCommand } = addToolTip;
    const command = 'add-tool-tip';
    expect(handleKeyCommand(command, editorState, { setEditorState })).toEqual('handled');
  });

  test('should return undefined', () => {
    const { keyBindingFn } = addToolTip;
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
    const { keyBindingFn } = addToolTip;
    const event = {
      which: 77,
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

  test('should return add-tool-tip', () => {
    KeyBindingUtil.hasCommandModifier = () => true;
    const { keyBindingFn } = addToolTip;
    const event = {
      which: 77,
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
    expect(addLink).toEqual('add-tool-tip');
  });
});

describe('toolTipStrategy', () => {
  test('toolTipStrategy', () => {
    const contentState = {
      getEntity: jest.fn().mockImplementation(() => ({
        getType: jest.fn().mockImplementation(() => 'TOOLTIP'),
      })),
    };
    const contentBlock = {
      findEntityRanges: jest.fn().mockImplementation(() => jest.fn()),
    };
    const callback = jest.fn();
    const res = toolTipStrategy(contentBlock, callback, contentState);
    expect(res).toBeUndefined();
  });
});
