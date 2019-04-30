import { EditorState } from 'draft-js';
import getVideo from '../../helpers/getVideo';
import { urlValue } from '../../__mocks__/dummyData';

describe('Get Image', () => {
  test('should entitykey and newEditorState', () => {
    const { entityKey, newEditorState } = getVideo(EditorState.createEmpty(), urlValue);
    expect(entityKey).toBeDefined();
    expect(newEditorState).toBeDefined();
  });
});
