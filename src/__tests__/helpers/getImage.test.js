import { EditorState } from 'draft-js';
import getImage from '../../helpers/getImage';
import { urlValue } from '../../__mocks__/dummyData';

describe('Get Image', () => {
  test('should entitykey and newEditorState', () => {
    const { entityKey, newEditorState } = getImage(EditorState.createEmpty(), urlValue);
    expect(entityKey).toBeDefined();
    expect(newEditorState).toBeDefined();
  });
});
