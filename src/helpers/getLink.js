import { EditorState } from 'draft-js';

const getLink = (editorState, link) => {
  const selectedText = editorState.getSelection();
  if (!link) {
    return {
      newEditorState: editorState,
      selectedText,
      entityKey: null,
    };
  }
  const content = editorState.getCurrentContent();
  const contentWithEntity = content.createEntity('LINK', 'MUTABLE', { url: link });
  const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
  const entityKey = contentWithEntity.getLastCreatedEntityKey();
  return {
    newEditorState,
    selectedText,
    entityKey,
  };
};

export default getLink;
