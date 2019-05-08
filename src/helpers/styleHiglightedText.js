import { EditorState } from 'draft-js';

const styleHighlitedText = (editorState, anchorKey, comment, articleSlug) => {
  const selectedText = editorState.getSelection();
  const content = editorState.getCurrentContent();
  const contentWithEntity = content.createEntity('STYLEHIGHLIGHT', 'IMMUTABLE', { anchorKey, comment, articleSlug });
  const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
  const entityKey = contentWithEntity.getLastCreatedEntityKey();
  return {
    newEditorState,
    selectedText,
    entityKey,
  };
};

export default styleHighlitedText;
