import { styleHighlighterStrategy } from '../../../helpers/editorPlugins/addStyleHightlighter';

describe('addStyleHightlighter', () => {
  test('styleHighlighter', () => {
    const contentState = {
      getEntity: jest.fn().mockImplementation(() => ({
        getType: jest.fn().mockImplementation(() => 'STYLEHIGHLIGHT'),
      })),
    };
    const contentBlock = {
      findEntityRanges: jest.fn().mockImplementation(() => jest.fn()),
    };
    const callback = jest.fn();
    const res = styleHighlighterStrategy(contentBlock, callback, contentState);
    expect(res).toBeUndefined();
  });
});
