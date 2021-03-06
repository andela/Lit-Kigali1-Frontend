import { EditorState } from 'draft-js';

const getVideo = (editorState, urlValue) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    'video',
    'IMMUTABLE',
    { src: urlValue },
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(
    editorState,
    { currentContent: contentStateWithEntity },
    'create-entity',
  );
  return {
    entityKey,
    newEditorState,
  };
};
export default getVideo;
